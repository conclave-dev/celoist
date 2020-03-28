import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Container, Row } from 'reactstrap';
import { isEmpty, map } from 'lodash';
import { fetchGroups, fetchGroupMembers, fetchGroupDetails } from '../../../data/actions/network';
import Header from '../../presentational/reusable/Header';
import Summary from '../../presentational/reusable/Summary';
import Groups from '../../presentational/ecosystem/elections/Groups';
import Group from '../../presentational/ecosystem/elections/Group';
import { formatBigInt } from '../../../util/numbers';
import earnings from '../../../assets/png/earnings.png';
import goldCoin from '../../../assets/png/goldCoin.png';
import score from '../../../assets/png/score.png';

const mapState = ({ network }) => ({ network });
const mapDispatch = { fetchGroups, fetchGroupMembers, fetchGroupDetails };
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

class Elections extends PureComponent<Props, { selectedGroupAddress: string }> {
  constructor(props) {
    super(props);
    this.state = {
      selectedGroupAddress: ''
    };
  }

  componentDidMount = () => {
    this.props.fetchGroups();
  };

  handleGroupClick = ({ currentTarget: { id: groupAddress } }) => {
    if (this.state.selectedGroupAddress === groupAddress) {
      return this.setState({ selectedGroupAddress: '' });
    }

    this.props.fetchGroupDetails(groupAddress);
    return this.setState({ selectedGroupAddress: groupAddress });
  };

  render = () => {
    const { groups, inProgress } = this.props.network;
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
            {!isEmpty(groups) ? (
              map(groups, (group, groupAddress) => {
                const { votes, capacity } = group;
                const voteCapacity = capacity.isZero() ? votes : capacity;
                const voteCapacityFilled = votes.div(voteCapacity).toNumber() * 100;

                return (
                  <Group
                    key={groupAddress}
                    group={group}
                    votes={formatBigInt(votes)}
                    voteCapacityFilled={voteCapacityFilled}
                    selectedGroupAddress={this.state.selectedGroupAddress}
                    handleGroupClick={this.handleGroupClick}
                  />
                );
              })
            ) : (
              <></>
            )}
          </Groups>
        </Row>
      </Container>
    );
  };
}

export default connector(Elections);
