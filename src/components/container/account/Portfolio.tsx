import React, { PureComponent } from 'react';
import { Container, Row, Col, Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { isEmpty } from 'lodash';
import { connect, ConnectedProps } from 'react-redux';
import { setAccount, getAccountAssets } from '../../../data/actions/account';
import PortfolioAssets from '../../presentational/account/PortfolioAssets';
import PortfolioVault from '../../presentational/account/PortfolioVault';
import PortfolioGroups from '../../presentational/account/PortfolioGroups';
import Header from '../../presentational/reusable/Header';

const mapState = ({ account }) => ({ ...account });
const mapDispatch = { setAccount, getAccountAssets };
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

class Portfolio extends PureComponent<Props, { activeTab: string }> {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1'
    };

    if (props.address) {
      this.props.getAccountAssets(props.address);
    }
  }

  componentDidUpdate = prevProps => {
    const { ledger, address } = this.props;
    if (isEmpty(prevProps.ledger) && !isEmpty(ledger) && !address) {
      this.props.setAccount();
    }

    if (!prevProps.address && address) {
      this.props.getAccountAssets(address);
    }
  };

  render = () => (
    <Container fluid>
      <Header title="Portfolio" subtitle="A birdseye-view of your activity on Celo" inProgress={false} />
      <Row noGutters>
        <Col xs={12}>
          <Card>
            <CardBody>
              <Nav tabs className="nav-tabs-custom nav-justified">
                <NavItem>
                  <NavLink
                    className={this.state.activeTab === '1' ? 'active' : ''}
                    onClick={() => this.setState({ activeTab: '1' })}
                  >
                    Assets
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={this.state.activeTab === '2' ? 'active' : ''}
                    onClick={() => this.setState({ activeTab: '2' })}
                  >
                    Vault
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={this.state.activeTab === '3' ? 'active' : ''}
                    onClick={() => this.setState({ activeTab: '3' })}
                  >
                    Groups
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <PortfolioAssets cGLD={0} cUSD={0} />
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col sm="12">
                      <PortfolioVault lockedGold={0} unlockedGold={0} pendingWithdrawal={0} />
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="3">
                  <Row>
                    <Col sm="12">
                      <PortfolioGroups pendingVotes={0} activeVotes={0} />
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default connector(Portfolio);
