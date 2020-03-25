import React, { memo } from 'react';
import { Spinner } from 'reactstrap';

const Summary = ({ color }: { color: string }) => (
  <div style={{ paddingTop: 2, paddingBottom: 2 }}>
    <Spinner type="grow" color={color} />
  </div>
);

export default memo(Summary);
