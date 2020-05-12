import React, { PureComponent, useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect, ConnectedProps } from 'react-redux';
import { switchNetwork as switchNetworkAction } from '../../../data/actions/network';
import { networkConfigurations } from '../../../util/constants';

const mapState = ({ network: { networkID } }, ownProps) => ({ networkID, ...ownProps });
const mapDispatch = { switchNetwork: switchNetworkAction };
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const getNetworks = (switchNetwork) =>
  Object.entries(networkConfigurations).map(([identifier, { label }]) => (
    <DropdownItem key={identifier} onClick={() => switchNetwork(identifier)}>
      {label}
    </DropdownItem>
  ));

const NetworkDropDown = ({ networkID, switchNetwork }: { networkID: string; switchNetwork: any }) => {
  const [isDropdownOpen, toggleDropdown] = useState(false);
  const toggle = () => toggleDropdown((prevState) => !prevState);

  return (
    <Dropdown isOpen={isDropdownOpen} style={{ marginLeft: '20px' }} toggle={toggle}>
      <DropdownToggle caret>{networkConfigurations[networkID].label}</DropdownToggle>
      <DropdownMenu style={{ backgroundColor: '#CCCCCC' }}>{getNetworks(switchNetwork)}</DropdownMenu>
    </Dropdown>
  );
};

class SidebarNetworkSwitcher extends PureComponent<Props> {
  render = () => {
    const { switchNetwork, networkID } = this.props;

    return (
      <>
        <li className="menu-title">Network</li>
        <li>
          <NetworkDropDown networkID={networkID} switchNetwork={switchNetwork} />
        </li>
      </>
    );
  };
}

export default connector(SidebarNetworkSwitcher);
