const { ethers } = require("ethers");
//const  {EtherscanProvider} = ethers.provider;
//const { JsonRpcProvider } = ethers.providers;

// Connect to the Ethereum network
//const provider = ethers.getDefaultProvider("https://polygon-amoy.infura.io/v3/506618e4f7514c808ceea6d519e1c4df");
// const provider = new EtherscanProvider( 
//     "Amoy", 
//     "https://polygon-amoy.infura.io/v3/506618e4f7514c808ceea6d519e1c4df"
//   );
// //const contract = new web3.eth.Contract(contractABI, contractAddress);

//const provider = new ethers.providers.InfuraProvider('506618e4f7514c808ceea6d519e1c4df', 'https://polygon-amoy.infura.io/v3/506618e4f7514c808ceea6d519e1c4df');
require('dotenv').config();
const url=process.env.INFURA_URL ;
const provider =new ethers.JsonRpcProvider(url);
console.log('the provider is ' ,provider);




async function getTransactionHistory(req, res) {

  // ABI of the contract
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

const jsonString = localStorage.getItem('nameoffile');

if (jsonString) {
  var ABI = JSON.parse(jsonString);
  console.log('JSON data retrieved from localStorage:', ABI);
} else {
  console.log('No JSON data found in localStorage.');
  return res.status(500).send({ message: "No JSON data found in localStorage." });
}

// Contract address
const contractAddress = localStorage.getItem('addressofcont');



// Create a contract instance
const contract = new ethers.Contract(contractAddress, ABI, provider);
console.log('the contract is',contract);

  
  try {
    const events = await contract.queryFilter("*", 0, "latest");
    

    console.log(events);
} catch (error) {
    console.error("Error fetching events:", error);
}
}
          
 

  
  
//   try {
//         // Get transaction history for the contract address
//         const history = await provider.getLogs(contractAddress);
//          console.log("Transaction history:", history);

//         const transactionDetails = [];

//         for (const tx of history) {
//             // Fetch the transaction receipt
//             const receipt = await provider.getTransactionReceipt(tx.hash);

//             // Check if the contract address is involved in the transaction
//             if (receipt.to && receipt.to.toLowerCase() === contractAddress.toLowerCase()) {
//                 // Decode the input data
//                 const parsedTransaction = contract.interface.parseTransaction(tx);
//                 transactionDetails.push({
//                     functionName: parsedTransaction.name,
//                     arguments: parsedTransaction.args,
//                     transactionHash: tx.hash,
//                 });
//             }
//         }

//         res.json(transactionDetails);
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).send("Internal Server Error");
//     }
// }


module.exports={getTransactionHistory} ;
