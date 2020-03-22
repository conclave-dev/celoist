import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const SidebarContentGeneral = () => (
  <>
    <li className="menu-title">General</li>
    <li>
      <Link to="" className="waves-effect">
        <i className="mdi mdi-view-dashboard"></i>
        <span>Dashboard</span>
      </Link>
    </li>
  </>
);

const SidebarContentNetwork = () => (
  <>
    <li className="menu-title">Network</li>
    <li>
      <Link to="" className="waves-effect">
        <i className="mdi mdi-shield-star"></i>
        <span>Elections</span>
      </Link>
    </li>
    <li>
      <Link to="" className="waves-effect">
        <i className="mdi mdi-vote"></i>
        <span>Governance</span>
      </Link>
    </li>
  </>
);

const SidebarContent = () => (
  <div id="sidebar-menu">
    <ul className="metismenu list-unstyled" id="side-menu">
      <SidebarContentGeneral />
      <SidebarContentNetwork />
    </ul>
  </div>
);

export default memo(SidebarContent);
