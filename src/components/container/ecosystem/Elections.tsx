import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Container, Row } from 'reactstrap';
import { isEmpty, map } from 'lodash';
import { fetchGroups, fetchGroupMembers, fetchGroupDetails } from '../../../data/actions/network';
import Header from '../../presentational/ecosystem/elections/Header';
import Summary from '../../presentational/ecosystem/elections/Summary';
import Groups from '../../presentational/ecosystem/elections/Groups';
import Group from '../../presentational/ecosystem/elections/Group';
import { formatBigInt } from '../../../util/numbers';

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

    return (
      <Container fluid>
        <Header inProgress={inProgress} />
        <Summary />
        <Row className="mt-4">
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
