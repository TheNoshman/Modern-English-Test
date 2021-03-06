import React, { useEffect, useState } from 'react';
import { getBitcoinValueAPI } from '../serviceAPI';
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  FloatingLabel,
  ListGroup,
  Form,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function Value() {
  // Local state management
  const [bitcoinValue, setBitcoinValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState('AUD');
  const history = useHistory();

  // On render, get Bitcoin value
  useEffect(() => {
    (async () => {
      const result = await getBitcoinValueAPI();
      setBitcoinValue(result);
      setLoading(false);
    })();
  }, []);

  // Refresh API handler
  const updateState = async () => {
    setLoading(true);
    const result = await getBitcoinValueAPI();
    setBitcoinValue(result);
    setLoading(false);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Check Bitcoin Value</h1>
          {loading ? (
            <Col>
              <Spinner animation='border' role='status'>
                <span className='visually-hidden'>Loading...</span>
              </Spinner>
            </Col>
          ) : (
            <Col>
              <FloatingLabel
                controlId='floatingSelectGrid'
                label='Select currency'
                style={{ marginTop: '1rem', marginBottom: '1rem' }}
              >
                <Form.Select
                  aria-label='Floating label select example'
                  value={selected}
                >
                  {Object.keys(bitcoinValue).map((el, i) => {
                    return (
                      <option
                        key={i}
                        value={el}
                        onClick={() => setSelected(el)}
                      >
                        {el}
                      </option>
                    );
                  })}
                </Form.Select>
              </FloatingLabel>
              <Row>
                <hr />
                <ListGroup>
                  <ListGroup.Item>
                    Buy @ {bitcoinValue[selected].buy}
                  </ListGroup.Item>
                  <ListGroup.Item style={{ marginBottom: '1rem' }}>
                    Sell @ {bitcoinValue[selected].buy}
                  </ListGroup.Item>
                </ListGroup>
              </Row>
            </Col>
          )}
          <Button style={{ marginRight: '1rem' }} onClick={() => updateState()}>
            Refresh
          </Button>
          <Button
            variant='outline-danger'
            style={{ marginRight: '1rem' }}
            onClick={() => window.location.reload(false)}
          >
            Hard Refresh (local build only)
          </Button>

          <Button
            variant='outline-primary'
            onClick={() => history.push('/Modern-English-Test')}
          >
            Back
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
