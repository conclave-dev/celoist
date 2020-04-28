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

const ResponsiveWrapper = ({ children }) => (
  <>
    <Col lg={4} className="d-none d-lg-block">
      {children}
    </Col>
    <Col xs={12} className="d-block d-lg-none mb-4">
      {children}
    </Col>
  </>
);

class Profile extends PureComponent<Props> {
  componentDidMount = () => {
    if (this.props.address) {
      this.props.setAccount(this.props.address);
    }
  };

  render() {
    const { name, address, metadataURL, authorizedSigners, assets } = this.props;

    return (
      <Container fluid>
        <Header title="Profile" subtitle="A birdseye view of your Celo activity" inProgress={false} />
        <Row>
          <ResponsiveWrapper>
            <ProfileDetails
              name={name}
              address={address}
              metadataURL={metadataURL}
              validator={authorizedSigners.validator}
            />
          </ResponsiveWrapper>
          <ResponsiveWrapper>
            <ProfileAssets {...assets} />
          </ResponsiveWrapper>
          <ResponsiveWrapper>
            <ProfileTransactions transactions={[]} />
          </ResponsiveWrapper>
        </Row>
      </Container>
    );
  }
}

export default connector(Profile);
