const ethers = require('ethers');
const fs = require('fs');
require('dotenv').config();

const provider = ethers.getDefaultProvider("https://polygon-amoy.infura.io/v3/506618e4f7514c808ceea6d519e1c4df");
const wallet = new ethers.Wallet("08eb99555889cf3e4d96a2a1e1c76ab01d848e9e396b2e3f9c4eba71c1ebf6be", provider);
const account = wallet.address;

const callFunction = async (req, res) => {
  console.log("Calling function");
  console.log(req.body);

  const param1 = req.body.stringname;
  const param2 = req.body.datatype;
  console.log('param2',param2);

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

  const contractAddress = localStorage.getItem('addressofcont');
  if (!contractAddress) {
    console.log('No contract address found in localStorage.');
    return res.status(500).send({ message: "No contract address found in localStorage." });
  }
  console.log("the contract address from local storage is ", contractAddress);

  const contract = new ethers.Contract(contractAddress, ABI, provider);
  const signedContract = contract.connect(wallet);

  try {
    const tx = await signedContract.addEvent(param1, param2);
    const receipt = await tx.wait();
    const txHash = tx.hash;
    console.log("Function call confirmed:", tx);
    console.log("Function call confirmed:", txHash);
    console.log("waiting for transaction...");
    console.log("receipt hash:", receipt.hash);
    // details of the func given to local storage 
    localStorage.setItem('lastTxDetails', JSON.stringify({ param1, param2, txHash, receiptHash: receipt.hash }));
    res.send({ message: "Function called successfully!", txHash, receiptHash: receipt.hash });
  } catch (error) {
    console.error("Error calling function:", error);
    let errorMessage = "Error calling function";
    if (error.code) {
      errorMessage = `Error: ${error.code} - ${error.message}`;
    }
    res.status(500).send({ message: errorMessage });
  }
};

module.exports = { callFunction };
