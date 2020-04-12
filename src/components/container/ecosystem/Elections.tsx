import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Container, Row, Col, Spinner } from 'reactstrap';
import { fetchGroups } from '../../../data/actions/elections';
import { makeElectionsSelector } from '../../../data/selectors/elections';
import Header from '../../presentational/reusable/Header';
import Summary from '../../presentational/reusable/Summary';
import Groups from '../../presentational/ecosystem/elections/Groups';
import Group from '../../presentational/ecosystem/elections/Group';
import earnings from '../../../assets/png/earnings.png';
import goldCoin from '../../../assets/png/goldCoin.png';
import score from '../../../assets/png/score.png';

const electionsSelector = makeElectionsSelector();

const mapState = state => electionsSelector(state);
const mapDispatch = { fetchGroups };
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

class Elections extends PureComponent<Props, { selectedGroupAddress: string }> {
  constructor(props) {
    super(props);

    if (!props.allGroupIds.length) {
      this.props.fetchGroups();
    }
  }

  render = () => {
    const { groupsById, allGroupIds, inProgress } = this.props;
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
        <Header title="Elections" subtitle="..." inProgress={inProgress} />
        <Summary summaryItems={summaryItems} />
        <Row>
          <Groups>
            {allGroupIds.length ? (
              allGroupIds.map(groupId => {
                const group = groupsById[groupId];
                const { address, votes, capacity } = group;
                return <Group key={address} group={group} votes={votes} capacity={capacity} />;
              })
            ) : (
              <Col xs={12} className="pt-4 pb-4 d-flex justify-content-center align-items-center">
                <Spinner type="grow" color="warning" />
              </Col>
            )}
          </Groups>
        </Row>
      </Container>
    );
  };
}

export default connector(Elections);
