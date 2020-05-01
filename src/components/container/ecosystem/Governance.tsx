import React, { PureComponent } from 'react';
import { Container, Row, Col, Card, CardBody, ListGroup } from 'reactstrap';
import { isEmpty, map } from 'lodash';
import { connect, ConnectedProps } from 'react-redux';
import Header from '../../presentational/reusable/Header';
import Submenu from '../../presentational/ecosystem/governance/Submenu';
import Proposal from '../../presentational/ecosystem/governance/Proposal';
import { fetchProposals } from '../../../data/actions/governance';
import { formatVotes } from '../../../util/numbers';

const mapState = ({ governance }) => ({
  ...governance
});
const mapDispatch = { fetchProposals };
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

export class Governance extends PureComponent<Props> {
  constructor(props) {
    super(props);

    if (isEmpty(props.dequeuedProposalsByStage)) {
      props.fetchProposals();
    }
  }

  render() {
    const {
      dequeuedProposalsByStage,
      allDequeuedProposalStages,
      queuedProposalsByStage,
      allQueuedProposalStages,
      stageFilter,
      inProgress
    } = this.props;
    const filteredProposals = dequeuedProposalsByStage[stageFilter] || queuedProposalsByStage[stageFilter];

    return (
      <Container fluid>
        <Header
          title="Governance"
          subtitle="Improvements and fixes proposed by Celo stakeholders"
          inProgress={inProgress}
        />
        <Row>
          <Col lg={3} xs={12}>
            {!inProgress && (
              <Card className="card pt-2 pb-4 mb-4">
                <ListGroup>
                  {!isEmpty(dequeuedProposalsByStage) && (
                    <Submenu
                      title="Dequeued Proposals"
                      proposalsByStage={dequeuedProposalsByStage}
                      allProposalStages={allDequeuedProposalStages}
                    />
                  )}
                  {!isEmpty(queuedProposalsByStage) && (
                    <Submenu
                      title="Queued Proposals"
                      proposalsByStage={queuedProposalsByStage}
                      allProposalStages={allQueuedProposalStages}
                    />
                  )}
                </ListGroup>
              </Card>
            )}
          </Col>
          {!inProgress && (
            <Col lg={9} xs={12}>
              {filteredProposals && !isEmpty(filteredProposals) ? (
                map(filteredProposals, (proposal, proposalID) => {
                  const { proposal: transactions, metadata, votes, upvotes } = proposal;
                  return (
                    <Proposal
                      key={proposalID}
                      proposalID={proposalID}
                      metadata={metadata}
                      transactions={transactions}
                      votes={votes}
                      upvotes={upvotes}
                    />
                  );
                })
              ) : (
                <Card className="pt-4 pb-4">
                  <CardBody>
                    <p className="text-center font-italic mb-0">No proposals found.</p>
                  </CardBody>
                </Card>
              )}
            </Col>
          )}
        </Row>
      </Container>
    );
  }
}

export default connector(Governance);
