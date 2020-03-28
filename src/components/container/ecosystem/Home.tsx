import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import Header from '../../presentational/reusable/Header';
import Summary from '../../presentational/reusable/Summary';
import Blogs from '../../presentational/ecosystem/home/Blogs';
import Twitter from '../../presentational/ecosystem/home/Twitter';
import { fetchBlogs } from '../../../data/actions/home';
import { fetchGroups, fetchProposals } from '../../../data/actions/network';
import { formatBigInt } from '../../../util/numbers';
import vote from '../../../assets/png/vote.png';
import proposal from '../../../assets/png/proposal.png';

const mapState = ({ home, network }) => ({ home, network });
const mapDispatch = { fetchBlogs, fetchGroups, fetchProposals };
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

class Home extends PureComponent<Props> {
  componentDidMount = () => {
    this.props.fetchGroups();
    this.props.fetchBlogs();
    this.props.fetchProposals();
  };

  render = () => {
    const { totalVotes, queuedProposals, dequeuedProposals, inProgress } = this.props.network;
    const numProposals = Object.keys(queuedProposals).length + Object.keys(dequeuedProposals).length;
    const summaryItems = [
      {
        imgSrc: vote,
        text: 'Election Votes',
        backgroundColor: 'green',
        value: formatBigInt(totalVotes)
      },
      {
        imgSrc: proposal,
        text: 'Governance Proposals',
        backgroundColor: 'blue',
        value: numProposals
      }
    ];

    return (
      <Container fluid>
        <Header title="Home" subtitle="Our community, in a nutshell" inProgress={inProgress} />
        <Summary summaryItems={summaryItems} />
        <Row>
          <Col lg={6} xs={12} className="mb-md-4">
            <Blogs />
          </Col>
          <Col lg={6} xs={12}>
            <Twitter />
          </Col>
        </Row>
      </Container>
    );
  };
}

export default connector(Home);
