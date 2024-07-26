const { ethers } = require("ethers");
// Connect to the Ethereum network
const url=process.env.INFURA_URL ;
const provider =new ethers.JsonRpcProvider(url);
//console.log('the provider is ' ,provider);
const { getContractDetails} =require('../models/getdetailsbyname');

async function getTransactionHistory(req, res) {

  const contractName = req.body.contractName; // Assuming the contract name is passed in the request body
  console.log(contractName) ;
  
  try {
       const contractDetails = await getContractDetails(contractName);
       console.log(contractDetails);
       if (!contractDetails) {
          return res.status(404).send({ message: "Contract not found" });
        }
        const { abi, contract_address } = contractDetails;
        
    // Create a contract instance
        const contract = new ethers.Contract(contract_address, abi, provider);
            console.log('the contract is',contract);

    const events = await contract.queryFilter("*", 0, "latest");
    console.log('the event is ',events[0].args);
    const events1=JSON.stringify(events);
    res.status(200).send(events1);
    //res.json(events1);

} catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).send({ message: "Error in getting details" });
}
}
          
module.exports={getTransactionHistory} ;
