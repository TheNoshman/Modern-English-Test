import React from 'react';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Navigation = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Navbar bg='light' expand='lg'>
            <LinkContainer to='/'>
              <Navbar.Brand>Bitcoin React Application</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
          </Navbar>
        </Col>
      </Row>
    </Container>
  );
};

export default Navigation;
