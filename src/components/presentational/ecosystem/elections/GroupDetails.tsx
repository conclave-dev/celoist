import React, { memo } from 'react';
import { ListGroupItem, Row, Col, Collapse, ListGroup, Spinner } from 'reactstrap';
import blueCoin from '../../../../assets/png/blueCoin.png';
import goldCoin from '../../../../assets/png/goldCoin.png';
import greenCoin from '../../../../assets/png/greenCoin.png';
import redCoin from '../../../../assets/png/redCoin.png';
import whiteCoin from '../../../../assets/png/whiteCoin.png';
import { Group } from '../../../../data/reducers/types';

const GroupDetails = ({ group, isSelected }: { group: Group; isSelected: boolean }) => (
  <Collapse key={`hidden-${group.address}`} isOpen={isSelected}>
    <ListGroupItem className="pr-0 pl-0" style={{ backgroundColor: '#dee2e6', border: 'none', borderRadius: 0 }}>
      <Row noGutters className="align-items-center">
        <Col xs={12}>
          <Row noGutters className="justify-content-center">
            <Col xs={11}>
              {group.members && group.members.length ? (
                <ListGroup flush>
                  <ListGroupItem
                    className="pr-0 pl-0"
                    style={{ backgroundColor: 'transparent', border: 'none', paddingTop: 6, paddingBottom: 6 }}
                  >
                    <h5 className="text-center">Overview</h5>
                    <Row noGutters className="align-items-center">
                      <Col xs={3}>
                        <p className="text-center text-secondary text-truncate font-italic mb-3">
                          <img src={blueCoin} width={12} className="mr-1" />
                          <small>Fees</small>
                        </p>
                      </Col>
                      <Col xs={3}>
                        <p className="text-center text-secondary text-truncate font-italic mb-3">
                          <img src={goldCoin} width={12} className="mr-1" />
                          <small>Rewards</small>
                        </p>
                      </Col>
                      <Col xs={3}>
                        <p className="text-center text-secondary text-truncate font-italic mb-3">
                          <img src={greenCoin} width={12} className="mr-1" />
                          <small>Earnings</small>
                        </p>
                      </Col>
                      <Col xs={3}>
                        <p className="text-center text-secondary text-truncate font-italic mb-3">
                          <img src={redCoin} width={12} className="mr-1" />
                          <small>Penalty</small>
                        </p>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <Row noGutters className="align-items-center">
                    <Col xs={3}>
                      <p className="text-secondary text-center text-truncate">
                        {group.commission.multipliedBy(100).toFixed(2)}%
                      </p>
                    </Col>
                    <Col xs={3}>
                      <p className="text-secondary text-center text-truncate">{0}</p>
                    </Col>
                    <Col xs={3}>
                      <p className="text-secondary text-center text-truncate">{0}</p>
                    </Col>
                    <Col xs={3}>
                      <p className="text-secondary text-center text-truncate">{0}</p>
                    </Col>
                  </Row>
                  <ListGroupItem
                    className="pr-0 pl-0"
                    style={{ backgroundColor: 'transparent', border: 'none', paddingTop: 6, paddingBottom: 6 }}
                  >
                    <h5 className="text-center">Members</h5>
                    <Row noGutters className="align-items-center">
                      <Col xs={4}>
                        <p className="text-center text-secondary text-truncate font-italic mb-3">
                          <img src={whiteCoin} width={12} className="mr-1" />
                          <small>Name</small>
                        </p>
                      </Col>
                      <Col xs={4}>
                        <p className="text-center text-secondary text-truncate font-italic mb-3">
                          <img src={whiteCoin} width={12} className="mr-1" />
                          <small>Address</small>
                        </p>
                      </Col>
                      <Col xs={4}>
                        <p className="text-center text-secondary text-truncate font-italic mb-3">
                          <img src={whiteCoin} width={12} className="mr-1" />
                          <small>Score</small>
                        </p>
                      </Col>
                    </Row>
                    {group.members.map(member => (
                      <Row noGutters key={member.address} className="align-items-center">
                        <Col xs={4}>
                          <p className="text-secondary text-center text-truncate">{member.name}</p>
                        </Col>
                        <Col xs={4}>
                          <p className="text-secondary text-center text-truncate">{member.address}</p>
                        </Col>
                        <Col xs={4}>
                          <p className="text-secondary text-center text-truncate">{member.score.toFixed(5)}</p>
                        </Col>
                      </Row>
                    ))}
                  </ListGroupItem>
                </ListGroup>
              ) : (
                <div className="d-flex justify-content-center pt-4 pb-4">
                  <Spinner type="grow" color="warning" size="lg" />
                </div>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </ListGroupItem>
  </Collapse>
);

export default memo(GroupDetails);
