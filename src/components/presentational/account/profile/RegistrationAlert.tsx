import React, { memo } from 'react';
import { Button } from 'reactstrap';
import Alert from '../../reusable/Alert';

const RegistrationAlert = ({ isLoggedIn, isRegistered }: { isLoggedIn: boolean; isRegistered: boolean }) =>
  isLoggedIn &&
  !isRegistered && (
    <Alert color="warning">
      Your Celo account is not registered.{' '}
      <Button
        style={{
          color: '#3488ec',
          textDecoration: 'underline',
          border: 'none',
          padding: 0,
          backgroundColor: 'transparent',
          height: 21,
          verticalAlign: 'top'
        }}
        onClick={() => {
          console.log('hello!');
        }}
      >
        Register
      </Button>{' '}
    </Alert>
  );

export default memo(RegistrationAlert);
