import React, { PureComponent } from 'react';
import { Button } from 'reactstrap';
import { connect, ConnectedProps } from 'react-redux';
import { registerUserAccount } from '../../../../data/actions/account';
import Alert from '../../reusable/Alert';
import Register from '../../reusable/txAlerts/Register';
import VerifyAddress from '../../reusable/txAlerts/VerifyAddress';
import ErrorTxAlert from '../../reusable/txAlerts/Error';
import SuccessTxAlert from '../../reusable/txAlerts/Success';
import { showTxAlert, showError, showSuccess } from '../../reusable/txAlerts/util';

const mapState = ({ account: { accountTx, errorMessage } }, ownProps) => ({
  accountTx,
  errorMessage,
  ...ownProps
});
const mapDispatch = { registerUserAccount };
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

class RegistrationAlert extends PureComponent<Props> {
  componentDidUpdate = ({ errorMessage: prevErrorMessage, accountTx: prevAccountTx }) => {
    const { errorMessage, accountTx } = this.props;

    if (!prevErrorMessage && errorMessage) {
      return showError(
        <ErrorTxAlert
          errorMessage={errorMessage}
          txHash={(!prevAccountTx.transactionHash && accountTx.transactionHash) || ''}
        />
      );
    }

    if (!prevAccountTx.transactionHash && accountTx.transactionHash) {
      return showSuccess(<SuccessTxAlert txHash={accountTx.transactionHash} />);
    }
  };

  initRegistration = () =>
    showTxAlert({
      title: 'Register',
      confirmButtonText: 'Register',
      showCancelButton: true,
      showConfirmButton: true,
      showLoaderOnConfirm: true,
      html: <Register />,
      onClose: null,
      preConfirm: (value) => {
        if (value) {
          this.props.registerUserAccount();

          showTxAlert({
            title: 'Verify Address',
            confirmButtonText: '',
            showCancelButton: true,
            showConfirmButton: false,
            showLoaderOnConfirm: false,
            html: <VerifyAddress />,
            onClose: null,
            preConfirm: (value) => {}
          });
        }
      }
    });

  render = () => {
    const { isLoggedIn, isRegistered } = this.props;
    return (
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
            onClick={this.initRegistration}
          >
            Register
          </Button>{' '}
        </Alert>
      )
    );
  };
}

export default connector(RegistrationAlert);
