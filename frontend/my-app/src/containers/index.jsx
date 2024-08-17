import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TableComponent from '../components/dashboard/table';
import ModalComponent from '../components/dashboard/modal';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/dashboard.css'; // Import the external stylesheet for non-Material UI components

const Dashboard = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const API_URL = 'http://localhost:4000/api/fetchall';

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleContractCreation = async (data) => {
    try {
      setIsLoading(true);
      handleClose();
      const response = await axios.post('http://localhost:4000/api/e', data);
      console.log(response.data);
      toast.success('Contract Created Successfully');
      // Optionally fetch updated data
      const updatedData = await fetch(API_URL);
      const newFetchedData = await updatedData.json();
      setData(newFetchedData);
    } catch (error) {
      console.error('Error creating Contract:', error);
      toast.error('Error Creating Contract');
    } finally {
      setIsLoading(false);
      Dashboard() ;

    }
  };

  const handleTableAction = (contractName, abi) => {
    navigate('/call-function', { state: { contractName, abi } });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-logo">ContractR</div>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#28a745',
            color: 'white',
            '&:hover': {
              backgroundColor: '#218838',
            },
            marginLeft: 'auto',
          }}
          onClick={handleOpen}
        >
          Create Contract
        </Button>
      </div>

      {isLoading && (
        <div className="loader">
          <img src="https://i.imgur.com/llF5iyg.gif" alt="mining..." width="100" />
          <p>Mining....</p>
        </div>
      )}
      {error && <p className="error-message">Error: {error}</p>}
      {data && <TableComponent data={data} handleTableAction={handleTableAction} />}
      <ModalComponent open={open} handleClose={handleClose} onSubmit={handleContractCreation} />
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
