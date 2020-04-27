import React, { memo } from 'react';
import Chart from 'react-apexcharts';
import BigNumber from 'bignumber.js';

const options = {
  chart: {
    type: 'bar',
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      horizontal: false,
      barHeight: '100%',
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: 10,
    colors: ['#fff']
  },
  colors: ['#fbcc5c', '#35D07F'],
  grid: {
    show: false
  },
  yaxis: {
    show: false,
    labels: {
      show: false
    }
  },
  xaxis: {
    labels: {
      show: false
    },
    axisTicks: {
      show: false
    },
    axisBorder: {
      show: false
    },
    categories: ['Gold (cGLD)', 'Dollars (cUSD)']
  },
  tooltip: {
    theme: 'dark',
    x: {
      show: false
    },
    y: {
      title: {
        formatter: () => ''
      }
    }
  },
  legend: {
    itemMargin: {
      horizontal: 5,
      vertical: 5
    }
  }
};

const ProfileAssetsChart = ({
  cGLD = new BigNumber(0),
  cUSD = new BigNumber(0)
}: {
  cGLD: BigNumber;
  cUSD: BigNumber;
}) => (
  <Chart
    options={options}
    series={[
      {
        name: 'Gold (cGLD)',
        data: [new BigNumber(cGLD.toNumber() / 1000000000000000000).toFixed(4)]
      },
      {
        name: 'Dollars (cUSD)',
        data: [cUSD.toNumber() / 1000000000000000000]
      }
    ]}
    type="bar"
    width="100%"
  />
);

export default memo(ProfileAssetsChart);
