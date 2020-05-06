import React, { memo } from 'react';
import Chart from 'react-apexcharts';
import BigNumber from 'bignumber.js';

const chartOptions = {
  chart: {
    type: 'column',
    toolbar: {
      show: false
    },
    width: '100%',
    parentHeightOffset: 0
  },
  dataLabels: {
    show: true,
    enabled: true,
    distributed: true,
    background: {
      enabled: true,
      foreColor: '#333'
    },
    formatter: (val) => val.toFixed(4)
  },
  legend: {
    itemMargin: {
      horizontal: 10,
      vertical: 10
    }
  },
  colors: ['#fbcc5c', '#35D07F'],
  plotOptions: {
    bar: {
      distributed: true,
      columnWidth: '75%'
    }
  },
  grid: {
    show: false
  },
  yaxis: {
    show: false
  },
  xaxis: {
    axisTicks: {
      show: false
    },
    axisBorder: {
      show: false
    },
    labels: {
      show: false
    },
    categories: [['cGLD'], ['cUSD']]
  },
  tooltip: {
    x: {
      show: false
    },
    y: {
      show: false
    }
  }
};

const ProfileAssetsChart = ({
  cGLD = new BigNumber(0),
  cUSD = new BigNumber(0)
}: {
  cGLD: BigNumber;
  cUSD: BigNumber;
}) => {
  const cGLDData = cGLD.toNumber() / 1000000000000000000;
  const cUSDData = cUSD.toNumber() / 1000000000000000000;

  return (
    <Chart
      options={chartOptions}
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
