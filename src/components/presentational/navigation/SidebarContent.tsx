import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { UncontrolledPopover, PopoverBody } from 'reactstrap';
import homeLight from '../../../assets/png/homeLight.png';
import voteLight from '../../../assets/png/voteLight.png';
import governanceLight from '../../../assets/png/governanceLight.png';
import validatorsLight from '../../../assets/png/validatorsLight.png';
import votersLight from '../../../assets/png/votersLight.png';

const closeSidebarMobile = () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;

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
      <Link to="/" className="waves-effect" onClick={closeSidebarMobile}>
        <div className="iconSidebar">
          <img src={homeLight} height={22} alt="Home sidebar menu icon" />
        </div>
        <span>Home</span>
      </Link>
    </li>
    <li>
      <Link to="/elections" className="waves-effect" onClick={closeSidebarMobile}>
        <div className="iconSidebar">
          <img src={voteLight} height={22} alt="Elections sidebar menu icon" />
        </div>
        <span>Elections</span>
      </Link>
    </li>
    <li>
      <Link to="/governance" className="waves-effect" onClick={closeSidebarMobile}>
        <div className="iconSidebar">
          <img src={governanceLight} height={22} alt="Governance sidebar menu icon" />
        </div>
        <span>Governance</span>
      </Link>
    </li>
  </>
);

const SidebarContentEducation = () => (
  <div id="education">
    <li className="menu-title">Education</li>
    <li>
      <Link to="#" className="waves-effect" onClick={closeSidebarMobile}>
        <div className="iconSidebar">
          <img src={validatorsLight} height={22} alt="Validators sidebar menu icon" />
        </div>
        <span>Validators</span>
      </Link>
    </li>
    <li>
      <Link to="#" className="waves-effect" onClick={closeSidebarMobile}>
        <div className="iconSidebar">
          <img src={votersLight} height={22} alt="Votes sidebar menu icon" />
        </div>
        <span>Voters</span>
      </Link>
    </li>
    <UncontrolledPopover placement="right" target="education">
      <PopoverBody>Coming soon</PopoverBody>
    </UncontrolledPopover>
  </div>
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
