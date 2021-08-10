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
              <h1>
                {selected} = {bitcoinValue[selected].buy}
              </h1>
            </Col>
          )}
          <Button style={{ marginRight: '1rem' }}>Refresh</Button>

          <Button onClick={() => history.push('/')}>Back</Button>
        </Col>
      </Row>
    </Container>
  );
}
