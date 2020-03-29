import React, { PureComponent } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { map } from 'lodash';
import { connect, ConnectedProps } from 'react-redux';
import Header from '../../presentational/reusable/Header';
import { fetchProposals } from '../../../data/actions/network';
import { formatBigInt } from '../../../util/numbers';
import Proposal from '../../presentational/ecosystem/governance/Proposal';
import Menu from '../../presentational/ecosystem/governance/Menu';

const mapState = ({ network }) => ({ network });
const mapDispatch = { fetchProposals };
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

export class Governance extends PureComponent<Props> {
  constructor(props) {
    super(props);

    props.fetchProposals();
  }

  render() {
    const { queuedProposals, dequeuedProposals, inProgress } = this.props.network;

    return (
      <Container fluid>
        <Header
          title="Governance"
          subtitle="Improvements and fixes proposed by the community"
          inProgress={inProgress}
        />
        <Row>
          <Col lg={3} xs={12}>
            <Menu />
          </Col>
          <Col lg={9} xs={12}>
            {map({ ...queuedProposals, ...dequeuedProposals }, (proposal, proposalID) => {
              const { proposal: transactions, metadata, votes, upvotes, stage } = proposal;
              const { proposer, deposit } = metadata;
              const proposerStart = proposer.substring(0, 4);
              const proposerEnd = proposer.substring(proposer.length - 4);
              const metadataString = `By ${proposerStart}...${proposerEnd} (${formatBigInt(deposit)} cGLD deposit)`;
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
            })}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connector(Governance);
