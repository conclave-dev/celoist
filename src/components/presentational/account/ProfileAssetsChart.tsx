import React, { memo } from 'react';
import Chart from 'react-apexcharts';
import BigNumber from 'bignumber.js';

const options = {
  chart: {
    type: 'bar',
    height: 350
  },
  plotOptions: {
    bar: {
      horizontal: true
    }
  },
  dataLabels: {
    enabled: false
  },
  colors: ['#fbcc5c', '#35D07F'],
  grid: {
    show: false
  },
  yaxis: {
    show: false
  },
  xaxis: {
    categories: ['Gold (cGLD)', 'Dollars (cUSD)']
  }
};

const ProfileAssetsChart = ({ cGLD = new BigNumber(0), cUSD = new BigNumber(0) }: { cGLD: BigNumber; cUSD: BigNumber }) => (
  <Chart
    options={options}
    series={[
      {
        data: [cGLD.toNumber(), cUSD.toNumber()]
      }
    ]}
    type="bar"
    width={500}
  />
);

export default memo(ProfileAssetsChart);
