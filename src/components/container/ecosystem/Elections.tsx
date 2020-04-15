import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Container, Row } from 'reactstrap';
import { fetchElection } from '../../../data/actions/elections';
import { makeElectionsSelector } from '../../../data/selectors/elections';
import Header from '../../presentational/reusable/Header';
import Summary from '../../presentational/reusable/Summary';
import Groups from '../../presentational/ecosystem/elections/Groups';
import earnings from '../../../assets/png/earnings.png';
import goldCoin from '../../../assets/png/goldCoin.png';
import score from '../../../assets/png/score.png';

const electionsSelector = makeElectionsSelector();

const mapState = state => electionsSelector(state);
const mapDispatch = { fetchElection };
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

class Elections extends PureComponent<Props> {
  constructor(props) {
    super(props);

    props.fetchElection();
  }

  render = () => {
    const { groupsById, allGroupIds, config, inProgress } = this.props;
    const summaryItems = [
      {
        imgSrc: goldCoin,
        text: 'Voter Rewards',
        backgroundColor: 'green',
        value: 0
      },
      {
        imgSrc: earnings,
        text: 'Group Earnings',
        backgroundColor: 'blue',
        value: 0
      },
      {
        imgSrc: score,
        text: 'Average Score',
        backgroundColor: 'gold',
        value: 0
      }
    ];

    return (
      <Container fluid>
        <Header
          title="Elections"
          subtitle="Details about groups participating in elections and earning rewards for their voters"
          inProgress={inProgress}
        />
        <Summary summaryItems={summaryItems} />
        <Row>
          <Groups groupsById={groupsById} allGroupIds={allGroupIds} config={config} />
        </Row>
      </Container>
    );
  };
}

export default connector(Elections);
