import React, { useEffect, useState } from 'react';
import { getBitcoinValueAPI } from '../serviceAPI';
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

export default function Value() {
  const [bitcoinValue, setBitcoinValue] = useState([]);
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
                title='Select currency'
              >
                {Object.keys(bitcoinValue).map((el, i) => {
                  return (
                    <Dropdown.Item key={i} onClick={() => setSelected(el)}>
                      {el}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
              <Row>
                <h2 style={{ marginTop: '1rem' }}>{selected}</h2>
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
          <Button style={{ marginRight: '1rem' }}>Refresh</Button>

          <Button onClick={() => history.push('/')}>Back</Button>
        </Col>
      </Row>
    </Container>
  );
}
