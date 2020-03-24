import React, { memo } from 'react';
import { Spinner } from 'reactstrap';

const Summary = () => (
  <div style={{ paddingTop: 1, paddingBottom: 1 }}>
    <Spinner type="grow" color="warning" />
  </div>
);

export default memo(Summary);
