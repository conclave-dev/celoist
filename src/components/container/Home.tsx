import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Container, Row } from 'reactstrap';
import Header from '../presentational/home/Header';
import Summary from '../presentational/home/Summary';
import Blogs from '../presentational/home/Blogs';
import Twitter from '../presentational/home/Twitter';
import { fetchBlogs } from '../../data/actions/home';
import { fetchGroups } from '../../data/actions/network';
import { formatBigInt } from '../../util/numbers';

const mapState = ({ home, network }) => ({ home, network });
const mapDispatch = { fetchBlogs, fetchGroups };
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

class Home extends PureComponent<Props> {
  componentDidMount = () => {
    this.props.fetchGroups();
    this.props.fetchBlogs();
  };

  render = () => {
    const { totalVotes, inProgress: networkInProgress } = this.props.network;

    return (
      <Container fluid>
        <Header />
        <Summary votes={formatBigInt(totalVotes)} networkInProgress={networkInProgress} />
        <Row className="mt-4">
          <Blogs />
          <Twitter />
        </Row>
      </Container>
    );
  };
}

export default connector(Home);
