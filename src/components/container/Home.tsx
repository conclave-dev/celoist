import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Container, Row } from 'reactstrap';
import Header from '../presentational/home/Header';
import Summary from '../presentational/home/Summary';
import Blogs from '../presentational/home/Blogs';
import Twitter from '../presentational/home/Twitter';
import { fetchBlogs } from '../../data/actions/home';
import { fetchGroups, fetchProposals } from '../../data/actions/network';
import { formatBigInt } from '../../util/numbers';

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
    const { totalVotes, queuedProposals, dequeuedProposals, inProgress: networkInProgress } = this.props.network;
    const numProposals = Object.keys(queuedProposals).length + Object.keys(dequeuedProposals).length;

    return (
      <Container fluid>
        <Header />
        <Summary votes={formatBigInt(totalVotes)} numProposals={numProposals} networkInProgress={networkInProgress} />
        <Row className="mt-4">
          <Blogs />
          <Twitter />
        </Row>
      </Container>
    );
  };
}

export default connector(Home);
