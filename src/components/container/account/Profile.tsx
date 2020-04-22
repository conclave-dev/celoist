import React, { PureComponent } from 'react';
import { Container, Row, Col, Card, CardBody, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { isEmpty } from 'lodash';
import { connect, ConnectedProps } from 'react-redux';
import SimpleBar from 'simplebar-react';
import { setAccount } from '../../../data/actions/account';
import Header from '../../presentational/reusable/Header';
import Spinner from '../../presentational/reusable/Spinner';
import Anchor from '../../presentational/reusable/Anchor';
import ApexSpline from '../../presentational/charts/ApexSpline';

const mapState = ({ account }) => ({ ...account });
const mapDispatch = { setAccount };
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const Account = ({ name, address }) => (
  <ListGroup style={{ height: 200 }}>
    <ListGroupItem style={{ border: 'none', paddingRight: 0, paddingLeft: 0 }}>
      <Row noGutters style={{ flexWrap: 'nowrap' }}>
        <Col xs={4}>
          <Row noGutters style={{ height: 36 }} className="mb-2 ">
            <span className="text-truncate">Name</span>
          </Row>
          <Row noGutters style={{ height: 36 }} className="mb-2">
            <span className="text-truncate">Address</span>
          </Row>
          <Row noGutters style={{ height: 36 }} className="mb-2">
            <span className="text-truncate">Metadata</span>
          </Row>
          <Row noGutters style={{ height: 36 }}>
            <span className="text-truncate">Validator</span>
          </Row>
        </Col>
        <Col xs={8}>
          <Row noGutters style={{ height: 36 }} className="mb-2">
            <span className="text-truncate">{name || 'No name set'}</span>
          </Row>
          <Row noGutters style={{ height: 36 }} className="mb-2">
            <Anchor href={`https://baklava-blockscout.celo-testnet.org/address/${address}`} color="#3488ec">
              <span className="text-truncate">{address}</span>
            </Anchor>
          </Row>
          <Row noGutters style={{ height: 36 }} className="mb-2">
            <Button
              className="waves-effect waves-light"
              size="sm"
              style={{
                color: '#FFF',
                backgroundColor: '#3488ec',
                border: 'none',
                height: 26,
                paddingTop: 0,
                paddingBottom: 0
              }}
            >
              View
            </Button>
          </Row>
          <Row noGutters style={{ height: 36 }}>
            <Button
              className="waves-effect waves-light"
              size="sm"
              style={{
                color: '#FFF',
                backgroundColor: '#35D07F',
                border: 'none',
                height: 26,
                paddingTop: 0,
                paddingBottom: 0
              }}
            >
              View
            </Button>
          </Row>
        </Col>
      </Row>
    </ListGroupItem>
  </ListGroup>
);

const Balances = ({ votes, cGLD, cUSD }) => (
  <Col lg={7} xs={12}>
    <Card style={{ height: 668 }}>
      <CardBody style={{ maxHeight: 70 }}>
        <h4 className="card-title" style={{ marginBottom: 0 }}>
          Balances
        </h4>
      </CardBody>
      <CardBody>
        <ApexSpline />
        <p className="text-center font-italic">Previous 10 Elections</p>
      </CardBody>
    </Card>
  </Col>
);

class Profile extends PureComponent<Props> {
  componentDidUpdate = prevProps => {
    if (isEmpty(prevProps.ledger) && !isEmpty(this.props.ledger) && !this.props.address) {
      this.props.setAccount();
    }
  };

  render() {
    return (
      <Container fluid>
        <Header title="Profile" subtitle="Your Celo presence at a glance" inProgress={false} />
        <Row>
          <Col lg={5} xs={12}>
            <Card className="mb-2" style={{ height: 668 }}>
              <CardBody>
                <h4 className="card-title">Account</h4>
                <Account name={this.props.name} address={this.props.address} />
                <hr style={{ width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.1)', marginTop: 12, marginBottom: 24 }} />
                <h4 className="card-title">Transactions</h4>
                <SimpleBar style={{ maxHeight: 300 }}>
                  <ol className="activity-feed">
                    <li className="feed-item">
                      <div className="feed-item-list">
                        <span className="date">Jan 22</span>
                        <span className="activity-text">Responded to need “Volunteer Activities”</span>
                      </div>
                    </li>
                    <li className="feed-item">
                      <div className="feed-item-list">
                        <span className="date">Jan 20</span>
                        <span className="activity-text">
                          At vero eos et accusamus et iusto odio dignissimos ducimus qui deleniti atque... Read more
                        </span>
                      </div>
                    </li>
                    <li className="feed-item">
                      <div className="feed-item-list">
                        <span className="date">Jan 19</span>
                        <span className="activity-text">Joined the group “Boardsmanship Forum”</span>
                      </div>
                    </li>
                    <li className="feed-item">
                      <div className="feed-item-list">
                        <span className="date">Jan 17</span>
                        <span className="activity-text">Responded to need “In-Kind Opportunity”</span>
                      </div>
                    </li>
                    <li className="feed-item">
                      <div className="feed-item-list">
                        <span className="date">Jan 16</span>
                        <span className="activity-text">Sed ut perspiciatis unde omnis iste natus error sit rem.</span>
                      </div>
                    </li>
                  </ol>
                </SimpleBar>
              </CardBody>
            </Card>
          </Col>
          <Balances votes={1} cGLD={1} cUSD={1} />
        </Row>
      </Container>
    );
  }
}

export default connector(Profile);
