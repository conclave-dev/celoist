import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import SidebarAccount from './SidebarAccount';
import SidebarNetworkSwitcher from './SidebarNetworkSwitcher';
import home from '../../../assets/png/home.png';
import friendsLight from '../../../assets/png/friendsLight.png';
import voteLight from '../../../assets/png/voteLight.png';
import lightBulbLight from '../../../assets/png/lightBulbLight.png';
import { isMobile } from '../../../util/responsive';
import Anchor from '../reusable/Anchor';

const SweetAlert = withReactContent(Swal);

const showFriends = () =>
  SweetAlert.fire({
    title: 'Our Friends',
    html: (
      <div className="pt-4 pb-4">
        <p>
          Our sincerest thanks to the individuals below, who have supported Celoist with their suggestions, feedback,
          and contributions.
        </p>
        <ListGroup>
          <ListGroupItem style={{ border: 'none' }}>
            <Anchor href="https://twitter.com/vertex_one">Bijan (Goods & Services)</Anchor>
          </ListGroupItem>
          <ListGroupItem style={{ border: 'none' }}>
            <Anchor href="https://github.com/zviadm">Zviad (wotrust)</Anchor>
          </ListGroupItem>
          <ListGroupItem style={{ border: 'none' }}>
            <Anchor href="https://twitter.com/Ether_Gavin">Gavin (Figment Network)</Anchor>
          </ListGroupItem>
        </ListGroup>
      </div>
    ),
    confirmButtonText: 'Close'
  });

const sidebarToggler = () => {
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
      <Link to="/ecosystem" className="waves-effect" onClick={sidebarToggler}>
        <div className="iconSidebar">
          <img src={home} height={22} alt="Home sidebar menu icon" />
        </div>
        <span>Home</span>
      </Link>
    </li>
    <li>
      <Link to="/ecosystem/elections" className="waves-effect" onClick={sidebarToggler}>
        <div className="iconSidebar">
          <img src={voteLight} height={22} alt="Elections sidebar menu icon" />
        </div>
        <span>Elections</span>
      </Link>
    </li>
    <li>
      <Link to="/ecosystem/governance" className="waves-effect" onClick={sidebarToggler}>
        <div className="iconSidebar">
          <img src={lightBulbLight} height={22} alt="Governance sidebar menu icon" />
        </div>
        <span>Governance</span>
      </Link>
    </li>
    <li>
      <Link to="" className="waves-effect" onClick={showFriends}>
        <div className="iconSidebar">
          <img src={friendsLight} height={22} alt="Friends sidebar menu icon" />
        </div>
        <span>Our Friends</span>
      </Link>
    </li>
  </>
);

const MemoizedSidebarContentEcosystem = memo(SidebarContentEcosystem);

const SidebarContent = () => (
  <div id="sidebar-menu">
    <ul className="metismenu list-unstyled" id="side-menu">
      <SidebarNetworkSwitcher />
      <MemoizedSidebarContentEcosystem />
      <SidebarAccount sidebarToggler={sidebarToggler} />
    </ul>
  </div>
);

export default memo(SidebarContent);
