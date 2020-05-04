import React, { memo } from 'react';
import { Row, Col, Card, CardBody, Button, ListGroup, ListGroupItem } from 'reactstrap';
import Anchor from '../reusable/Anchor';

const ProfileDetails = ({
  name,
  address,
  metadataURL,
  validator
}: {
  name: string;
  address: string;
  metadataURL: string;
  validator: string;
}) => {
  return (
    <Card>
      <CardBody>
        <h4 className="card-title">Account</h4>
        <Row style={{ flexWrap: 'nowrap', minHeight: 300 }}>
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
                    <span className="text-truncate">Metadata</span>
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
                  <ListGroupItem className="text-truncate" style={{ border: 'none' }}>
                    <Button
                      className="waves-effect waves-light"
                      disabled={!metadataURL}
                      size="sm"
                      style={{
                        color: '#FFF',
                        backgroundColor: metadataURL ? '#3488ec' : '#9ca8b3',
                        border: 'none',
                        height: 26,
                        paddingTop: 0,
                        paddingBottom: 0
                      }}
                    >
                      {metadataURL ? (
                        <Anchor href={metadataURL} color="#FFF">
                          View
                        </Anchor>
                      ) : (
                        <span>View</span>
                      )}
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </>
          ) : (
            <Col xs={12}>
              <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                <p className="font-italic text-center">Ledger is not connected</p>
              </div>
            </Col>
          )}
        </Row>
      </CardBody>
    </Card>
  );
};

export default memo(ProfileDetails);
