import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Container, Row } from 'reactstrap';
import Header from '../../presentational/ecosystem/home/Header';
import Summary from '../../presentational/ecosystem/home/Summary';
import Blogs from '../../presentational/ecosystem/home/Blogs';
import Twitter from '../../presentational/ecosystem/home/Twitter';
import { fetchBlogs } from '../../../data/actions/home';
import { fetchGroups, fetchProposals } from '../../../data/actions/network';
import { formatBigInt } from '../../../util/numbers';

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

    return (
      <Container fluid>
        <Header inProgress={inProgress} />
        <Summary votes={formatBigInt(totalVotes)} numProposals={numProposals} />
        <Row className="mt-4">
          <Blogs />
          <Twitter />
        </Row>
      </Container>
    );
  };
}

export default connector(Home);
