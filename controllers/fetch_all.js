// modules/fetchContractList.js
const mysql = require('mysql2');
require('dotenv').config();

const dbConfig={
    host:"localhost" ,
    user :"root" ,
    password :process.env.sql_pass ,
    database: 'blockchain_trail'
};

const fetchContractList = async (req, res) => {
  const connection = mysql.createConnection(dbConfig);

  const query = 'SELECT * FROM contract_details';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching contract details:', error);
      res.status(500).send({ message: 'Error fetching contract details' });
      return;
    }

    console.log('Contract details fetched successfully:', results);
    res.status(200).send(results);
  });

  connection.end();
};

module.exports = {fetchContractList};
