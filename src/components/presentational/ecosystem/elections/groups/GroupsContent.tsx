import React, { memo } from 'react';
import Group from '../Group';
import { GroupProps } from '../types';

const GroupsContent = ({ groupsById, allGroupIds, config }: GroupProps) => (
  <>
    {allGroupIds.map((groupId) => (
      <Group key={groupId} group={groupsById[groupId]} maxGroupSize={config.maxGroupSize} />
    ))}
  </>
);

export default memo(GroupsContent);
