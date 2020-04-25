import React, { memo } from 'react';
import { Row, Col, Button, ListGroup, ListGroupItem } from 'reactstrap';
import Anchor from '../../presentational/reusable/Anchor';

const ProfileAccount = ({ name, address, metadataURL, validator }) => {
  const hasValidator = validator && validator !== '0x0000000000000000000000000000000000000000';

  return (
    <>
      <h4 className="card-title">Account</h4>
      <ListGroup style={{ height: 200 }}>
        <ListGroupItem style={{ border: 'none', paddingRight: 0, paddingLeft: 0 }}>
          <Row noGutters style={{ flexWrap: 'nowrap' }}>
            <Col xs={4}>
              <Row noGutters style={{ height: 36 }} className="mb-2 ">
                <span className="text-truncate">Name</span>
              </Row>
              <Row noGutters style={{ height: 36 }} className="mb-2">
                <span className="text-truncate">Address</span>
              </Row>
              <Row noGutters style={{ height: 36 }} className="mb-2">
                <span className="text-truncate">Metadata</span>
              </Row>
              <Row noGutters style={{ height: 36 }}>
                <span className="text-truncate">Validator</span>
              </Row>
            </Col>
            <Col xs={8}>
              <Row noGutters style={{ height: 36 }} className="mb-2">
                <span className="text-truncate">{name || 'No name set'}</span>
              </Row>
              <Row noGutters style={{ height: 36 }} className="mb-2">
                <Anchor href={`https://baklava-blockscout.celo-testnet.org/address/${address}/celo`} color="#3488ec">
                  <span className="text-truncate">{address}</span>
                </Anchor>
              </Row>
              <Row noGutters style={{ height: 36 }} className="mb-2">
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
              </Row>
              <Row noGutters style={{ height: 36 }}>
                <Button
                  className="waves-effect waves-light"
                  disabled={!hasValidator}
                  size="sm"
                  style={{
                    color: '#FFF',
                    backgroundColor: hasValidator ? '#35D07F' : '#9ca8b3',
                    border: 'none',
                    height: 26,
                    paddingTop: 0,
                    paddingBottom: 0
                  }}
                >
                  {hasValidator ? (
                    <Anchor
                      href={`https://baklava-blockscout.celo-testnet.org/address/${validator}/validations`}
                      color="#FFF"
                    >
                      View
                    </Anchor>
                  ) : (
                    <span>View</span>
                  )}
                </Button>
              </Row>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </>
  );
};

export default memo(ProfileAccount);
