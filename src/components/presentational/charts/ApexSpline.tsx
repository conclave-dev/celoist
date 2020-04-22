import React, { memo } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexSpline = () => {
  const apexBarChartOpt = {
    chart: {
      toolbar: {
        show: false
      },
      height: 350,
      type: 'area'
    },
    dataLabels: {
      show: false,
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    colors: ['#3488ec', '#35D07F', '#fbcc5c'],
    grid: {
      show: false
    },
    yaxis: {
      show: false
    },
    xaxis: {
      show: false
    },
    legend: {
      itemMargin: {
        horizontal: 10,
        vertical: 10
      },
      labels: {
        colors: ['#5b626b']
      },
      position: 'top'
    }
  };
  const apexBarChartData = [
    {
      name: 'Votes',
      data: [0, 0, 0, 52, 42, 109, 100, 0, 0, 0]
    },
    {
      name: 'cGLD',
      data: [32, 60, 34, 46, 34, 52, 41, 32, 60, 34]
    },
    {
      name: 'cUSD',
      data: [0, 25, 0, 0, 100, 0, 0, 0, 25, 0]
    }
  ];

  // const data = groupVotes.map(({ name, votes }) => ({}));

  return <ReactApexChart options={apexBarChartOpt} series={apexBarChartData} type="area" />;
};

export default memo(ApexSpline);
