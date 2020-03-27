import BigNumber from 'bignumber.js';

BigNumber.config({ ROUNDING_MODE: 0, DECIMAL_PLACES: 2 });

const fmt = {
  decimalSeparator: '.',
  groupSeparator: ',',
  groupSize: 3
};

BigNumber.config({ FORMAT: fmt });

const formatInt = (n: number) => new BigNumber(n).toFormat(0);

const formatBigInt = (n: number) => formatInt(n / 1000000000000000000);

// Abbreviates long numbers into a more readable format
export { formatInt, formatBigInt };
