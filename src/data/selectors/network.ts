const getProposals = state => ({
  queuedProposals: state.network.queuedProposals,
  dequeuedProposals: state.network.dequeuedProposals
});

export { getProposals };
