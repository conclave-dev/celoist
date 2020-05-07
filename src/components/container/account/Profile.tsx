import React, { PureComponent } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { connect, ConnectedProps } from 'react-redux';
import { isEmpty } from 'lodash';
import { getAccount } from '../../../data/actions/account';
import { logInWithLedger } from '../../../data/actions/ledger';
import Balance from '../../presentational/account/profile/Balance';
import Header from '../../presentational/reusable/Header';
import ResponsiveWrapper from '../../presentational/reusable/ResponsiveWrapper';
import RegistrationAlert from '../../presentational/account/profile/RegistrationAlert';

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
    const subtitle = address
      ? [address, `${name || 'No name set'}`, isRegistered ? 'Registered' : 'Unregistered']
      : [''];

    return (
      <Container fluid>
        <Header
          title="Profile"
          subtitle={subtitle}
          inProgress={false}
          rightSideComponent={<RegistrationAlert isLoggedIn={!isEmpty(ledger)} isRegistered={isRegistered} />}
        />
        <Row>
          <Col lg={5} xs={12}>
            <Balance assets={assets} />
          </Col>
          <Col lg={7} xs={12}></Col>
        </Row>
      </Container>
    );
  }
}

export default connector(Profile);
