import React, { memo } from 'react';
import BigNumber from 'bignumber.js';
import { getTokenAmountFromUint256 } from '../../../../util/numbers';
import { BarChart, Bar } from 'recharts';

const EarningsGroupChart = ({ earnings }: { earnings: { earnings: BigNumber; epochNumber: number }[] }) => {
  const { data } = earnings.reduce(
    (acc, earningsItem) => {
      const previousEarningsTokens = getTokenAmountFromUint256(acc.previousEarnings);
      const earningsTokens = getTokenAmountFromUint256(earningsItem.earnings);
      const earningsDifferenceTokens = getTokenAmountFromUint256(earningsTokens.minus(previousEarningsTokens));

      const dataItem = {
        name: earningsItem.epochNumber,
        earnings: previousEarningsTokens.isZero()
          ? acc.previousEarnings.toNumber()
          : earningsTokens.minus(previousEarningsTokens).toNumber()
      };

      return {
        data: [...acc.data, dataItem],
        previousEarnings: earningsDifferenceTokens
      };
    },
    {
      data: [],
      previousEarnings: new BigNumber(0)
    }
  );

  return (
    <BarChart width={250} height={50} data={data}>
      <Bar dataKey="earnings" fill="#fbcc5c" />
    </BarChart>
  );
};

export default memo(EarningsGroupChart);
