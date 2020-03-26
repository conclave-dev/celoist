import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Container, Row } from 'reactstrap';
import { isEmpty, map } from 'lodash';
import BigNumber from 'bignumber.js';
import { fetchGroups, fetchGroupMembers } from '../../data/actions/network';
import Header from '../presentational/elections/Header';
import Summary from '../presentational/elections/Summary';
import Groups from '../presentational/elections/Groups';
import Group from '../presentational/elections/Group';
import { formatBigInt } from '../../util/numbers';

const mapState = ({ network }) => ({ network });
const mapDispatch = { fetchGroups, fetchGroupMembers };
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

class Elections extends PureComponent<Props> {
  constructor(props) {
    super(props);

    this.state = {
      shownGroupIndex: 0
    };
  }

  componentDidMount = () => {
    this.props.fetchGroups();
    this.props.fetchGroupMembers();
  };

  setGroupIndex = groupIndex => this.setState({ shownGroupIndex: groupIndex });

  render = () => {
    const { groups, groupMembers } = this.props.network;

    return (
      <Container fluid>
        <Header />
        <Summary />
        <Row className="mt-4">
          <Groups>
            {!isEmpty(groups) ? (
              map(groups, (group, groupIndex) => {
                BigNumber.config({ ROUNDING_MODE: 0 });
                const { votes, capacity } = group;
                const voteCapacity = capacity.isZero() ? votes : capacity;
                const voteCapacityFilled = votes.div(voteCapacity).toNumber() * 80;

                return (
                  <Group
                    key={group.address}
                    group={group}
                    votes={formatBigInt(votes)}
                    voteCapacityFilled={voteCapacityFilled}
                    members={groupMembers[group.address]}
                    index={groupIndex + 1}
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
