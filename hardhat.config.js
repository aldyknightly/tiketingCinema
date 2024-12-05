require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    'lisk-sepolia': {
      url: process.env.LISK_SEPOLIA_RPC || 'https://rpc.sepolia-api.lisk.com',
      accounts: process.env.WALLET_KEY ? [process.env.WALLET_KEY] : [],
      gasPrice: 1000000000,
      timeout: 20000, // timeout dalam milidetik
    },
  },
};
