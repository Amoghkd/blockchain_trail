const mysql = require('mysql2');
require('dotenv').config();

// Database configuration
const dbConfig={
    host:"localhost" ,
    user :"root" ,
    password :process.env.sql_pass ,
    database: 'blockchain_trail'
};

// Function to get contract details by name
const getContractDetails = (contractName) => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(dbConfig);

    const query = 'SELECT abi, contract_address FROM contract_details WHERE contract_name = ? ORDER BY id DESC LIMIT 1';
    connection.query(query, [contractName], (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (results.length === 0) {
          reject(new Error('No contract details found in the database.'));
        } else {
          const { abi, contract_address } = results[0];
          resolve({ abi, contract_address });
        }
      }
      connection.end();
    });
  });
};

module.exports = { getContractDetails };
