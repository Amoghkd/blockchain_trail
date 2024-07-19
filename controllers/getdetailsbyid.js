// modules/fetchContractList.js
const mysql = require('mysql2');
require('dotenv').config();

const dbConfig = {
  host: "localhost",
  user: "root",
  password: process.env.sql_pass,
  database: 'blockchain_trail'
};

const getbyid = async (req, res) => {
  const { id } = req.body; // Assuming the ID is sent in the request body

  if (!id) {
    res.status(400).send({ message: 'ID is required' });
    return;
  }

  const connection = mysql.createConnection(dbConfig);

  const query = 'SELECT * FROM contract_details WHERE id = ?';

  connection.query(query, [id], (error, results) => {
    if (error) {
      console.error('Error fetching contract details:', error);
      res.status(500).send({ message: 'Error fetching contract details' });
      return;
    }

    if (results.length === 0) {
      res.status(404).send({ message: 'No contract found with the given ID' });
      return;
    }

    console.log('Contract details fetched successfully:', results);
    res.status(200).send(results);
  });

  connection.end();
};

module.exports = { getbyid };
