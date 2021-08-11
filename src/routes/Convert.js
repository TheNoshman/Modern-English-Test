import React, { useEffect, useState } from 'react';
import { getBitcoinValueAPI, getBitcoinConversionAPI } from '../serviceAPI';
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  FloatingLabel,
  Form,
  InputGroup,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
export default function Convert() {
  const [bitcoinValue, setBitcoinValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState('AUD');
  const [amount, setAmount] = useState(0);
  const history = useHistory();
  useEffect(() => {
    (async () => {
      setBitcoinValue(await getBitcoinValueAPI());
      setLoading(false);
    })();
  }, []);

  const handleSubmit = async () => {
    console.log('cur = ', selected);
    console.log('amount = ', amount);
    const x = await getBitcoinConversionAPI(selected, parseInt(amount));
    console.log('BACK = ', x);
  };

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
            <Col md>
              <FloatingLabel
                controlId='floatingSelectGrid'
                label='Select currency'
                style={{ marginTop: '1rem', marginBottom: '1rem' }}
              >
                <Form.Select
                  aria-label='Floating label select example'
                  onChange={(el) => setSelected(el.nativeEvent.target.value)}
                >
                  {Object.keys(bitcoinValue).map((el, i) => {
                    return (
                      <option key={i} value={el}>
                        {el}
                      </option>
                    );
                  })}
                </Form.Select>
              </FloatingLabel>

              <Col md>
                <InputGroup hasValidation>
                  <InputGroup.Text>Amount</InputGroup.Text>

                  <Form.Control
                    type='number'
                    required
                    onChange={(v) => {
                      setAmount(v.nativeEvent.target.value);
                    }}
                    value={amount}
                  />
                  <Form.Control.Feedback type='invalid'>
                    Please choose a valid amount.
                  </Form.Control.Feedback>
                </InputGroup>
              </Col>
              <h1>{selected}</h1>
              <h1>{amount}</h1>
              <Col>
                <Button
                  style={{ marginTop: '1rem' }}
                  type='submit'
                  onClick={() => handleSubmit()}
                >
                  Submit
                </Button>
                <hr />
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
