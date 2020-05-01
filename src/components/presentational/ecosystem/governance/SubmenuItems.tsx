import React, { memo } from 'react';
import { Button, ListGroupItem } from 'reactstrap';
import { connect, ConnectedProps } from 'react-redux';
import { fetchProposals, filterProposalsByStage } from '../../../../data/actions/governance';

const mapState = ({ governance: { stageFilter } }, ownProps) => ({
  ...ownProps,
  stageFilter
});
const mapDispatch = { fetchProposals, filterProposalsByStage };
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const styles = {
  listGroupItemButton: { border: 'none', paddingTop: 2, paddingBottom: 2 }
};

const SubmenuItems = ({ proposalsByStage, allProposalStages, stageFilter, filterProposalsByStage }: Props) => {
  return (
    <>
      {allProposalStages.map((stage) => {
        const active = stageFilter === stage;

        return (
          <ListGroupItem
            active={active}
            key={stage}
            style={{ border: 'none', backgroundColor: active ? '#e9ecef' : '#FFF', marginTop: 0, borderRadius: 0 }}
          >
            <div onClick={active ? null : () => filterProposalsByStage(stage)} style={{ color: '#5b626b' }}>
              <div className="d-flex justify-content-between align-items-center">
                {stage}
                <Button
                  size="sm"
                  className="btn"
                  style={{ ...styles.listGroupItemButton, backgroundColor: active ? '#3488ec' : '#e9ecef' }}
                >
                  {Object.keys(proposalsByStage[stage]).length}
                </Button>
              </div>
            </div>
          </ListGroupItem>
        );
      })}
    </>
  );
};

export default connector(memo(SubmenuItems));
