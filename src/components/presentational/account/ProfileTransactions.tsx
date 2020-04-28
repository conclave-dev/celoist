import React, { memo } from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import SimpleBar from 'simplebar-react';

const ProfileTransactions = ({ transactions }: { transactions: string[] }) => (
  <Card>
    <CardBody>
      <h4 className="card-title">Transactions</h4>
      <Row style={{ minHeight: 300 }}>
        <Col xs={12}>
          {transactions.length ? (
            <SimpleBar>
              <ol className="activity-feed">
                <li className="feed-item">
                  <div className="feed-item-list">
                    <span className="date">Timestamp</span>
                    <span className="activity-text">Details</span>
                  </div>
                </li>
              </ol>
            </SimpleBar>
          ) : (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
              <p className="font-italic text-center">Coming soon</p>
            </div>
          )}
        </Col>
      </Row>
    </CardBody>
  </Card>
);

export default memo(ProfileTransactions);
