import React, { memo } from 'react';
import { Row, Col, Card, CardBody, ListGroup, ListGroupItem } from 'reactstrap';
import RegistrationStatus from './RegistrationStatus';
import Anchor from '../../reusable/Anchor';

const Details = ({ name, address, isRegistered }: { name: string; address: string; isRegistered: boolean }) => {
  return (
    <Card style={{ height: 190, width: '100%' }}>
      <CardBody>
        <Row style={{ flexWrap: 'nowrap', height: '100%' }}>
          {address ? (
            <>
              <Col xs={4}>
                <ListGroup>
                  <ListGroupItem style={{ border: 'none' }}>
                    <span className="text-truncate">Name</span>
                  </ListGroupItem>
                  <ListGroupItem style={{ border: 'none' }}>
                    <span className="text-truncate">Address</span>
                  </ListGroupItem>
                  <ListGroupItem style={{ border: 'none' }}>
                    <span className="text-truncate">Status</span>
                  </ListGroupItem>
                </ListGroup>
              </Col>
              <Col xs={8}>
                <ListGroup>
                  <ListGroupItem className="text-truncate" style={{ border: 'none' }}>
                    {name || 'No name set'}
                  </ListGroupItem>
                  <ListGroupItem className="text-truncate" style={{ border: 'none' }}>
                    {address ? (
                      <Anchor
                        href={`https://baklava-blockscout.celo-testnet.org/address/${address}/celo`}
                        color="#3488ec"
                      >
                        {address}
                      </Anchor>
                    ) : (
                      <span>N/A</span>
                    )}
                  </ListGroupItem>
                  <ListGroupItem style={{ border: 'none' }}>
                    <RegistrationStatus isRegistered={isRegistered} />
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </>
          ) : (
            <Col xs={12}>
              <div className="d-flex justify-content-center align-items-center text-center" style={{ height: '100%' }}>
                Ledger is not connected
              </div>
            </Col>
          )}
        </Row>
      </CardBody>
    </Card>
  );
};

export default memo(Details);
