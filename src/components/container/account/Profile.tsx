import React, { PureComponent } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { isEmpty } from 'lodash';
import { connect, ConnectedProps } from 'react-redux';
import { setAccount } from '../../../data/actions/account';
import ProfileDetails from '../../presentational/account/ProfileDetails';
import ProfileTransactions from '../../presentational/account/ProfileTransactions';
import ProfileAssets from '../../presentational/account/ProfileAssets';
import Header from '../../presentational/reusable/Header';
import BigNumber from 'bignumber.js';

const mapState = ({ account }, ownProps) => ({ ...account, ...ownProps });
const mapDispatch = { setAccount };
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

class Profile extends PureComponent<Props> {
  componentDidMount = () => {
    if (this.props.address) {
      this.props.setAccount(this.props.address);
    }
  };

  render() {
    const { name, address, metadataURL, authorizedSigners } = this.props;

    return (
      <Container fluid>
        <Header title="Profile" subtitle="A birdseye view of your Celo activity" inProgress={false} />
        <Row>
          <Col lg={4} xs={12}>
            <ProfileDetails
              name={name}
              address={address}
              metadataURL={metadataURL}
              validator={authorizedSigners.validator}
            />
          </Col>
          <Col lg={4} xs={12}>
            <ProfileAssets cGLD={new BigNumber(0)} cUSD={new BigNumber(0)} />
          </Col>
          <Col lg={4} xs={12}>
            <ProfileTransactions transactions={[]} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connector(Profile);
