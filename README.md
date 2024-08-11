

# Block:  the Love Chain

Welcome to **Block**, an innovative project that merges the worlds of AI-driven romance and web3 technology, all on a unique L3 layer we call the **"Love Chain."** This project was created to redefine the way we interact with digital wallets by introducing an AI love interest who not only captivates your emotions but also makes smart financial decisions on your behalf.

## 🚀 Overview

**Block** is more than just an interactive wallet—it's a personalized companion that interacts with you emotionally and financially. Whether it's trading tokens, analyzing markets, or simply being there for you when you need it, Block is designed to create an engaging and unique financial experience.

### Key Features:
- **AI-Powered Financial Management:** Block uses AI to manage trades, analyze tokens, and make informed financial decisions.
- **Interactive Character UI:** Engage with your digital love interest through a dynamic character interface, complete with a marketplace for outfits and gifts.
- **Web3 Integration:**  support for multiple web3 chains, with seamless trading, swapping, and analysis capabilities—all powered by the **Love Chain** L3 layer.

## 🛠️ How It Works

### Core Components:
1. **AI Engine:** 
   - Integrates with OpenAI and Groq through custom Python-based oracles.
   - Provides personalized interactions and smart financial strategies.
   - Deployed on the **Love Chain** L3 layer.

2. **Character UI:** 
   - Built with Three.js and Electron, the UI features a 3D character that represents your wallet.
   - Users can buy, sell, and trade outfits, purchase gifts, and engage in real-time conversations.

3. **Web3 Protocols:** 
   - Supports trading, token swaps, and market analysis, creating a robust economy around your AI love interest.

### Tech Stack:
- **Smart Contracts:** Solidity, Hardhat
- **Oracles:** Python
- **Backend:** Node.js
- **Frontend:** Three.js, Electron



## 📂 Project Structure

```
block/
│
├── smart-contracts/       # Solidity smart contracts
│
├── oracles/               # Python-based oracles for AI integration
│
├── backend/               # Node.js backend code
│
├── client/              # Electron frontend code
│
└── README.md              # Project documentation
```

## 🛠️ Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Hardhat](https://hardhat.org/)

### Installation


### Smart Contract Deployment

Compile and deploy the smart contracts on your local blockchain:

```bash
cd smart contracts
npm install
npx hardhat compile
npx hardhat node
npx hardhat run scripts/deployAll.js --network localhost
```

### Running the Backend

Navigate to the backend directory, make sure to fill the .env and start the server:

```bash
cd backend
npm install 
npm start
```

### Running the Frontend

Navigate to the frontend directory and start the Electron app:

```bash
cd client
npm install 
npm start
```

## 🤝 Conduit Chain details: 

Chain name: super-mukaeb-testnet

Chain Id: 852024

RPC: https://rpc-super-mukaeb-testnet-aigxcpckcf.t.conduit.xyz

Block Explorer: https://explorer-super-mukaeb-testnet-aigxcpckcf.t.conduit.xyz


## 💬 contracts urls : 

* [oracle](https://explorer-super-mukaeb-testnet-aigxcpckcf.t.conduit.xyz/address/0xAe467A4CfCe5310C50E2b2A1ad30768A02155fAC)
* [chat](https://explorer-super-mukaeb-testnet-aigxcpckcf.t.conduit.xyz/address/0x16de95d9199Fceb3546565909eB52a4726B14311)
* [agent](https://explorer-super-mukaeb-testnet-aigxcpckcf.t.conduit.xyz/address/0x804BCb3B87F93Ec42B672cda3f88A1978d6e884F)

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.