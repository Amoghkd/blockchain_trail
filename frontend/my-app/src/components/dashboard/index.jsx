import React from 'react';
import  { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Dashboard = (props) => {
    console.log('data', props.data)
// if (!data) {
//   return null; // Return nothing if data is not available
//   }
const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
console.log("state:", open);

const { control, handleSubmit, register,reset} = useForm({
  defaultValues: {
    contractname: '',
    events: [{ eventName: '', arguments: [{ input1: '', input2: 'string' }] }]
  }
});

const { fields, append, remove } = useFieldArray({
  control,
  name: 'events'
});

const onSubmit = async (data) => {
  try {
    handleClose();
    const response = await axios.post('http://localhost:4000/api/e', data);
    console.log(response.data);
    reset();
    toast.success('Event created successfully!');
    // Optionally update your data to reflect the new contract
     props.updateData();
  } catch (error) {
    console.error('Error deploying contract:', error);
    toast.error('Failed to create event.');
  }
};

const timeElapsed = (props) =>{
    // 1. Parse the ISO 8601 timestamp string into a Date object
  const timestamp = new Date(props);
 if (isNaN(timestamp.getTime())) {
      throw new Error('Invalid ISO 8601 timestamp provided.');
     }
   // 3. Get current time in milliseconds
     const currentTime = Date.now();
   // 4. Calculate time elapsed in milliseconds
  const timeElapsed = currentTime - timestamp.getTime();
 // 5. Convert milliseconds to individual units (days, hours, minutes, seconds)
  const days = Math.floor(timeElapsed / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeElapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeElapsed % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeElapsed % (1000 * 60)) / 1000);
 const formattedTime = `${days}days:${hours.toString().padStart(2, '0')}hours:${minutes.toString().padStart(2, '0')}mins:${seconds.toString().padStart(2, '0')}secs`;
  return( <td>{formattedTime}</td>) 
}

 
return(
   <>
   <ToastContainer /> 
   <Button variant="contained" color="primary" onClick={handleOpen}>
        Create Contract
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ p: 4, backgroundColor: 'white', margin: 'auto', width: 400 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register('contractname')}
              label="Contract Name"
              fullWidth
              margin="normal"
            />
            {fields.map((item, index) => (
              <div key={item.id}>
                <TextField
                  {...register(`events.${index}.eventName`)}
                  label="Event Name"
                  fullWidth
                  margin="normal"
                />
                {item.arguments.map((arg, argIndex) => (
                  <div key={argIndex}>
                    <TextField
                      {...register(`events.${index}.arguments.${argIndex}.input1`)}
                      label="Input 1"
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      {...register(`events.${index}.arguments.${argIndex}.input2`)}
                      label="Input 2"
                      select
                      SelectProps={{
                        native: true,
                      }}
                      fullWidth
                      margin="normal"
                      >
                      <option value ="string">string</option>
                      <option value="number">number</option>
                      </TextField>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => append({ eventName: '', arguments: [{ input1: '', input2: '' }] })}
                >
                  Add Event
                </Button>
                <Button
                  type="button"
                  onClick={() => remove(index)}
                >
                  Remove Event
                </Button>
              </div>
            ))}
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    <table border='1'>
      <thead>
        <tr>
          {/* Dynamically generate table headers from the first object's keys */}
          {/* {Object.keys(props.data[0]).map((itemHeaders, key) => ( */}
            <>
           <th>ContractName</th>
           <th>duration</th>
            <th>Action</th>
            </>
          {/* ))} */}
        </tr>
      </thead>
      <tbody>
        {props.data.map((item, index) => (
          <tr>
            <td>
            {item.Contract_name}
            </td>
           
            {timeElapsed(item.timestamp)  }
            
            <td>
            <button onClick={() => {props.handleTableAction(item.id)}}>Next</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
);
}
export default Dashboard;