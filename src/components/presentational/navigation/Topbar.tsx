import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import celoLogo from '../../../assets/svg/celo-logo.svg';
import celoGlyph from '../../../assets/svg/celo-glyph.svg';
import TopbarWalletMenu from './TopbarWalletMenu';

const Topbar = () => {
  const toggleSidebar = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 991;

    if (isMobile) {
      document.body.classList.remove('vertical-collapsed');
      document.body.classList.toggle('sidebar-enable');
      return;
    }

    document.body.classList.toggle('vertical-collapsed');
    document.body.classList.remove('sidebar-enable');
  };

  return (
    <header id="page-topbar">
      <div className="navbar-header">
        <div className="d-flex">
          <div className="navbar-brand-box">
            <Link to="" className="logo logo-light">
              <span className="logo-sm">
                <img src={celoGlyph} alt="" height="30" />
              </span>
              <span className="logo-lg">
                <img src={celoLogo} alt="" height="64" />
              </span>
            </Link>
          </div>
          <button
            type="button"
            onClick={toggleSidebar}
            className="btn btn-sm px-3 font-size-24 header-item waves-effect d-lg-none d-xs-block"
            id="vertical-menu-btn"
          >
            <i className="mdi mdi-menu" style={{ fontSize: 24 }} />
          </button>
        </div>
        <div className="d-flex">
          <TopbarWalletMenu isOpen={false} toggle={() => {}} />
        </div>
      </div>
    </header>
  );
};

export default memo(Topbar);
