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
  Alert,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function Convert() {
  // Local state management instantiation
  const [bitcoinValue, setBitcoinValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState('AUD');
  const [amount, setAmount] = useState(0);
  const [show, setShow] = useState(false);
  const [calc, setCalc] = useState(0);
  const history = useHistory();

  // On render, get Bitcoin value to populate conversion currency options in dropdown
  useEffect(() => {
    (async () => {
      setBitcoinValue(await getBitcoinValueAPI());
      setLoading(false);
    })();
  }, []);

  // Submit handler w/ error handling
  const handleSubmit = async () => {
    const number = Number.parseFloat(amount.replaceAll(/\s/g, ''));
    if (Number.isNaN(number) || number < 1) {
      setShow(true);
      return;
    }
    setCalc(await getBitcoinConversionAPI(selected, parseInt(amount)));
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
              <Alert show={show} variant='danger'>
                <Alert.Heading>Uh oh!</Alert.Heading>
                <p>Please enter a valid amount</p>
                <hr />
                <div className='d-flex justify-content-end'>
                  <Button
                    onClick={() => setShow(false)}
                    variant='outline-danger'
                  >
                    Close
                  </Button>
                </div>
              </Alert>
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
                    Please enter a valid number.
                  </Form.Control.Feedback>
                </InputGroup>
              </Col>
              <Col>
                <hr />
                <Col xs='auto'>
                  <InputGroup className='mb-2'>
                    <InputGroup.Text>₿</InputGroup.Text>
                    <Form.Control
                      type='text'
                      placeholder='Readonly input here...'
                      value={calc}
                      readOnly
                    />
                  </InputGroup>
                </Col>
                <hr />
              </Col>
            </Col>
          )}
          <Button
            variant='outline-primary'
            style={{ marginRight: '1rem' }}
            type='submit'
            onClick={() => handleSubmit()}
          >
            Submit
          </Button>
          <Button onClick={() => history.push('/Modern-English-Test')}>
            Back
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
