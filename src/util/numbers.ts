import BigNumber from 'bignumber.js';

BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_HALF_UP, DECIMAL_PLACES: 2 });

const fmt = {
  decimalSeparator: '.',
  groupSeparator: ',',
  groupSize: 3
};

BigNumber.config({ FORMAT: fmt });

const slashingMultiplierBase = new BigNumber('1e+24');
const commissionBase = new BigNumber('1e+22');
const voteBase = new BigNumber('1e+18');
const scoreBase = new BigNumber('1e+22');

const formatN = (n: number) => new BigNumber(n).toFormat(0);

const formatSlashingMultiplier = (n: BigNumber) =>
  n
    .dividedBy(slashingMultiplierBase)
    .minus(1)
    .toFormat(2);
const formatCommission = (n: BigNumber) => n.dividedBy(commissionBase).toNumber();
const formatVotes = (n: BigNumber) => n.dividedBy(voteBase).toFormat(0);
const formatScore = (n: BigNumber) => n.dividedBy(scoreBase).toFormat(2);

// Abbreviates long numbers into a more readable format
export { formatN, formatSlashingMultiplier, formatCommission, formatVotes, formatScore };
