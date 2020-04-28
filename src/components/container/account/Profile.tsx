import React, { PureComponent } from 'react';
import { Container, Row } from 'reactstrap';
import { connect, ConnectedProps } from 'react-redux';
import { setAccount } from '../../../data/actions/account';
import ProfileDetails from '../../presentational/account/ProfileDetails';
import ProfileTransactions from '../../presentational/account/ProfileTransactions';
import ProfileAssets from '../../presentational/account/ProfileAssets';
import Header from '../../presentational/reusable/Header';
import ResponsiveWrapper from '../../presentational/reusable/ResponsiveWrapper';

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
    const { name, address, metadataURL, authorizedSigners, assets } = this.props;

    return (
      <Container fluid>
        <Header title="Profile" subtitle="A birdseye view of your Celo activity" inProgress={false} />
        <Row>
          <ResponsiveWrapper mobileClasses="col-12 mb-4" desktopClasses="col-lg-4">
            <ProfileDetails
              name={name}
              address={address}
              metadataURL={metadataURL}
              validator={authorizedSigners.validator}
            />
          </ResponsiveWrapper>
          <ResponsiveWrapper mobileClasses="col-12 mb-4" desktopClasses="col-lg-4">
            <ProfileAssets {...assets} />
          </ResponsiveWrapper>
          <ResponsiveWrapper mobileClasses="col-12 mb-4" desktopClasses="col-lg-4">
            <ProfileTransactions transactions={[]} />
          </ResponsiveWrapper>
        </Row>
      </Container>
    );
  }
}

export default connector(Profile);
