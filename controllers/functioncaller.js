const ethers = require('ethers');
const fs = require('fs');
require('dotenv').config();

const { getContractDetails} =require('../models/getdetailsbyname');
const privkey=process.env.PRIVATEKEY;
const url=process.env.INFURA_URL ;
const provider = ethers.getDefaultProvider(url);
const wallet = new ethers.Wallet(privkey, provider);
const account = wallet.address;

const callFunction = async (req, res) => {
  console.log("Calling function");
  console.log(req.body);

  const functionName=req.body.functionName ;
  const functionParams=req.body.params ; // an array of params
  console.log('the function params are',functionParams) ;

// //getting abi and contract address from local storage 
  // if (typeof localStorage === "undefined" || localStorage === null) {
  //   var LocalStorage = require('node-localstorage').LocalStorage;
  //   localStorage = new LocalStorage('./scratch');
  // }
 // const jsonString = localStorage.getItem('secondcontractABI');
 // if (jsonString) {
  //   var ABI = JSON.parse(jsonString);
  //   console.log('JSON data retrieved from localStorage:', ABI);
  // } else {
  //   console.log('No JSON data found in localStorage.');
  //   return res.status(500).send({ message: "No JSON data found in localStorage." });
  // }
  // const contractAddress = localStorage.getItem('addressofcont');
  // if (!contractAddress) {
  //   console.log('No contract address found in localStorage.');
  //   return res.status(500).send({ message: "No contract address found in localStorage." });
  // }
  // console.log("the contract address from local storage is ", contractAddress);

  const contract = new ethers.Contract(contractAddress, ABI, provider);
  const signedContract = contract.connect(wallet);

  try {
     //checking if fucntion exists in abi 
  const functionAbi=ABI.find(item => item.name ===functionName && item.type=== 'function') ;
  if(!functionAbi) {
    throw new Error(`fucntion ${functionName} not found in abi`) ;
  }
 //check for the number of parameters 
 const expectedParmasCount=functionAbi.inputs.length ;
 if(functionParams.length !== expectedParmasCount){
  throw new Error(`Function ${functionName} expects ${expectedParmasCount} parameters,but ${functionParams.length} were provided. `) ;
 }
    const tx = await signedContract[functionName](...functionParams);//... is the spread operator in js -used to expand the array 
    const receipt = await tx.wait();
    const txHash = tx.hash;
    console.log("Function call confirmed:", tx);
    console.log("Function call confirmed:", txHash);
    console.log("waiting for transaction...");
    console.log("receipt hash:", receipt.hash);
    // details of the func given to local storage 
    localStorage.setItem('lastTxDetails', JSON.stringify({functionName,functionParams,txHash, receiptHash: receipt.hash }));
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
