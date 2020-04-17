import React, { PureComponent } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Spinner } from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { connect, ConnectedProps } from 'react-redux';
import { connectLedger, disconnectLedger } from '../../../data/actions/wallets';

const mapState = ({ wallets: { ledger, errorMessage } }) => ({ ledger, errorMessage });
const mapDispatch = { connectLedger, disconnectLedger };
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const SweetAlert = withReactContent(Swal);

class TopbarWalletMenu extends PureComponent<Props> {
  specifyAccountIndex = () => {
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
          SweetAlert.fire({
            title: 'Connecting...',
            html: `
              <div class="pt-4 pb-4">
                <div role="status" class="spinner-grow text-warning"><span class="sr-only">Loading...</span></div>
              </div>
            `,
            showConfirmButton: false,
            showCancelButton: true,
            onOpen: () => this.props.connectLedger(value)
          });
        }
      }
    });
  };

  componentDidUpdate = prevProps => {
    if (this.props.errorMessage) {
      return SweetAlert.fire({
        title: 'Error',
        icon: 'error',
        text: this.props.errorMessage,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Retry',
        preConfirm: () => this.specifyAccountIndex()
      });
    }

    if (prevProps.ledger && this.props.ledger.addressDerivationPath && !prevProps.ledger.addressDerivationPath !== this.props.ledger.addressDerivationPath) {
      return SweetAlert.fire({
        title: 'Connected',
        icon: 'success',
        html: `
          <p>Successfully connected to ${[...this.props.ledger.addressDerivationPath.keys()][0]}</p>
        `,
        showCloseButton: true,
        showConfirmButton: false
      });
    }
  };

  render = () => {
    const address = this.props.ledger.addressDerivationPath && [...this.props.ledger.addressDerivationPath.keys()][0];

    return (
      <UncontrolledDropdown id="topbar-wallet-menu" className="d-inline-block">
        <DropdownToggle className="btn header-item waves-effect" id="page-header-user-dropdown" tag="button">
          <i className="mdi mdi-leek" style={{ fontSize: 24 }} />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>
            Account
            <p className="font-italic" style={{ marginBottom: 0 }}>
              <small>{address || 'N/A'}</small>
            </p>
          </DropdownItem>
          <div className="dropdown-divider" />
          {address ? (
            <DropdownItem onClick={() => this.props.disconnectLedger()}>
              <i className="mdi mdi-close-circle align-middle mr-2" style={{ color: '#fb7c6d' }} />
              Disconnect
            </DropdownItem>
          ) : (
            <DropdownItem onClick={() => this.specifyAccountIndex()}>
              <i className="mdi mdi-check-circle align-middle mr-2" style={{ color: '#35D07F' }} />
              Connect
            </DropdownItem>
          )}
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };
}

export default connector(TopbarWalletMenu);
