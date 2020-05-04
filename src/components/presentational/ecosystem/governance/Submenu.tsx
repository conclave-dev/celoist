import React, { memo } from 'react';
import { ListGroupItem } from 'reactstrap';
import SubmenuItems from './SubmenuItems';

const Submenu = ({
  title,
  proposalsByStage,
  allProposalStages
}: {
  title: string;
  proposalsByStage: any;
  allProposalStages: string[];
}) => {
  return (
    <>
      <ListGroupItem style={{ border: 'none' }}>
        <small style={{ fontSize: 10 }}>{title}</small>
      </ListGroupItem>
      <SubmenuItems proposalsByStage={proposalsByStage} allProposalStages={allProposalStages} />
    </>
  );
};

export default memo(Submenu);
