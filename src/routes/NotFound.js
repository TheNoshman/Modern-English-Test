import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// Error handling component
const NotFound = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Page not found</h1>
          <hr />
          <LinkContainer to='/'>
            <Button>Return to Home</Button>
          </LinkContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
