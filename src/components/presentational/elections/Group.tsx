import React, { memo } from 'react';
import { Progress, ListGroup, ListGroupItem, Button, Collapse, Row, Col, Spinner } from 'reactstrap';
import { connect, ConnectedProps } from 'react-redux';
import { fetchGroupMembers, fetchGroupDetails } from '../../../data/actions/network';
// import { isEmpty, map } from 'lodash';
// import { Group as GroupType, GroupMember } from '../../../data/reducers/types';
// import BigNumber from 'bignumber.js';

const mapState = ({ network: { groupMembers } }) => ({ groupMembers });
const mapDispatch = { fetchGroupMembers, fetchGroupDetails };
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const Group = ({
  group,
  votes,
  voteCapacityFilled,
  selectedGroupAddress,
  handleGroupClick,
  fetchGroupMembers
}: any) => {
  if (selectedGroupAddress === group.address) {
    console.log('groupAddress', group.address);
    console.log('group', group);
  }
  return (
    <>
      <ListGroupItem>
        <Row noGutters className="align-items-center">
          <Col xl={1} className="d-flex justify-content-center align-items-center">
            <Button
              outline
              id={group.address}
              color="muted"
              className="btn btn-link waves-effect"
              onClick={event => {
                return handleGroupClick(event);
                // return fetchGroupMembers();
              }}
            >
              <i className="fas fa-caret-down" style={{ color: '#35D07F' }} />
            </Button>
          </Col>
          <Col xl={7} className="d-flex align-items-center">
            <span className="text-truncate" style={{ display: 'inline-block' }}>
              {group.address}
            </span>
          </Col>
          <Col xl={4}>
            <Progress animated striped style={{ height: 24 }} max={100} color="warning" value={voteCapacityFilled}>
              {votes}
            </Progress>
          </Col>
        </Row>
      </ListGroupItem>
      <ListGroupItem style={{ padding: 0, border: 'none' }}>
        <Row noGutters className="align-items-center">
          <Col xl={12} style={{ backgroundColor: '#dee2e6' }}>
            <Collapse key={`hidden-${group.address}`} isOpen={selectedGroupAddress === group.address}>
              <Row className="justify-content-center pt-4 pb-4">
                <Col xl={11}>
                  {group.members && group.members.length ? (
                    <ListGroup flush>
                      <Row className="pb-4">
                        <Col xl={12} className="d-flex justify-content-center align-items-center">
                          ...
                        </Col>
                      </Row>

                      <Row className="justify-content-center pt-1 pb-3">
                        <Col xl={12} className="d-flex justify-content-center align-items-center">
                          Members
                        </Col>
                      </Row>
                      {group.members.map(member => {
                        return (
                          <ListGroupItem key={member.address} style={{ backgroundColor: 'transparent' }}>
                            <Row>
                              <Col xl={12}>
                                <Row>
                                  <Col
                                    xl={2}
                                    className="d-flex justify-content-center pt-1 pb-1 text-secondary text-truncate"
                                  >
                                    {member.name}
                                  </Col>
                                  <Col
                                    xl={8}
                                    className="d-flex justify-content-center pt-1 pb-1 text-secondary text-truncate"
                                  >
                                    {member.address}
                                  </Col>
                                  <Col
                                    xl={2}
                                    className="d-flex justify-content-center pt-1 pb-1 text-secondary text-truncate"
                                  >
                                    {member.score.toFixed(5)}
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </ListGroupItem>
                        );
                      })}
                    </ListGroup>
                  ) : (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '20vh' }}>
                      <Spinner type="grow" color="primary" />
                    </div>
                  )}
                </Col>
              </Row>
            </Collapse>
          </Col>
        </Row>
      </ListGroupItem>
    </>
  );
};

export default connector(memo(Group));
