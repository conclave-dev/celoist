import React, { memo } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexSpline = ({
  series
}: {
  series: {
    name: string;
    data: number[];
  }[];
}) => {
  const apexBarChartOpt = {
    chart: {
      toolbar: {
        show: false
      },
      height: 'auto',
      width: '100%',
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
    colors: ['#3488ec', '#fbcc5c', '#35D07F'],
    grid: {
      show: false
    },
    yaxis: {
      show: false
    },
    xaxis: {
      show: false,
      labels: {
        show: false
      },
      tooltip: {
        enabled: false
      }
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      itemMargin: {
        horizontal: 10,
        vertical: 10
      },
      position: 'bottom'
    },
    tooltip: {
      x: {
        formatter: (val) => {
          return `Election #${val}`;
        }
      }
    }
  };

  return <ReactApexChart options={apexBarChartOpt} series={series} type="area" />;
};

export default memo(ApexSpline);
