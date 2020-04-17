import React, { memo, Fragment } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import TopbarTooltip from './TopbarTooltip';

const TopbarWalletMenu = ({ isOpen, toggle }) => (
  <Fragment>
    {!isOpen && <TopbarTooltip tooltip="Wallets" childId="topbar-wallet-menu" />}
    <Dropdown isOpen={isOpen} toggle={toggle} id="topbar-wallet-menu" className="d-inline-block">
      <DropdownToggle className="btn header-item waves-effect" id="page-header-user-dropdown" tag="button">
        <i className="mdi mdi-wallet-outline" style={{ fontSize: 24 }} />
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem tag="a" href="#">
          <i className="mdi mdi-leek font-size-17 align-middle mr-1" style={{ color: '#495057' }} />
          Ledger
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </Fragment>
);

export default memo(TopbarWalletMenu);
