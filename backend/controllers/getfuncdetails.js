const { ethers } = require("ethers");
// Connect to the Ethereum network
const url = process.env.INFURA_URL;
const provider = new ethers.JsonRpcProvider(url);

const { getContractDetails } = require('../models/getdetailsbyname');

async function getTransactionHistory(req, res) {
  const contractName = req.body.contractName; // Assuming the contract name is passed in the request body
  const eventName = req.body.eventName; // Assuming the event name is also passed in the request body

  try {
    const contractDetails = await getContractDetails(contractName);
    if (!contractDetails) {
      return res.status(404).send({ message: "Contract not found" });
    }

    const { abi, contract_address } = contractDetails;

    // Create a contract instance
    const contract = new ethers.Contract(contract_address, abi, provider);

    // Fetch all events
    const events = await contract.queryFilter("*", 0, "latest");
    console.log("The events are: ", events);

    // Filter events by the specified event name and process the arguments
    const filteredEventArgs = events
      .filter(event => event.fragment.name === eventName)
      .map(event => {
        const argsObject = {};
        event.fragment.inputs.forEach((input, index) => {
          argsObject[input.name] = typeof event.args[index] === 'bigint'
            ? Number(event.args[index])
            : event.args[index];
        });
        return argsObject;
      });

    // Log and send the filtered event args as a JSON object in the response
    console.log("Filtered event args:", filteredEventArgs);
    res.json({ events: filteredEventArgs });

  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).send({ message: "Error in getting details" });
  }
}

module.exports = { getTransactionHistory };
