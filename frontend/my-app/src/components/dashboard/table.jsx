import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Container, Row, Col, FormControl, InputGroup } from 'react-bootstrap';
import Fuse from 'fuse.js';
import { Search, SwapVert } from '@mui/icons-material';

const TableComponent = ({ data, handleTableAction }) => {
  const [query, setQuery] = useState('');
  const [isDescending, setIsDescending] = useState(true);

  const fuse = new Fuse(data, {
    keys: ['Contract_name'], // Adjust based on the fields you want to search
    includeScore: true,
    threshold: 0.3, // Controls fuzziness, lower is more exact match
  });

  const results = query ? fuse.search(query).map(result => result.item) : data;

  const sortedResults = isDescending
    ? [...results].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    : [...results].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

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
    return `${days} days : ${hours.toString().padStart(2, '0')} hours : ${minutes.toString().padStart(2, '0')} mins : ${seconds.toString().padStart(2, '0')} secs`;
  };

  return (
    <Container>
      <Row className="mb-3">
        <Col className="text-right">
          <InputGroup className="mb-3" style={{ maxWidth: '300px', marginLeft: 'auto' }}>
            <FormControl
              placeholder="Search Contracts"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0' }}
            />
            <InputGroup.Text style={{ backgroundColor: '#f7f7f7', borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}>
              <Search />
            </InputGroup.Text>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '10px' }}>
            <Button
              variant="light"
              onClick={() => setIsDescending(!isDescending)}
              style={{ borderRadius: '50%', padding: '5px' }}
            >
              <SwapVert />
            </Button>
          </div>
          <Table bordered hover style={{ borderRadius: '10px', overflow: 'hidden', backgroundColor: '#f7f7f7' }}>
            <thead>
              <tr>
                <th>Contract Name</th>
                <th>Duration</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedResults.map((item, index) => (
                <tr key={index}>
                  <td>{item.Contract_name}</td>
                  <td>{timeElapsed(item.timestamp)}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleTableAction(item.Contract_name, item.ABI)}
                      style={{ color: '#00f', backgroundColor: '#e6f0ff', borderColor: '#e6f0ff' }}
                    >
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
};

export default TableComponent;
