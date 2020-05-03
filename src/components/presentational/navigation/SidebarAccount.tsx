import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { connect, ConnectedProps } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
  logInWithLedger as logInWithLedgerAction,
  logOutWithLedger as logOutWithLedgerAction
} from '../../../data/actions/ledger';
import profileLight from '../../../assets/png/profileLight.png';
import keyLight from '../../../assets/png/keyLight.png';
import lockLight from '../../../assets/png/lockLight.png';

const SweetAlert = withReactContent(Swal);

const mapState = ({ account: { address }, ledger: { ledger } }, ownProps) => ({ ledger, address, ...ownProps });
const mapDispatch = { logInWithLedger: logInWithLedgerAction, logOutWithLedger: logOutWithLedgerAction };
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const specifyAccountIndex = (callback) =>
  SweetAlert.fire({
    title: 'Connect Ledger Nano S/X',
    icon: 'question',
    html: `
        <p>Access an account by entering its index below (default: 0).</p>
        <input id="accountIndex" class="swal2-input" value="0" />
        <p class="font-italic">
          <small>
            Derivation path: 44'/52752'/0'/0/{index}
          </small>
        </p>
      `,
    showCancelButton: true,
    showConfirmButton: true,
    preConfirm: () => {
      // Addresses "has no property value" ts error https://stackoverflow.com/a/43823786
      const accountIndexElement = window.document.getElementById('accountIndex') as HTMLInputElement;
      const accountIndex = parseInt(accountIndexElement.value);

      if (accountIndex >= 0) {
        callback(accountIndex);
      }
    }
  });

const showConnectProgress = (callback, value) =>
  SweetAlert.fire({
    title: 'Connecting...',
    html: `
        <div class="pt-4 pb-4">
          <div role="status" class="spinner-grow text-warning"><span class="sr-only">Loading...</span></div>
        </div>
      `,
    showConfirmButton: false,
    showCancelButton: true,
    onOpen: () => callback(value)
  });

const showConnectSuccess = (address: string) =>
  SweetAlert.fire({
    title: 'Connected',
    icon: 'success',
    html: `
        <p>Successfully connected to ${address}</p>
      `,
    showCloseButton: true,
    showConfirmButton: false
  });

class SidebarAccount extends PureComponent<Props> {
  componentDidUpdate = async ({ ledger: { ledger: prevLedger } }) => {
    const { ledger } = this.props;

    if (isEmpty(prevLedger) && !isEmpty(ledger)) {
      const [account] = await ledger.getAccounts();
      showConnectSuccess(account);
    }
  };

  render = () => {
    const { logInWithLedger, ledger, sidebarToggler, logOutWithLedger } = this.props;

    return (
      <>
        <li className="menu-title">Account</li>
        {!isEmpty(ledger) ? (
          <>
            <li>
              <Link to="/account" className="waves-effect" onClick={sidebarToggler}>
                <div className="iconSidebar">
                  <img src={profileLight} height={22} alt="sidebar menu icon" />
                </div>
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link
                to=""
                className="waves-effect"
                onClick={() => {
                  sidebarToggler();
                  return logOutWithLedger();
                }}
              >
                <div className="iconSidebar">
                  <img src={lockLight} height={22} alt="sidebar menu icon" />
                </div>
                <span>Log Out</span>
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link
              to=""
              className="waves-effect"
              onClick={() => {
                sidebarToggler();
                return specifyAccountIndex((accountIndex) => showConnectProgress(logInWithLedger, accountIndex));
              }}
            >
              <div className="iconSidebar">
                <img src={keyLight} height={22} alt="sidebar menu icon" />
              </div>
              <span>Log In</span>
            </Link>
          </li>
        )}
      </>
    );
  };
}

export default connector(SidebarAccount);
