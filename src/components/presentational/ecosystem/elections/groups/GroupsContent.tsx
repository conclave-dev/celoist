import React, { memo } from 'react';
import Group from '../Group';

const GroupsContent = ({ groupsById, allGroupIds, config, networkURL }: any) => (
  <>
    {allGroupIds.map((groupId) => (
      <Group key={groupId} group={groupsById[groupId]} maxGroupSize={config.maxGroupSize} networkURL={networkURL} />
    ))}
  </>
);

export default memo(GroupsContent);
