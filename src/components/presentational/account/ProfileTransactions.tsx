import React, { memo } from 'react';
import SimpleBar from 'simplebar-react';

const ProfileTransactions = ({ transactions }) => (
  <>
    <h4 className="card-title">Transactions</h4>
    {transactions.length ? (
      <SimpleBar style={{ maxHeight: 300 }}>
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
      <div className="d-flex justify-content-center align-items-center" style={{ height: 300 }}>
        <p className="font-italic text-center">Coming soon</p>
      </div>
    )}
  </>
);

export default memo(ProfileTransactions);
