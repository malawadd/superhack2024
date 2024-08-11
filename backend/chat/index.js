const express = require('express');
const { Contract, ethers, Wallet } = require('ethers');
const ABIAgent = require('../abis/Agent.json');
require('dotenv').config();

const router = express.Router();

router.post('/chat', async (req, res) => {
    const { prompt, maxIterations } = req.body;
    if (!prompt) {
        console.log('Prompt is required');
        return res.status(400).send('Prompt is required');
    }
    console.log('prompt:', prompt);
    try {
        const response = await runAgentWithPrompt(prompt, maxIterations || 1);
        res.send(response);
    } catch (error) {
        console.error(`Error running agent: ${error.message}`);
        res.status(500).send(`Error: ${error.message}`);
    }
});

async function runAgentWithPrompt(prompt, maxIterations) {
    const rpcUrl = process.env.RPC_URL;
    const privateKey = process.env.PRIVATE_KEY;
    const contractAddress = process.env.AGENT_CONTRACT_ADDRESS;
    if (!rpcUrl || !privateKey || !contractAddress) {
        throw new Error('Missing required environment variables');
    }

    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const wallet = new Wallet(privateKey, provider);
    const contract = new Contract(contractAddress, ABIAgent, wallet);

    const transactionResponse = await contract.runAgent(prompt, maxIterations);
    const receipt = await transactionResponse.wait();
    console.log(`Task sent, tx hash: ${receipt.hash}`);

    const agentRunID = getAgentRunId(receipt, contract);
    console.log('agentRunID', agentRunID);
    if (agentRunID === undefined) {
        throw new Error('Agent run ID not found in transaction receipt');
    }

    let allMessages = [];
    let exitNextLoop = false;
    while (true) {
        const newMessages = await getNewMessages(contract, agentRunID, allMessages.length);
        for (let message of newMessages) {
            let roleDisplay = message.role === 'assistant' ? 'THOUGHT' : 'STEP';
            let color = message.role === 'assistant' ? '\x1b[36m' : '\x1b[33m';
            console.log(`${color}${roleDisplay}\x1b[0m: ${message.content}`);
            allMessages.push(message);
        }

        if (exitNextLoop) {
            console.log(`agent run ID ${agentRunID} finished!`);
            break;
        }

        if (await contract.isRunFinished(agentRunID)) {
            exitNextLoop = true;
        }

        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    const finalResponse = extractResponse(allMessages);
    return finalResponse;
}

function getAgentRunId(receipt, contract) {
    let agentRunID;
    for (const log of receipt.logs) {
        try {
            const parsedLog = contract.interface.parseLog(log);
            if (parsedLog && parsedLog.name === 'AgentRunCreated') {
                agentRunID = ethers.toNumber(parsedLog.args[1]);
                break;
            }
        } catch (error) {
            console.log('Could not parse log:', log);
        }
    }
    return agentRunID;
}

async function getNewMessages(contract, agentRunID, currentMessagesCount) {
    const messages = await contract.getMessageHistory(agentRunID);
    const newMessages = [];
    messages.forEach((message, i) => {
        if (i >= currentMessagesCount) {
            newMessages.push({
                role: message.role,
                content: message.content[0].value,
            });
        }
    });
    return newMessages;
}

function extractResponse(messages) {
    const finalMessage = messages.filter(msg => msg.role === 'assistant').pop();
    if (!finalMessage) {
        throw new Error('No final response found from assistant');
    }
    return finalMessage.content;
}

module.exports = router;