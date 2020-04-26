import React, { PureComponent } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { isEmpty } from 'lodash';
import { connect, ConnectedProps } from 'react-redux';
import { setAccount } from '../../../data/actions/account';
import ProfileAccount from '../../presentational/account/ProfileAccount';
import ProfileTransactions from '../../presentational/account/ProfileTransactions';
import ProfileBalances from '../../presentational/account/ProfileBalances';
import Header from '../../presentational/reusable/Header';

const mapState = ({ account }, ownProps) => ({ ...account, ...ownProps });
const mapDispatch = { setAccount };
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

class Profile extends PureComponent<Props> {
  constructor(props) {
    super(props);

    props.setAccount(props.address);
  }

  componentDidUpdate = prevProps => {
    if (isEmpty(prevProps.ledger) && !isEmpty(this.props.ledger) && !this.props.address) {
      this.props.setAccount();
    }
  };

  render() {
    const { name, address, metadataURL, authorizedSigners } = this.props;

    return (
      <Container fluid>
        <Header title="Profile" subtitle="A birdseye view of your Celo activity" inProgress={false} />
        <Row>
          <Col lg={5} xs={12}>
            <Card className="mb-2" style={{ height: 668 }}>
              <CardBody>
                <ProfileAccount
                  name={name}
                  address={address}
                  metadataURL={metadataURL}
                  validator={authorizedSigners.validator}
                />
                <hr style={{ width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.1)', marginTop: 12, marginBottom: 24 }} />
                <ProfileTransactions transactions={[]} />
              </CardBody>
            </Card>
          </Col>
          <ProfileBalances votes={1} cGLD={1} cUSD={1} />
        </Row>
      </Container>
    );
  }
}

export default connector(Profile);
