import React, { memo } from 'react';
import { Button } from 'reactstrap';

const RegistrationStatus = ({ isRegistered }: { isRegistered: boolean }) => {
  return (
    <Button
      className="btn btn-outline waves-effect waves-light"
      size="sm"
      style={{
        color: '#FFF',
        backgroundColor: isRegistered ? '#35D07F' : '#fb7c6d',
        border: 'none',
        height: 26,
        paddingTop: 0,
        paddingBottom: 0
      }}
    >
      {isRegistered ? 'Registered' : 'Not Registered'}
    </Button>
  );
};

export default memo(RegistrationStatus);
