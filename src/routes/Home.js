import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

// Homepage

const Home = () => {
  const history = useHistory();
  return (
    <Container>
      <Row>
        <Col>
          <h1>Modern English Interview Project</h1>
          <h6>By Chris Norish</h6>
          <p>Please select a function:</p>
          <hr />
          <Button
            onClick={() => history.push('/value')}
            style={{ marginRight: '1rem' }}
          >
            Check Bitcoin Value
          </Button>
          <Button onClick={() => history.push('/convert')}>
            Convert into Bitcoin
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
