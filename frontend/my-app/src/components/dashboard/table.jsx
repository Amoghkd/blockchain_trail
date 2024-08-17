import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';

const TableComponent = ({ data, handleTableAction, handleCreateContract }) => {
  const timeElapsed = (timestamp) => {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid ISO 8601 timestamp provided.');
    }
    const currentTime = Date.now();
    const timeElapsed = currentTime - date.getTime();
    const days = Math.floor(timeElapsed / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeElapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeElapsed % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeElapsed % (1000 * 60)) / 1000);
    const formattedTime = `${days} days : ${hours.toString().padStart(2, '0')} hours : ${minutes.toString().padStart(2, '0')} mins : ${seconds.toString().padStart(2, '0')} secs`;
    return <td>{formattedTime}</td>;
  };

  return (
    <Container>
      <Row className="mb-3">
        <Col className="text-right">
          {/* <Button variant="success" onClick={handleCreateContract}>
            Create Contract
          </Button> */}
        </Col> 
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Contract Name</th>
                <th>Duration</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.Contract_name}</td>
                  {timeElapsed(item.timestamp)}
                  <td>
                    <Button variant="primary" onClick={() => handleTableAction(item.Contract_name, item.ABI)}>
                      Next
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

TableComponent.propTypes = {
  data: PropTypes.array.isRequired,
  handleTableAction: PropTypes.func.isRequired,
  handleCreateContract: PropTypes.func.isRequired, // Added prop for the create contract button
};

export default TableComponent;
