import React, { PureComponent } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect, ConnectedProps } from 'react-redux';
import { isEmpty } from 'lodash';
import { getAccount } from '../../../data/actions/account';
import { logInWithLedger } from '../../../data/actions/ledger';
import Details from '../../presentational/account/profile/Details';
import Balance from '../../presentational/account/profile/Balance';
import Earnings from '../../presentational/account/profile/Earnings';
import RegistrationAlert from '../../presentational/account/profile/RegistrationAlert';
import Header from '../../presentational/reusable/Header';
import ResponsiveWrapper from '../../presentational/reusable/ResponsiveWrapper';

const mapState = ({ account: { summary, assets, isRegistered }, ledger: { ledger } }, ownProps) => ({
  ledger,
  summary,
  assets,
  isRegistered,
  ...ownProps
});
const mapDispatch = { getAccount, logInWithLedger };
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

class Profile extends PureComponent<Props, { activeTab: number }> {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0
    };

    props.getAccount(props.account);
  }

  setActiveTab = ({ currentTarget: { id } }) => this.setState({ activeTab: parseInt(id) });

  render() {
    const { summary, assets, isRegistered, ledger } = this.props;
    const { name, address } = summary;

    return (
      <Container fluid>
        <Header
          title="Profile"
          subtitle={['Your Celo footprint in one convenient location']}
          inProgress={false}
          rightSideComponent={<RegistrationAlert isLoggedIn={!isEmpty(ledger)} isRegistered={isRegistered} />}
        />
        <Row>
          <ResponsiveWrapper desktopClasses="col-12 col-lg-4" mobileClasses="col-12 col-lg-4 mb-4">
            <Row className="mb-4" noGutters>
              <Details name={name} address={address} isRegistered={isRegistered} />
            </Row>
            <Row noGutters>
              <Balance assets={assets} />
            </Row>
          </ResponsiveWrapper>
          <Col lg={8} xs={12}>
            <Earnings account={address} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connector(Profile);
