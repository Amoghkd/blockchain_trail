import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CloseIcon from '@mui/icons-material/Close';

const ModalComponent = ({ open, handleClose, onSubmit, loading }) => {
  const { control, handleSubmit, register, watch } = useForm({
    defaultValues: {
      contractname: '',
      events: [{ eventName: '', arguments: [{ input1: '', input2: 'string' }] }]
    }
  });

  const { fields: eventFields, append: appendEvent, remove: removeEvent, update: updateEvent } = useFieldArray({
    control,
    name: 'events'
  });

  const watchEvents = watch('events');

  const handleAddArgument = (eventIndex) => {
    const updatedArguments = [
      ...watchEvents[eventIndex].arguments,
      { input1: '', input2: 'string' }
    ];
    updateEvent(eventIndex, {
      ...watchEvents[eventIndex],
      arguments: updatedArguments
    });
  };

  const handleRemoveArgument = (eventIndex, argIndex) => {
    const updatedArguments = watchEvents[eventIndex].arguments.filter((_, aIdx) => aIdx !== argIndex);
    updateEvent(eventIndex, {
      ...watchEvents[eventIndex],
      arguments: updatedArguments
    });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          padding: '16px',
          backgroundColor: 'white',
          margin: 'auto',
          width: '400px',
          maxHeight: '80vh',
          overflowY: 'auto'
        }}
      >
        {loading ? (
          <div style={{ textAlign: 'center' }}>
            <img src="https://i.imgur.com/llF5iyg.gif" alt="Mining..." width="100" />
            <p>Mining...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register('contractname')}
              label="Contract Name"
              fullWidth
              margin="normal"
              size="small"
              sx={{
                borderColor: 'lightblue',
                '&:hover': {
                  boxShadow: '0px 0px 5px 2px rgba(173, 216, 230, 0.5)',
                },
              }}
            />
            {eventFields.length === 0 && (
              <Button
                type="button"
                onClick={() => appendEvent({ eventName: '', arguments: [{ input1: '', input2: 'string' }] })}
                variant="contained"
                color="secondary"
                size="small"
                sx={{
                  backgroundColor: 'lightblue',
                  borderRadius: '0', // Rectangular shape
                  '&:hover': {
                    backgroundColor: 'darkblue',
                    color: 'white',
                  },
                }}
              >
                <AddCircleOutlineIcon />
              </Button>
            )}
            {eventFields.map((eventItem, eventIndex) => (
              <div key={eventItem.id} style={{ marginBottom: '20px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TextField
                    {...register(`events.${eventIndex}.eventName`)}
                    label="Event Name"
                    fullWidth
                    margin="normal"
                    size="small"
                    sx={{
                      borderColor: 'lightblue',
                      '&:hover': {
                        boxShadow: '0px 0px 5px 2px rgba(173, 216, 230, 0.5)',
                      },
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => appendEvent({ eventName: '', arguments: [{ input1: '', input2: 'string' }] })}
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{
                      backgroundColor: 'lightblue',
                      borderRadius: '0', // Rectangular shape
                      '&:hover': {
                        backgroundColor: 'darkblue',
                        color: 'white',
                      },
                    }}
                  >
                    <AddCircleOutlineIcon />
                  </Button>
                  <Button
                    type="button"
                    onClick={() => removeEvent(eventIndex)}
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{
                      backgroundColor: 'lightblue',
                      borderRadius: '0', // Rectangular shape
                      '&:hover': {
                        backgroundColor: 'darkblue',
                        color: 'white',
                      },
                    }}
                  >
                    <CloseIcon />
                  </Button>
                </Box>
                {watchEvents[eventIndex].arguments.map((arg, argIndex) => (
                  <Box key={argIndex} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TextField
                      {...register(`events.${eventIndex}.arguments.${argIndex}.input1`)}
                      label="Input 1"
                      fullWidth
                      margin="normal"
                      size="small"
                      sx={{
                        borderColor: 'lightblue',
                        '&:hover': {
                          boxShadow: '0px 0px 5px 2px rgba(173, 216, 230, 0.5)',
                        },
                      }}
                    />
                    <TextField
                      {...register(`events.${eventIndex}.arguments.${argIndex}.input2`)}
                      label="Input 2"
                      select
                      SelectProps={{
                        native: true,
                      }}
                      fullWidth
                      margin="normal"
                      size="small"
                      sx={{
                        borderColor: 'lightblue',
                        '&:hover': {
                          boxShadow: '0px 0px 5px 2px rgba(173, 216, 230, 0.5)',
                        },
                      }}
                    >
                      <option value="string">String</option>
                      <option value="number">Number</option>
                    </TextField>
                    <Button
                      type="button"
                      onClick={() => handleRemoveArgument(eventIndex, argIndex)}
                      variant="contained"
                      color="error"
                      size="small"
                      sx={{
                        backgroundColor: 'lightblue',
                        borderRadius: '0', // Rectangular shape
                        '&:hover': {
                          backgroundColor: 'darkblue',
                          color: 'white',
                        },
                      }}
                    >
                      <RemoveCircleOutlineIcon />
                    </Button>
                    <Button
                      type="button"
                      onClick={() => handleAddArgument(eventIndex)}
                      variant="contained"
                      color="secondary"
                      size="small"
                      sx={{
                        backgroundColor: 'lightblue',
                        borderRadius: '0', // Rectangular shape
                        '&:hover': {
                          backgroundColor: 'darkblue',
                          color: 'white',
                        },
                      }}
                    >
                      <AddCircleOutlineIcon />
                    </Button>
                  </Box>
                ))}
              </div>
            ))}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              sx={{
                backgroundColor: 'lightblue',
                borderRadius: '0', // Rectangular shape
                '&:hover': {
                  backgroundColor: 'darkblue',
                  color: 'white',
                },
              }}
            >
              Submit
            </Button>
          </form>
        )}
      </Box>
    </Modal>
  );
};

export default ModalComponent;
