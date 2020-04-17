import React, { memo } from 'react';
import { UncontrolledTooltip } from 'reactstrap';

const TopbarMenuTooltip = ({ childId, tooltip }) => (
  <UncontrolledTooltip color="primary" placement="bottom" target={childId}>
    {tooltip}
  </UncontrolledTooltip>
);

export default memo(TopbarMenuTooltip);
