import { ProposalsById } from '../types/governance';

type GetInProgress = {
  governance: {
    inProgress: boolean;
  };
};
type GetProposalsById = {
  governance: {
    proposalsById: ProposalsById;
  };
};

const getInProgress = ({ governance: { inProgress } }: GetInProgress) => inProgress;

const getProposalsById = ({ governance: { proposalsById } }: GetProposalsById) => ({
  proposalsById
});

export { getInProgress, getProposalsById };
