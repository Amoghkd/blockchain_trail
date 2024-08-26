const solc = require('solc');
const fs = require('fs');
//const fs = require('path'); 
const ethers = require('ethers');
const { TASK_CLEAN_GLOBAL } = require('hardhat/builtin-tasks/task-names');
const { int } = require('hardhat/internal/core/params/argumentTypes');
require('dotenv').config();
const storeContractDetails = require('../models/storeContractDetails'); 
const privkey=process.env.PRIVATEKEY;
const url=process.env.INFURA_URL ;
const provider = ethers.getDefaultProvider(url);
const wallet = new ethers.Wallet(privkey, provider);
var mysql = require('mysql2');
const account = wallet.address;


const Ec = async (req, res, next) => {
  console.log("Creating new event");
 


 try {
    const contractname = req.body.contractname;
    const data=req.body ;
    
    
      
      var logger = [];
      var arglogger1 = [] ;
      var arglogger2 = [] ;
      var event1=[] ;
      for (let i = 0; i < data.events.length; i++) {
        const event = data.events[i]; // Get the current event object
        var j=0 ;
        for (j = 0; j < event.arguments.length; j++) {
          const arguments = event.arguments[j];
             const combinedargforevent = `${solidize(arguments.input2)} ${arguments.input1}`;
             const combinedardforfunc =`${solidize1(arguments.input2)}${arguments.input1}`;
             const combinedardforemit =`_${arguments.input1}`;
             
             
             logger.push(combinedargforevent);
             arglogger1.push(combinedardforfunc);   
             arglogger2.push(combinedardforemit);
             
              }
              
            event1[i]=eventcreater(event,logger,arglogger1,arglogger2) ; 
           // console.log(event[i]);  
            if(j==(event.arguments.length)){
              logger = [];
              arglogger1 = [] ;
              arglogger2 = [] ;
            } 
       }
    // console.log(logger);
     //console.log(arglogger1);
     //console.log(arglogger2);
     console.log(event1.join('')) ; 
function eventcreater(event,arglogger,arglogger1,arglogger2){//called for each event 
      
        const eventname =event.eventName ;
         var event ;
         event=`event ${eventname}(${arglogger.toString()});
  
    function addEvent${eventname}(${arglogger1.toString()}) public {
      emit ${eventname}(${arglogger2.toString()});
    } ` ;
      //console.log(event[index]);
      return event ;
       }  
      
function solidize1(datatype){  //to format the input to solidity argument format 
    //console.log('the datatype is ',datatype) ;
    switch(datatype){
        case 'number' :
            var actdatatype = 'uint256 _' ;
            break ;
        case 'string' :
            var actdatatype ='string memory _' ;
            break ;
    }
   return actdatatype ;
} 
function solidize(datatype){
  //console.log('the datatype is ',datatype) ;
  switch(datatype){
      case 'number' :
          var actdatatype = 'uint256' ;
          break ;
      case 'string' :
          var actdatatype ='string' ;
          break ;
  }
 return actdatatype ;
} 
    
    const temp = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract ${contractname} {
 ${event1.join('')}

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
    await storeContractDetails.StoreContractDetails(contractname, ABI, address); // Add this line to store contract details
    console.log("contract details stored in sql ") ;

  res.send({ message: "Contract deployed successfully!" });
  } catch (error) {
    console.error("Error deploying contract:", error);
    res.status(500).send({ message: "Error creating event" });
  }

  next();
};

module.exports={Ec} ;