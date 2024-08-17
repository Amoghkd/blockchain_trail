import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';

const FunctionCallPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { contractName, abi } = location.state;

  const handleNavigate = (func) => {
    navigate('/historyandparams', {
      state: {
        contractName,
        functionName: func.name,
        inputs: func.inputs,
      },
    });
  };

  return (
    <Box sx={{ p: 4, backgroundColor: 'white', margin: 'auto', maxWidth: '80vw', maxHeight: '80vh', overflowY: 'auto' }}>
      <h1>Contract Functions</h1>
      {abi.filter(item => item.type === 'function').map((func, idx) => (
        <Button key={idx} onClick={() => handleNavigate(func)} variant="contained" color="primary" style={{ margin: '10px' }}>
          {func.name}
        </Button>
      ))}
    </Box>
  );
};

export default FunctionCallPage;
