import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, Alert, Button, Spinner } from 'reactstrap';
import { map } from 'lodash';
import { connect, ConnectedProps } from 'react-redux';
import { fetchProposals } from '../../../data/actions/network';
import { formatBigInt } from '../../../util/numbers';

const mapState = ({ network }) => ({ network });
const mapDispatch = { fetchProposals };
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

export class Proposals extends PureComponent<Props> {
  constructor(props) {
    super(props);

    props.fetchProposals();
  }

  render() {
    const { queuedProposals, dequeuedProposals, inProgress } = this.props.network;
    const inProgressCount = Object.keys(queuedProposals).length + Object.keys(dequeuedProposals).length;

    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Proposals</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item active">Improvements and fixes proposed by Celo participantss</li>
                </ol>
              </div>
            </Col>
            <Col sm={6}>
              <div className="float-right d-none d-md-block">
                {inProgress && <Spinner size="large" color="warning" />}
              </div>
            </Col>
          </Row>
          <Row>
            <div className="col-12">
              <div className="email-leftbar card">
                <h5 className="mt-4">Proposals</h5>
                <div className="mail-list">
                  <Link to="#">
                    <span className="mdi mdi-arrow-right-drop-circle float-right" style={{ color: '#fbcc5c' }}></span>
                    In-Progress <span className="ml-1">({inProgressCount})</span>
                  </Link>
                  <Link to="#">
                    <span className="mdi mdi-arrow-right-drop-circle float-right" style={{ color: '#35D07F' }}></span>
                    Passed <span className="ml-1">(0)</span>
                  </Link>
                  <Link to="#">
                    <span className="mdi mdi-arrow-right-drop-circle float-right" style={{ color: '#fb7c6d' }}></span>
                    Failed <span className="ml-1">(0)</span>
                  </Link>
                </div>
                <h5 className="mt-4">Hotfixes</h5>
                <div className="mail-list">
                  <Link to="#">
                    <span className="mdi mdi-arrow-right-drop-circle float-right" style={{ color: '#fbcc5c' }}></span>
                    Pending <span className="ml-1">(0)</span>
                  </Link>
                  <Link to="#">
                    <span className="mdi mdi-arrow-right-drop-circle float-right" style={{ color: '#35D07F' }}></span>
                    Executed <span className="ml-1">(0)</span>
                  </Link>
                </div>
              </div>

              <div className="email-rightbar mb-3">
                <Row>
                  <Col xl={6}>
                    {map(queuedProposals, (proposal, proposalID) => {
                      const { proposal: transactions, metadata, stage, upvotes } = proposal;
                      const { proposer, deposit } = metadata;
                      const proposerStart = proposer.substring(0, 4);
                      const proposerEnd = proposer.substring(proposer.length - 4);
                      const meta = `By ${proposerStart}...${proposerEnd} (${formatBigInt(deposit)} cGLD deposit)`;
                      return (
                        <Card key={proposalID} className="mb-4">
                          <CardBody>
                            <div className="media">
                              <div className="media-body">
                                <h5 className="m-0">Queued: #{proposalID}</h5>
                                <p>
                                  <small className="text-muted">{meta}</small>
                                </p>
                              </div>
                            </div>
                            <p className="mt-0">Proposed Transactions</p>
                            {transactions.map((tx, txIndex) => (
                              <Alert key={`${proposalID}-${txIndex}`} color="secondary">
                                {JSON.stringify(tx)}
                              </Alert>
                            ))}
                            <hr />
                            <Button size="md" style={{ border: 'none', backgroundColor: '#35D07F' }}>
                              <i className="mdi mdi-thumb-up mr-2" />
                              {`${upvotes.toFixed(0)}`}
                            </Button>
                          </CardBody>
                        </Card>
                      );
                    })}
                  </Col>
                  <Col xl={6}>
                    {map(dequeuedProposals, (proposal, proposalID) => {
                      const { proposal: transactions, metadata, stage, votes } = proposal;
                      const { proposer, deposit } = metadata;
                      const proposerStart = proposer.substring(0, 4);
                      const proposerEnd = proposer.substring(proposer.length - 4);
                      const meta = `By ${proposerStart}...${proposerEnd} (${formatBigInt(deposit)} cGLD deposit)`;
                      return (
                        <Card key={proposalID} className="mb-4">
                          <CardBody>
                            <div className="media">
                              <div className="media-body">
                                <h5 className="m-0">Dequeued: #{proposalID}</h5>
                                <p>
                                  <small className="text-muted">{meta}</small>
                                </p>
                              </div>
                            </div>
                            <p className="mt-0">Proposed Transactions</p>
                            {transactions.map((tx, txIndex) => (
                              <Alert key={`${proposalID}-${txIndex}`} color="secondary">
                                {JSON.stringify(tx)}
                              </Alert>
                            ))}
                            <hr />
                            <Button size="md" className="mr-1" style={{ border: 'none', backgroundColor: '#35D07F' }}>
                              <i className="mdi mdi-thumb-up mr-2" />
                              {votes.Yes.toFixed(0)}
                            </Button>
                            <Button size="md" className="mr-1" style={{ border: 'none', backgroundColor: '#fb7c6d' }}>
                              <i className="mdi mdi-thumb-down mr-2" />
                              {votes.No.toFixed(0)}
                            </Button>
                            <Button size="md" className="mr-1" style={{ border: 'none', backgroundColor: '#DDDDDD' }}>
                              <i className="mdi mdi-hand-left mr-2" />
                              {votes.Abstain.toFixed(0)}
                            </Button>
                          </CardBody>
                        </Card>
                      );
                    })}
                  </Col>
                </Row>
              </div>
            </div>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default connector(Proposals);
