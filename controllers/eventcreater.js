const solc = require('solc');
const fs = require('fs');
//const fs = require('path'); 
const ethers = require('ethers');
const { TASK_CLEAN_GLOBAL } = require('hardhat/builtin-tasks/task-names');
const { int } = require('hardhat/internal/core/params/argumentTypes');
require('dotenv').config();
const provider = ethers.getDefaultProvider("https://polygon-amoy.infura.io/v3/506618e4f7514c808ceea6d519e1c4df");
const wallet = new ethers.Wallet("08eb99555889cf3e4d96a2a1e1c76ab01d848e9e396b2e3f9c4eba71c1ebf6be", provider);
const account = wallet.address;
console.log(wallet);

const Ec = async (req, res, next) => {
  console.log("Creating new event");
  console.log(req.body);

  try {
    const contractname = req.body.contractname;
    const eventname = req.body.eventname;
    const stringname = req.body.stringname;
    const datatype =req.body.datatype ;
    //Contract_name = (`Contract+${EventLogger}`);
console.log('the datatype is ',datatype) ;
    switch(datatype){
        case 'number' :
            var actdatatype = 'uint256' ;
            break ;
        case 'string' :
            var actdatatype ='string memory' ;
            break ;
    }
    console.log('the datatype is ',actdatatype) ; 
    //var actdatatype='string' ;

    const temp = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract ${contractname} {
  event ${eventname}(string ${stringname}, ${actdatatype} datatype);

  function addEvent(string memory _${stringname}, ${actdatatype} _${datatype}) public {
    emit ${eventname}(_${stringname}, _${datatype});
  }
}`;

console.log(temp) ;

    const input = {
      language: 'Solidity',
      sources: {
        'MyContract.sol': {
          content: temp,
        },
      },
      settings: {
        outputSelection: {
          '*': {
            '*': ['abi', 'evm.bytecode'],
          },
        },
      },
    };

    const output = JSON.parse(solc.compile(JSON.stringify(input)));
    console.log('the output is',output);
    const contractOutput = output.contracts['MyContract.sol'][contractname];
    const ABI = contractOutput.abi;
    const bytecode = contractOutput.evm.bytecode.object;

   

    const contractFactory = new ethers.ContractFactory(ABI, bytecode, wallet);
    console.log("Deploying......");
    const contract = await contractFactory.deploy();
    
     // Handle transaction confirmation (optional)
    const contractAddress = await contract.waitForDeployment();
    // const contractAddress = contract.address;
    
    console.log("this is the address1",contractAddress.target);
    const address = await contractAddress.getAddress();
    console.log("this is the address2",address);
    console.log("this is the address3",contract.getAddress());
    
   
    console.log("the abi is " ,ABI);
    // Use the deployed contract (optional)
    // You can call functions on the deployedContract object using its address and ABI
    // const contract1 = new ethers.Contract(contractAddress, ABI, provider);
    // const signedContract = contract.connect(wallet);

    // (async () => {
    //     try {
    //       const tx = await signedContract.addEvent("some data", "number");
    //       const receipt = await tx.wait();
    //       const tx1=tx.hash ;
    //       console.log("Function call confirmed:", tx);
    //       console.log("Function call confirmed:", tx1.hash);
    //       console.log("waiting for transaction...") ;
    //       console.log("receipt hASH:", receipt.hash);
    //     } catch (error) {
    //       console.error("Error calling function:", error);
    //     }
    //   })();
  //saving the file locally     
    //   console.log(ABI);
    //   const data=JSON.stringify(ABI,null,2);
    //   fs.writeFileSync(`${contractname},json`,data,);


    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
      }
    
    const jsonString = JSON.stringify(ABI);
    var nameoffile = `${contractname}+'ABI'`;
    console.log('namoffile is',nameoffile) ;
    localStorage.setItem(nameoffile, jsonString) ;
    console.log('JSON data saved to localStorage!');
    //console.log(localStorage.getItem('nameoffile'));

    localStorage.setItem('addressofcont',address) ;
    console.log('address saved to local storage ') ;
    console.log('address from loc sorage' ,localStorage.getItem('addressofcont'));


  res.send({ message: "Contract deployed successfully!" });
  } catch (error) {
    console.error("Error deploying contract:", error);
    res.status(500).send({ message: "Error creating event" });
  }

  next();
};

module.exports={Ec} ;