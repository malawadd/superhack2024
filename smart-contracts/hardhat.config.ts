import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@xyrusworx/hardhat-solidity-json";
import 'solidity-docgen';
import "./tasks/whitelist";
import "./tasks/deploy";
import "./tasks/e2e";
import "./tasks/functions";

require('dotenv').config()

const superAccounts = []
if (process.env.PRIVATE_KEY_SUPER) {
  superAccounts.push(process.env.PRIVATE_KEY_SUPER)
}
const localhostPrivateKeys = []
if (process.env.PRIVATE_KEY_LOCALHOST) {
  localhostPrivateKeys.push(process.env.PRIVATE_KEY_LOCALHOST)
}

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      viaIR: true  // Enable the IR optimization to work around the "Stack too deep" error
    }
  },
  networks: {
    super: {
      chainId: 852024,
      url: "https://rpc-super-mukaeb-testnet-aigxcpckcf.t.conduit.xyz",
      accounts: superAccounts,
    },
    hardhat: {
      chainId: 1337,
    },
    localhost: {
      chainId: 1337,
      url: "http://127.0.0.1:8545",
      accounts: localhostPrivateKeys,
    }
  },
};

export default config;