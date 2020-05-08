import React, { memo } from 'react';
import { Spinner } from 'reactstrap';

const ReusableSpinner = ({ color }: { color?: string }) => (
  <div className="pt-4 pb-4 d-flex justify-content-center align-items-center">
    <Spinner type="grow" color={color || 'warning'} />
  </div>
);

export default memo(ReusableSpinner);
