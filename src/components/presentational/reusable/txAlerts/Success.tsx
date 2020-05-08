import React, { memo } from 'react';
import Anchor from '../Anchor';

const Success = ({ txHash }: { txHash: string }) => (
  <div className="pt-4 pb-4 text-center">
    <div style={{ width: '85%' }}>
      <p className="text-center">Success!</p>
      {!txHash && (
        <p className="text-center" style={{ marginBottom: 0 }}>
          <Anchor href={`https://baklava-blockscout.celo-testnet.org/tx/${txHash}`} color="#3488ec">
            View transaction details
          </Anchor>
        </p>
      )}
    </div>
  </div>
);

export default memo(Success);
