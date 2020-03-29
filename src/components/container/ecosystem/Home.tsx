import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { isEmpty } from 'lodash';
import Header from '../../presentational/reusable/Header';
import Summary from '../../presentational/reusable/Summary';
import Blogs from '../../presentational/ecosystem/home/Blogs';
import Twitter from '../../presentational/ecosystem/home/Twitter';
import { fetchBlogs } from '../../../data/actions/home';
import { fetchGroups, fetchProposals } from '../../../data/actions/network';
import makeHomeSelector from '../../../data/selectors/home';
import { formatBigInt } from '../../../util/numbers';
import vote from '../../../assets/png/vote.png';
import proposal from '../../../assets/png/proposal.png';

const homeSelector = makeHomeSelector();

const mapState = ({ home, network }) => ({
  ...homeSelector(home),
  totalVotes: network.totalVotes,
  queuedProposals: network.queuedProposals,
  dequeuedProposals: network.dequeuedProposals,
  inProgress: home.inProgress || network.inProgress
});
const mapDispatch = { fetchBlogs, fetchGroups, fetchProposals };
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

class Home extends PureComponent<Props> {
  constructor(props) {
    super(props);

    if (isEmpty(props.blogs)) {
      this.props.fetchBlogs();
    }

    if (props.totalVotes.isZero()) {
      this.props.fetchGroups();
    }

    if (isEmpty(props.queuedProposals) || isEmpty(props.dequeuedProposals)) {
      this.props.fetchProposals();
    }
  }

  render = () => {
    const { blogsById, allBlogIds, totalVotes, queuedProposals, dequeuedProposals, inProgress } = this.props;
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
        <Header title="Home" subtitle="Our ecosystem in a nutshell" inProgress={inProgress} />
        <Summary summaryItems={summaryItems} />
        <Row>
          <Col lg={6} xs={12} className="mb-4">
            <Blogs blogs={blogsById} blogIds={allBlogIds} />
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
