import React, { memo, useState } from 'react';
import { Alert } from 'reactstrap';

const ReusableAlert = ({ children, color = 'primary' }: { children: any; color: string }) => {
  const [shouldShow, setShouldShow] = useState(true);

  return (
    <div className="d-flex align-items-center" style={{ height: 113 }}>
      <Alert color={color} isOpen={!!shouldShow} toggle={() => setShouldShow(false)} style={{ marginBottom: 0 }}>
        {children}
      </Alert>
    </div>
  );
};

export default memo(ReusableAlert);
