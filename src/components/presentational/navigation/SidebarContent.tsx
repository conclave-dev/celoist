import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import homeLight from '../../../assets/png/homeLight.png';
import voteLight from '../../../assets/png/voteLight.png';
import proposalLight from '../../../assets/png/proposalLight.png';

const SidebarContentEcosystem = () => (
  <>
    <li className="menu-title">Ecosystem</li>
    <li>
      <Link to="" className="waves-effect">
        <div className="iconSidebar">
          <img src={homeLight} height={22} />
        </div>
        <span>Home</span>
      </Link>
    </li>
    <li>
      <Link to="/elections" className="waves-effect">
        <div className="iconSidebar">
          <img src={voteLight} height={22} />
        </div>
        <span>Elections</span>
      </Link>
    </li>
    <li>
      <Link to="/proposals" className="waves-effect">
        <div className="iconSidebar">
          <img src={proposalLight} height={22} />
        </div>
        <span>Proposals</span>
      </Link>
    </li>
  </>
);

const MemoizedSidebarContentEcosystem = memo(SidebarContentEcosystem);

const SidebarContent = () => (
  <div id="sidebar-menu">
    <ul className="metismenu list-unstyled" id="side-menu">
      <MemoizedSidebarContentEcosystem />
    </ul>
  </div>
);

export default memo(SidebarContent);
