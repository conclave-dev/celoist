import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
  connectLedger as connectLedgerAction,
  disconnectLedger as disconnectLedgerAction
} from '../../../data/actions/account';
import profileLight from '../../../assets/png/profileLight.png';
import portfolioLight from '../../../assets/png/portfolioLight.png';
import keyLight from '../../../assets/png/keyLight.png';
import lockLight from '../../../assets/png/lockLight.png';

const SweetAlert = withReactContent(Swal);

const mapState = ({ account: { address } }, ownProps) => ({ address, ...ownProps });
const mapDispatch = { connectLedger: connectLedgerAction, disconnectLedger: disconnectLedgerAction };
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const SidebarAccount = memo(({ address, closeSidebarMobile, connectLedger, disconnectLedger }: Props) => {
  const specifyAccountIndex = callback => {
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
        // @ts-ignore
        const value = parseInt(window.document.getElementById('accountIndex').value);

        if (value >= 0) {
          callback(value);
        }
      }
    });
  };

  const showConnectProgress = value =>
    SweetAlert.fire({
      title: 'Connecting...',
      html: `
        <div class="pt-4 pb-4">
          <div role="status" class="spinner-grow text-warning"><span class="sr-only">Loading...</span></div>
        </div>
      `,
      showConfirmButton: false,
      showCancelButton: true,
      onOpen: () => connectLedger(value)
    });

  const showConnectSuccess = () =>
    SweetAlert.fire({
      title: 'Connected',
      icon: 'success',
      html: `
        <p>Successfully connected to ${address}</p>
      `,
      showCloseButton: true,
      showConfirmButton: false
    });

  if (address) {
    showConnectSuccess();
  }

  return (
    <>
      <li className="menu-title">Account</li>
      {address ? (
        <>
          <li>
            <Link to="/account" className="waves-effect" onClick={closeSidebarMobile}>
              <div className="iconSidebar">
                <img src={profileLight} height={22} alt="sidebar menu icon" />
              </div>
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link to="/account/portfolio" className="waves-effect" onClick={closeSidebarMobile}>
              <div className="iconSidebar">
                <img src={portfolioLight} height={22} alt="sidebar menu icon" />
              </div>
              <span>Portfolio</span>
            </Link>
          </li>
          <li>
            <Link
              to=""
              className="waves-effect"
              onClick={() => {
                closeSidebarMobile();
                return disconnectLedger();
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
              closeSidebarMobile();
              return specifyAccountIndex(showConnectProgress);
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
});

export default connector(SidebarAccount);
