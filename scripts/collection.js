// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const gamerx_collection = await hre.ethers.getContractFactory(
    "NFTCollection"
  );
  const GamerX_contreact = await gamerx_collection.deploy(
    "GamerX NFT Collection",
    "GamerX"
  );

  await GamerX_contreact.deployed();

  console.log(` NFT Collection address: ${GamerX_contreact.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
