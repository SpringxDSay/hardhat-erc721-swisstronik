// Import necessary modules from Hardhat and SwisstronikJS
const hre = require("hardhat");
const { SwisstronikPlugin } = require("@swisstronik/web3-plugin-swisstronik");
hre.web3.registerPlugin(new SwisstronikPlugin(hre.network.config.url));
async function main() {
  const replace_contractAddress = "0x0d7533028f3794Ea348221fB01cef7B526A944a9";
  const [from] = await hre.web3.eth.getAccounts();
  const contractFactory = await hre.ethers.getContractFactory("TestNFT");
  const ABI = JSON.parse(contractFactory.interface.formatJson());
  const contract = new hre.web3.eth.Contract(ABI, replace_contractAddress);
  const replace_functionArgs = "0xbEF9f7BBd617da4eDAa37dc2A241016304a39216"; // Recipient address
  console.log("Minting 1 token...");
  try {
    const transaction = await contract.methods
      .safeMint(replace_functionArgs)
      .send({ from });
    console.log("Transaction submitted! Transaction details:", transaction);
    // Display success message with recipient address
    console.log(
      `Transaction completed successfully! ✅ Non-Fungible Token minted to ${replace_functionArgs}`
    );
    console.log("Transaction hash:", transaction.transactionHash);
  } catch (error) {
    console.error(`Transaction failed! Could not mint NFT.`);
    console.error(error);
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
