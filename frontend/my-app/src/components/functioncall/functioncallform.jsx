import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Table, Button, Form } from 'react-bootstrap';

const FunctionCallForm = () => {
  const location = useLocation();
  const { contractName, functionName, inputs } = location.state;
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [eventHistory, setEventHistory] = useState([]);

  useEffect(() => {
    const fetchEventHistory = async () => {
      try {
        const response = await axios.post('http://localhost:4000/api/funcparams', {
          contractName,
          eventName: functionName.replace('addEvent', '') // Modify as needed
        });
        setEventHistory(response.data.events || []);
      } catch (error) {
        console.error('Error fetching event history:', error);
        setError('Failed to fetch event history.');
      }
    };

    fetchEventHistory();
  }, [contractName, functionName]);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);

    const params = inputs.map((_, index) => data[`param_${index}`]);

    try {
      const response = await axios.post('http://localhost:4000/api/f', {
        contractName,
        functionName,
        params
      });
      console.log(response.data);
      alert('Function called successfully!');
    } catch (error) {
      console.error('Error calling function:', error);
      setError(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderTableHeader = () => {
    if (eventHistory.length > 0) {
      return (
        <tr>
          <th>#</th>
          {Object.keys(eventHistory[0]).map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      );
    }
    return null;
  };

  const renderTableRows = () => {
    return eventHistory.map((item, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        {Object.values(item).map((value, idx) => (
          <td key={idx}>{value}</td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="container" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
      <Form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '20px', maxWidth: '500px' }}>
        <h2>Call Function: {functionName}</h2>
        {inputs.map((input, index) => (
          <Form.Group controlId={`param_${index}`} key={index}>
            <Form.Label>{`${input.name} (${input.internalType})`}</Form.Label>
            <Form.Control
              type="text"
              {...register(`param_${index}`)}
              defaultValue={input.internalType === 'uint256' ? 0 : ''}
            />
          </Form.Group>
        ))}
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Calling...' : 'Call Function'}
        </Button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Form>
      
      <div style={{ marginBottom: '20px' }}></div> {/* Added space between form and table */}

      <h2>Event History</h2>
      {eventHistory.length > 0 ? (
        <Table striped bordered hover>
          <thead>{renderTableHeader()}</thead>
          <tbody>{renderTableRows()}</tbody>
        </Table>
      ) : (
        <p>No event history available.</p>
      )}
    </div>
  );
};

export default FunctionCallForm;
