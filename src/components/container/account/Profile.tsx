import React, { PureComponent } from 'react';
import { Container, Row } from 'reactstrap';
import { connect, ConnectedProps } from 'react-redux';
import { getAccount } from '../../../data/actions/account';
import ProfileDetails from '../../presentational/account/ProfileDetails';
import ProfileTransactions from '../../presentational/account/ProfileTransactions';
import ProfileAssets from '../../presentational/account/ProfileAssets';
import Header from '../../presentational/reusable/Header';
import ResponsiveWrapper from '../../presentational/reusable/ResponsiveWrapper';

const mapState = ({ account: { summary }, ledger: { ledger }, network: { networkID, networkURL } }, ownProps) => ({
  ledger,
  summary,
  networkID,
  networkURL,
  ...ownProps
});
const mapDispatch = { getAccount };
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

class Profile extends PureComponent<Props> {
  componentDidMount = () => {
    const { ledger } = this.props;
    const account = ledger.ledger && ledger.getAccounts()[0];

    if (account && !this.props.summary.address) {
      this.props.getAccount();
    }
  };

  componentDidUpdate = (prevProps) => {
    // Reload data on network change
    const { ledger, networkID } = this.props;
    if (prevProps.networkID !== networkID) {
      const account = ledger.ledger && ledger.getAccounts()[0];
      if (account) {
        this.props.getAccount();
      }
    }
  };

  render() {
    const { summary, networkURL } = this.props;
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
              networkURL={networkURL}
            />
          </ResponsiveWrapper>
          <ResponsiveWrapper mobileClasses="col-12 mb-4" desktopClasses="col-lg-4">
            <ProfileAssets />
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
