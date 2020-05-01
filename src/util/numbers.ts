import BigNumber from 'bignumber.js';

BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_HALF_UP, DECIMAL_PLACES: 2 });

const fmt = {
  decimalSeparator: '.',
  groupSeparator: ',',
  groupSize: 3
};

BigNumber.config({ FORMAT: fmt });

const slashingMultiplierBase = new BigNumber('1e24');
const commissionBase = new BigNumber('1e22');
const voteBase = new BigNumber('1e18');
const scoreBase = new BigNumber('1e22');
const tokenBase = new BigNumber('1e18');

const formatN = (n: number) => new BigNumber(n).toFormat(0);

const formatSlashingMultiplier = (n = new BigNumber(0)) => n.dividedBy(slashingMultiplierBase).minus(1).toFormat(2);
const formatCommission = (n = new BigNumber(0)) => n.dividedBy(commissionBase).toFormat(2);
const formatVotes = (n = new BigNumber(0)) => n.dividedBy(voteBase).toFormat(0);
const formatScore = (n = new BigNumber(0)) => n.dividedBy(scoreBase).toFormat(2);
const formatTokens = (n = new BigNumber(0)) => n.dividedBy(tokenBase).toFormat(2);

// Abbreviates long numbers into a more readable format
export { formatN, formatSlashingMultiplier, formatCommission, formatVotes, formatScore, formatTokens };
