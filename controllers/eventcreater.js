const solc = require('solc');

const Ec = (req,res,next) => {
    console.log("creating new event");
    console.log(req.body) ;


try{
    
const contractname=req.body.contractname ;
const eventname=req.body.eventname;
const stringname=req.body.stringname ;
const datatype=req.body.datatype ;
    
const temp =`

// SPDX-License-Identifier: MIT
      
      pragma solidity ^0.8.18;

  contract ${contractname}{

    event ${eventname}(string  name ,string datatype);

    function addEvent(string memory _${stringname},string memory _${datatype}) public{
       emit ${eventname}(_${stringname}, _${datatype});
    }
}
    ` ;


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
    for (const contractName in output.contracts['MyContract.sol']) {
        console.log(`Contract: ${contractName}`);
        console.log('ABI:', output.contracts['MyContract.sol'][contractName].abi);
        console.log('Bytecode:', output.contracts['MyContract.sol'][contractName].evm.bytecode.object);
    }
     res.status(200).send(output) ;
o
    }catch (error) {
        console.error('Error parsing JSON:', error);
        res.status(500).send('Internal server error');
      }

};


module.exports={Ec} ;