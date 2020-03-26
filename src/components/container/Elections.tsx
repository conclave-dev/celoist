import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Container, Row } from 'reactstrap';
import { fetchGroups, fetchGroupMembers } from '../../data/actions/network';
import Header from '../presentational/elections/Header';
import Summary from '../presentational/elections/Summary';
import Groups from '../presentational/elections/Groups';

const mapState = ({ network }) => ({ network });
const mapDispatch = { fetchGroups, fetchGroupMembers };
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

class Elections extends PureComponent<Props> {
  componentDidMount = () => {
    this.props.fetchGroups();
    this.props.fetchGroupMembers();
  };

  render = () => {
    const { groups, groupMembers } = this.props.network;

    return (
      <Container fluid>
        <Header />
        <Summary />
        <Row className="mt-4">
          <Groups groups={groups} groupMembers={groupMembers} />
        </Row>
      </Container>
    );
  };
}

export default connector(Elections);
