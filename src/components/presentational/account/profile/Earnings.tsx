import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { getAccountEarnings } from '../../../../data/actions/account';
import EarningsGroups from './EarningsGroups';
import Spinner from '../../reusable/Spinner';

const mapState = ({ account: { earnings, inProgress } }, ownProps) => ({
  earnings,
  inProgress,
  ...ownProps
});
const mapDispatch = { getAccountEarnings };
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

class Earnings extends PureComponent<Props, { type: string }> {
  componentDidUpdate = ({ account: prevAccount }) => {
    const { account } = this.props;

    if (!prevAccount && account) {
      this.props.getAccountEarnings(account, 10);
    }
  };

  render = () => {
    console.log('this.props', this.props);

    return (
      <Card style={{ height: 574 }}>
        <CardBody style={{ paddingBottom: 0 }}>
          <Row className="justify-content-between align-items-center" style={{ width: '100%', flexWrap: 'nowrap' }}>
            <Col xs={5}>
              <h4 className="card-title">Earnings</h4>
            </Col>
            <Col
              lg={7}
              xs={7}
              className="d-flex justify-content-end"
              style={{ flexWrap: 'nowrap', paddingRight: 0 }}
            ></Col>
          </Row>
        </CardBody>
        <CardBody
          className="d-flex justify-content-center align-items-center"
          style={{ padding: 0, height: '100%', width: '100%' }}
        >
          {this.props.inProgress ? <Spinner color="muted" /> : <EarningsGroups earnings={this.props.earnings} />}
        </CardBody>
      </Card>
    );
  };
}

export default connector(Earnings);
