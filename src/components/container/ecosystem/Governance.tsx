import React, { PureComponent } from 'react';
import { Container, Row, Col, Card, CardBody, Badge } from 'reactstrap';
import { isEmpty, map } from 'lodash';
import { connect, ConnectedProps } from 'react-redux';
import Header from '../../presentational/reusable/Header';
import { fetchProposals } from '../../../data/actions/governance';
import { formatVotes } from '../../../util/numbers';
import Proposal from '../../presentational/ecosystem/governance/Proposal';
import Menu from '../../presentational/ecosystem/governance/Menu';

const mapState = ({ governance }) => ({ governance });
const mapDispatch = { fetchProposals };
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

export class Governance extends PureComponent<Props> {
  constructor(props) {
    super(props);

    if (isEmpty(props.governance.proposalsById)) {
      props.fetchProposals();
    }
  }

  render() {
    const { proposalsById, inProgress } = this.props.governance;

    return (
      <Container fluid>
        <Header
          title="Governance"
          subtitle="Improvements and fixes proposed by community members"
          inProgress={inProgress}
        />
        <Row>
          <Col lg={3} xs={12}>
            <Menu />
          </Col>
          {!inProgress && (
            <Col lg={9} xs={12}>
              {proposalsById.length ? (
                map(proposalsById, (proposal, proposalID) => {
                  const { proposal: transactions, metadata, votes, upvotes, stage } = proposal;
                  const { proposer, deposit } = metadata;
                  const proposerStart = proposer.substring(0, 4);
                  const proposerEnd = proposer.substring(proposer.length - 4);
                  const metadataString = `By ${proposerStart}...${proposerEnd} (${formatVotes(deposit)} cGLD deposit)`;
                  return (
                    <Proposal
                      key={proposalID}
                      proposalID={proposalID}
                      metadataString={metadataString}
                      transactions={transactions}
                      votes={votes}
                      upvotes={upvotes}
                      stage={stage}
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
