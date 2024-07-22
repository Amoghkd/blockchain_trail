const Connection = require('mysql/lib/Connection');
const mysql=require('mysql2');
require('dotenv').config();

const dbConfig={
    host:"localhost" ,
    user :"root" ,
    password :process.env.sql_pass ,
};

const StoreContractDetails= async(ContractName,ABI,contractAddress) => {
   const connection =mysql.createConnection(dbConfig);
   
   const dbName='Blockchain_Trail' ;
   const tablename='contract_details' ;

   //creating db if it doesnt exist
   connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`,(error) =>{
      if(error){
        console.log('error creating database') ;
        return ;
      }
    console.log('db created or already existed');


 //switching to the new db 
 connection.changeUser({database:dbName},(error)=>{
    if(error){
        console.log('error changing database',error);
    }
 

 //create the table if it doesnt exist 
 const CreateTableQuery=`CREATE TABLE IF NOT EXISTS ${tablename}(
 id INT AUTO_INCREMENT PRIMARY KEY ,
 timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 Contract_name VARCHAR(255) NOT NULL,
 ABI TEXT NOT NULL ,
 contract_address VARCHAR(255) NOT NULL )
 ` ;

 connection.query(CreateTableQuery,(error) => {
    if(error){
        console.log('error creating table',error) ;
        return ;
    }
    console.log('table created or already existed') ;
 


 //inserting the contract details into the table 
 const query=`INSERT INTO ${tablename} (Contract_name,ABI,contract_address) VALUES(?,?,?)`;
 const values=[ContractName,JSON.stringify(ABI),contractAddress] ;

 connection.query(query,values,(error,results)=>{
    if(error){
        console.log('error inserting into the table',error);
        return ;
    }
    console.log('contract details inserted succesfully',results) ;
 });
 connection.end();
});
});
});

};

module.exports={StoreContractDetails};