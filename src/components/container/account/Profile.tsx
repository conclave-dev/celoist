import React, { PureComponent } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { connect, ConnectedProps } from 'react-redux';
import { getAccount } from '../../../data/actions/account';
import ProfileDetails from '../../presentational/account/ProfileDetails';
import ProfileTransactions from '../../presentational/account/ProfileTransactions';
import ProfileAssets from '../../presentational/account/ProfileAssets';
import Header from '../../presentational/reusable/Header';
import Alert from '../../presentational/reusable/Alert';
import ResponsiveWrapper from '../../presentational/reusable/ResponsiveWrapper';

const mapState = ({ account: { summary, isRegistered }, ledger: { ledger } }, ownProps) => ({
  ledger,
  summary,
  isRegistered,
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
      this.props.getAccount(account);
    }
  };

  render() {
    const { summary, isRegistered } = this.props;
    const { name, address, metadataURL } = summary;

    return (
      <Container fluid>
        <Header
          title="Profile"
          subtitle="A birdseye view of your Celo activity"
          inProgress={false}
          rightSideComponent={
            address && !isRegistered ? (
              <Alert color="warning">
                Your Celo account is not registered.{' '}
                <Button
                  style={{
                    color: '#3488ec',
                    textDecoration: 'underline',
                    border: 'none',
                    padding: 0,
                    backgroundColor: 'transparent',
                    height: 21,
                    verticalAlign: 'top'
                  }}
                  onClick={() => {
                    console.log('hello!');
                  }}
                >
                  Register
                </Button>{' '}
              </Alert>
            ) : null
          }
        />
        <Row>
          <ResponsiveWrapper mobileClasses="col-12 mb-4" desktopClasses="col-lg-4">
            <ProfileDetails isRegistered={isRegistered} name={name} address={address} metadataURL={metadataURL} />
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
