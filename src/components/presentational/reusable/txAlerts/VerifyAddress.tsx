import React, { memo } from 'react';
import Spinner from '../Spinner';

const VerifyAddress = () => (
  <div className="pt-4 pb-4">
    <div className="mb-4" style={{ width: '100%' }}>
      <Spinner />
    </div>
    <div className="text-center">Please follow the instructions on your Ledger device to complete the transaction.</div>
  </div>
);

export default memo(VerifyAddress);
