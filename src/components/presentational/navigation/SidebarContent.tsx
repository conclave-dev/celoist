import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import Anchor from '../reusable/Anchor';
import homeLight from '../../../assets/png/homeLight.png';
import voteLight from '../../../assets/png/voteLight.png';
import governanceLight from '../../../assets/png/governanceLight.png';
import validatorsLight from '../../../assets/png/validatorsLight.png';
import votersLight from '../../../assets/png/votersLight.png';

const SidebarContentEcosystem = () => (
  <>
    <li className="menu-title">Ecosystem</li>
    <li>
      <Link to="" className="waves-effect">
        <div className="iconSidebar">
          <img src={homeLight} height={22} alt="Home sidebar menu icon" />
        </div>
        <span>Home</span>
      </Link>
    </li>
    <li>
      <Link to="/elections" className="waves-effect">
        <div className="iconSidebar">
          <img src={voteLight} height={22} alt="Elections sidebar menu icon" />
        </div>
        <span>Elections</span>
      </Link>
    </li>
    <li>
      <Link to="/governance" className="waves-effect">
        <div className="iconSidebar">
          <img src={governanceLight} height={22} alt="Governance sidebar menu icon" />
        </div>
        <span>Governance</span>
      </Link>
    </li>
  </>
);

const SidebarContentEducation = () => (
  <>
    <li className="menu-title">Education</li>
    <li>
      <Anchor href="" color="#8699ad">
        <div className="iconSidebar">
          <img src={validatorsLight} height={22} alt="Validators sidebar menu icon" />
        </div>
        <span>Validators</span>
      </Anchor>
    </li>
    <li>
      <Anchor href="" color="#8699ad">
        <div className="iconSidebar">
          <img src={votersLight} height={22} alt="Votes sidebar menu icon" />
        </div>
        <span>Voters</span>
      </Anchor>
    </li>
  </>
);

const MemoizedSidebarContentEcosystem = memo(SidebarContentEcosystem);
const MemoizedSidebarContentEducation = memo(SidebarContentEducation);

const SidebarContent = () => (
  <div id="sidebar-menu">
    <ul className="metismenu list-unstyled" id="side-menu">
      <MemoizedSidebarContentEcosystem />
      <MemoizedSidebarContentEducation />
    </ul>
  </div>
);

export default memo(SidebarContent);
