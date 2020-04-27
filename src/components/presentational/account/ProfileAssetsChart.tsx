import React, { memo } from 'react';
import Chart from 'react-apexcharts';
import BigNumber from 'bignumber.js';

const makeOptions = ({ cGLDLabel, cUSDLabel }) => ({
  chart: {
    type: 'column',
    toolbar: {
      show: false
    },
    width: '100%',
    parentHeightOffset: 0
  },
  dataLabels: {
    enabled: false
  },
  colors: ['#fbcc5c', '#35D07F'],
  plotOptions: {
    bar: {
      distributed: true,
      columnWidth: '100%'
    }
  },
  grid: {
    show: false
  },
  yaxis: {
    show: false,
    axisTicks: {
      show: false
    },
    axisBorder: {
      show: false
    }
  },
  xaxis: {
    labels: {
      show: true
    },
    axisTicks: {
      show: false
    },
    axisBorder: {
      show: false
    },
    categories: [
      ['cGLD', cGLDLabel],
      ['cUSD', cUSDLabel]
    ]
  },
  tooltip: {
    x: {
      show: false
    },
    y: {
      show: false
    }
  },
  legend: {
    show: false
  }
});

const ProfileAssetsChart = ({
  cGLD = new BigNumber(0),
  cUSD = new BigNumber(0)
}: {
  cGLD: BigNumber;
  cUSD: BigNumber;
}) => {
  const cGLDData = cGLD.toNumber() / 1000000000000000000;
  const cUSDData = cUSD.toNumber() / 1000000000000000000;
  const cGLDLabel = `~${new BigNumber(cGLDData).toFixed(8)}`;
  const cUSDLabel = `~${new BigNumber(cUSDData).toFixed(8)}`;

  return (
    <Chart
      options={makeOptions({ cGLDLabel, cUSDLabel })}
      series={[
        {
          name: 'Balance',
          data: [cGLDData, cUSDData]
        }
      ]}
      type="bar"
      width="100%"
      height="100%"
    />
  );
};

export default memo(ProfileAssetsChart);
