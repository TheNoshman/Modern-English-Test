import React, { useEffect, useState } from 'react';
import { getBitcoinValueAPI } from '../serviceAPI';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function Value() {
  const [bitcoinValue, setBitcoinValue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      setBitcoinValue(await getBitcoinValueAPI());
      setLoading(false);
    })();
  }, [reload]);

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
              <h6>Select currency: </h6>
              {/* {bitcoinValue.map((el) => {})} */}
              <h1>done {bitcoinValue.AUD.buy}</h1>
            </Col>
          )}
          <Button
            onClick={() => setReload(!reload)}
            style={{ marginRight: '1rem' }}
          >
            Refresh
          </Button>

          <Button onClick={() => history.push('/')}>Back</Button>
        </Col>
      </Row>
    </Container>
  );
}
