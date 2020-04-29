import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Container, Row } from 'reactstrap';
import { fetchElection } from '../../../data/actions/elections';
import Header from '../../presentational/reusable/Header';
import Summary from '../../presentational/reusable/Summary';
import Groups from '../../presentational/ecosystem/elections/Groups';
import vote from '../../../assets/png/vote.png';
import goldCoin from '../../../assets/png/goldCoin.png';
import validators from '../../../assets/png/validators.png';
import { formatVotes, formatTokens, formatScore } from '../../../util/numbers';

const mapState = ({ elections: { groupsById, allGroupIds, config, inProgress, summary } }) => ({
  groupsById,
  allGroupIds,
  config,
  inProgress,
  summary
});
const mapDispatch = { fetchElection };
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

class Elections extends PureComponent<Props> {
  constructor(props) {
    super(props);

    if (!props.allGroupIds.length) {
      props.fetchElection();
    }
  }

  generateSummaryItems = ({ averageScore, cumulativeRewards, cumulativeVotes }) => [
    {
      imgSrc: goldCoin,
      text: 'Group Voter Rewards',
      backgroundColor: 'green',
      value: formatTokens(cumulativeRewards)
    },
    {
      imgSrc: vote,
      text: 'Total Group Votes',
      backgroundColor: 'blue',
      value: formatVotes(cumulativeVotes)
    },
    {
      imgSrc: validators,
      text: 'Average Group Score',
      backgroundColor: 'gold',
      value: `${formatScore(averageScore)}%`
    }
  ];

  render = () => {
    const { groupsById, allGroupIds, config, inProgress, summary } = this.props;

    return (
      <Container fluid>
        <Header
          title="Elections"
          subtitle="Details about groups participating in elections and earning rewards for their voters"
          inProgress={inProgress}
        />
        <Summary summaryItems={summary.averageScore ? this.generateSummaryItems(summary) : []} />
        <Row>
          <Groups groupsById={groupsById} allGroupIds={allGroupIds} config={config} />
        </Row>
      </Container>
    );
  };
}

export default connector(Elections);
