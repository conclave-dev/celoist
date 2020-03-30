import React, { memo } from 'react';
import { ListGroupItem, Row, Col, ListGroup, Spinner } from 'reactstrap';
import blueCoin from '../../../../assets/png/blueCoin.png';
import goldCoin from '../../../../assets/png/goldCoin.png';
import greenCoin from '../../../../assets/png/greenCoin.png';
import redCoin from '../../../../assets/png/redCoin.png';
import whiteCoin from '../../../../assets/png/whiteCoin.png';
import { GroupDetails as GroupDetailsType } from '../../../../data/types/elections';

const GroupDetails = ({ groupDetails }: { groupDetails: GroupDetailsType }) => (
  <ListGroupItem className="pr-0 pl-0" style={{ backgroundColor: '#dee2e6', border: 'none', borderRadius: 0 }}>
    <Row className="align-items-center">
      <Col xs={12}>
        <Row className="justify-content-center">
          {groupDetails ? (
            <Col xs={11}>
              <ListGroup flush>
                <ListGroupItem
                  className="pr-0 pl-0"
                  style={{ backgroundColor: 'transparent', border: 'none', paddingTop: 6, paddingBottom: 6 }}
                >
                  <h5 className="text-center mb-4">Overview</h5>
                  <Row className="align-items-center">
                    <Col lg={3} xs={6}>
                      <p className="text-center text-secondary text-truncate mb-3">
                        <img src={blueCoin} width={20} className="mr-1" alt="blueCoin" />
                        {groupDetails.commission.multipliedBy(100).toFixed(2)}% Fees
                      </p>
                    </Col>
                    <Col lg={3} xs={6}>
                      <p className="text-center text-secondary text-truncate mb-3">
                        <img src={redCoin} width={20} className="mr-1" alt="redCoin" />
                        0% Penalty
                      </p>
                    </Col>
                    <Col lg={3} xs={6}>
                      <p className="text-center text-secondary text-truncate mb-3">
                        <img src={goldCoin} width={20} className="mr-1" alt="goldCoin" />0 Rewards
                      </p>
                    </Col>
                    <Col lg={3} xs={6}>
                      <p className="text-center text-secondary text-truncate mb-3">
                        <img src={greenCoin} width={20} className="mr-1" alt="greenCoin" />0 Earnings
                      </p>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem
                  className="pr-0 pl-0"
                  style={{ backgroundColor: 'transparent', border: 'none', paddingTop: 6, paddingBottom: 6 }}
                >
                  <h5 className="text-center">Members</h5>
                  <Row className="align-items-center">
                    <Col xs={4}>
                      <p className="text-center text-secondary text-truncate font-italic mb-3">
                        <img src={whiteCoin} width={12} className="mr-1" alt="whiteCoin" />
                        <small>Name</small>
                      </p>
                    </Col>
                    <Col xs={4}>
                      <p className="text-center text-secondary text-truncate font-italic mb-3">
                        <img src={whiteCoin} width={12} className="mr-1" alt="whiteCoin" />
                        <small>Address</small>
                      </p>
                    </Col>
                    <Col xs={4}>
                      <p className="text-center text-secondary text-truncate font-italic mb-3">
                        <img src={whiteCoin} width={12} className="mr-1" alt="whiteCoin" />
                        <small>Score</small>
                      </p>
                    </Col>
                  </Row>
                  {groupDetails.members.map(member => (
                    <Row key={member.address} className="align-items-center">
                      <Col xs={4}>
                        <p className="text-secondary text-center text-truncate">{member.name}</p>
                      </Col>
                      <Col xs={4}>
                        <p className="text-secondary text-center text-truncate">{member.address}</p>
                      </Col>
                      <Col xs={4}>
                        <p className="text-secondary text-center text-truncate">
                          {`${member.score.multipliedBy(100).toFixed(2)}/100.00`}
                        </p>
                      </Col>
                    </Row>
                  ))}
                </ListGroupItem>
              </ListGroup>
            </Col>
          ) : (
            <div className="pt-4 pb-4">
              <Spinner type="grow" color="warning" />
            </div>
          )}
        </Row>
      </Col>
    </Row>
  </ListGroupItem>
);

export default memo(GroupDetails);
