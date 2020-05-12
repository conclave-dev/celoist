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
import vote from '../../../assets/png/vote.png';
import proposal from '../../../assets/png/proposal.png';
import { formatTokens } from '../../../util/numbers';
import BigNumber from 'bignumber.js';

const mapState = ({
  home: { blogsById, allBlogIds, totalSupply, inProgress: homeInProgress },
  governance: { dequeuedProposalsByStage, inProgress: govInProgress },
  network: { networkID }
}) => ({
  blogsById,
  allBlogIds,
  totalSupply,
  dequeuedProposalsByStage,
  networkID,
  inProgress: govInProgress || homeInProgress
});
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

  componentDidUpdate = (prevProps) => {
    // Reload data on network change
    if (prevProps.networkID !== this.props.networkID) {
      this.props.getHomeData();
      this.props.fetchProposals();
    }
  };

  render = () => {
    const { blogsById, allBlogIds, dequeuedProposalsByStage, totalSupply, inProgress } = this.props;
    let numProposals = 0;

    if (!isEmpty(dequeuedProposalsByStage)) {
      forEach(dequeuedProposalsByStage, ({ stage }) => {
        if (stage === 'Referendum') {
          numProposals += 1;
        }
      });
    }

    const totalSupplyString = formatTokens(new BigNumber(totalSupply));
    const summaryItems = [
      {
        imgSrc: vote,
        text: 'Circulating Gold Supply',
        backgroundColor: 'green',
        value: totalSupplyString.substring(0, totalSupplyString.indexOf('.'))
      },
      {
        imgSrc: proposal,
        text: 'Live Governance Proposals',
        backgroundColor: 'blue',
        value: numProposals
      }
    ];

    return (
      <Container fluid>
        <Header title="Home" subtitle="The Celo ecosystem in a nutshell" inProgress={inProgress} />
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
