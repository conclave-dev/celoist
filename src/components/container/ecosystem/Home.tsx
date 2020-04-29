import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { isEmpty, forEach } from 'lodash';
import Header from '../../presentational/reusable/Header';
import Summary from '../../presentational/reusable/Summary';
import Blogs from '../../presentational/ecosystem/home/Blogs';
import Twitter from '../../presentational/ecosystem/home/Twitter';
import { getHomeData } from '../../../data/actions/home';
import { fetchProposals } from '../../../data/actions/governance';
import { makeHomeSelector } from '../../../data/selectors/home';
import vote from '../../../assets/png/vote.png';
import proposal from '../../../assets/png/proposal.png';
import { formatTokens } from '../../../util/numbers';
import BigNumber from 'bignumber.js';

const homeSelector = makeHomeSelector();

const mapState = (state) => homeSelector(state);
const mapDispatch = { getHomeData, fetchProposals };
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

class Home extends PureComponent<Props> {
  constructor(props) {
    super(props);

    if (isEmpty(props.blogsById)) {
      this.props.getHomeData();
    }

    if (isEmpty(props.proposalsById)) {
      this.props.fetchProposals();
    }
  }

  render = () => {
    const { blogsById, allBlogIds, proposalsById, totalSupply, inProgress } = this.props;
    let numProposals = 0;

    if (!isEmpty(proposalsById)) {
      forEach(proposalsById, ({ stage }) => {
        if (stage === 'Referendum') {
          numProposals += 1;
        }
      });
    }

    const totalSupplyString = formatTokens(new BigNumber(totalSupply));
    const summaryItems = [
      {
        imgSrc: vote,
        text: 'Circulating Celo Gold',
        backgroundColor: 'green',
        value: totalSupplyString.substring(0, totalSupplyString.indexOf('.'))
      },
      {
        imgSrc: proposal,
        text: 'Pending Proposals',
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
