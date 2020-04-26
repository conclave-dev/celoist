import React, { memo } from 'react';
import { Card, CardBody } from 'reactstrap';
import SimpleBar from 'simplebar-react';

const ProfileTransactions = ({ transactions }) => (
  <Card>
    <CardBody>
      <h4 className="card-title">Transactions</h4>
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
        <div className="d-flex justify-content-center align-items-center">
          <p className="font-italic text-center">Coming soon</p>
        </div>
      )}
    </CardBody>
  </Card>
);

export default memo(ProfileTransactions);
