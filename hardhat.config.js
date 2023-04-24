require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    theta: {
      chainId: 365,
      accounts: [process.env.NEXT_PUBLIC_PRIVATE_KEY],
      url: "https://eth-rpc-api-testnet.thetatoken.org/rpc",
    },
  },
};
