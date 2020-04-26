import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import SidebarAccount from './SidebarAccount';
import overviewLight from '../../../assets/png/overviewLight.png';
import voteLight from '../../../assets/png/voteLight.png';
import lightBulbLight from '../../../assets/png/lightBulbLight.png';

const closeSidebarMobile = () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 991;

  if (!isMobile) {
    return;
  }

  document.body.classList.remove('vertical-collapsed');
  document.body.classList.toggle('sidebar-enable');
};

const SidebarContentEcosystem = () => (
  <>
    <li className="menu-title">Ecosystem</li>
    <li>
      <Link to="/ecosystem" className="waves-effect" onClick={closeSidebarMobile}>
        <div className="iconSidebar">
          <img src={overviewLight} height={22} alt="Overview sidebar menu icon" />
        </div>
        <span>Overview</span>
      </Link>
    </li>
    <li>
      <Link to="/ecosystem/elections" className="waves-effect" onClick={closeSidebarMobile}>
        <div className="iconSidebar">
          <img src={voteLight} height={22} alt="Elections sidebar menu icon" />
        </div>
        <span>Elections</span>
      </Link>
    </li>
    <li>
      <Link to="/ecosystem/governance" className="waves-effect" onClick={closeSidebarMobile}>
        <div className="iconSidebar">
          <img src={lightBulbLight} height={22} alt="Governance sidebar menu icon" />
        </div>
        <span>Governance</span>
      </Link>
    </li>
  </>
);

const MemoizedSidebarContentEcosystem = memo(SidebarContentEcosystem);

const SidebarContent = () => (
  <div id="sidebar-menu">
    <ul className="metismenu list-unstyled" id="side-menu">
      <MemoizedSidebarContentEcosystem />
      <SidebarAccount closeSidebarMobile={closeSidebarMobile} />
    </ul>
  </div>
);

export default memo(SidebarContent);
