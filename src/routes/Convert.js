import React, { useEffect, useState, useMemo } from 'react';
import { getBitcoinValueAPI, getBitcoinConversionAPI } from '../serviceAPI';
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  DropdownButton,
  Dropdown,
  ListGroup,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
export default function Convert() {
  const [bitcoinValue, setBitcoinValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState('AUD');
  const history = useHistory();
  useEffect(() => {
    (async () => {
      setBitcoinValue(await getBitcoinValueAPI());
      setLoading(false);
    })();
  }, []);
  return (
    <Container>
      <Row>
        <Col>
          <h1>Convert Bitcoin Into Currency</h1>
          {loading ? (
            <Col>
              <Spinner animation='border' role='status'>
                <span className='visually-hidden'>Loading...</span>
              </Spinner>
            </Col>
          ) : (
            <Col>
              <DropdownButton
                style={{ marginTop: '1rem' }}
                id='dropdown-basic-button'
                title='From'
              >
                {Object.keys(bitcoinValue).map((el, i) => {
                  return (
                    <Dropdown.Item key={i} onClick={() => setSelected(el)}>
                      {el}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>

              <Col>
                <h3>{selected}</h3>
              </Col>
            </Col>
          )}
          <Button style={{ marginRight: '1rem' }}>Refresh</Button>

          <Button onClick={() => history.push('/')}>Back</Button>
        </Col>
      </Row>
    </Container>
  );
}
