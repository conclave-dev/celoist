import React, { memo, ReactChild } from 'react';
import { UncontrolledTooltip } from 'reactstrap';

const TopbarMenuTooltip = ({ childId, tooltip }: { childId: string; tooltip: ReactChild }) => (
  <UncontrolledTooltip color="primary" placement="bottom" target={childId}>
    {tooltip}
  </UncontrolledTooltip>
);

export default memo(TopbarMenuTooltip);
