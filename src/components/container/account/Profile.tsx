import React, { PureComponent } from 'react';
import { Container, Row } from 'reactstrap';
import { connect, ConnectedProps } from 'react-redux';
import { getAccountData } from '../../../data/actions/account';
import ProfileDetails from '../../presentational/account/ProfileDetails';
import ProfileTransactions from '../../presentational/account/ProfileTransactions';
import ProfileAssets from '../../presentational/account/ProfileAssets';
import Header from '../../presentational/reusable/Header';
import ResponsiveWrapper from '../../presentational/reusable/ResponsiveWrapper';

const mapState = ({ account: { ledger, summary, assets } }, ownProps) => ({ ledger, summary, assets, ...ownProps });
const mapDispatch = { getAccountData };
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

class Profile extends PureComponent<Props> {
  componentDidMount = () => {
    const { ledger } = this.props;
    const account = ledger.ledger && ledger.getAccounts()[0];

    if (account && !this.props.summary.address) {
      this.props.getAccountData(account);
    }
  };

  render() {
    const { summary, assets } = this.props;
    const { name, address, metadataURL, authorizedSigners } = summary;

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
