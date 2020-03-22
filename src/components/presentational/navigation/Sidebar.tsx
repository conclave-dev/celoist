import React, { memo } from 'react';
import SimpleBar from 'simplebar-react';
import SidebarContent from './SidebarContent';

const Sidebar = () => (
  <SimpleBar style={{ maxHeight: '100%' }}>
    <SidebarContent />
  </SimpleBar>
);

export default memo(Sidebar);
