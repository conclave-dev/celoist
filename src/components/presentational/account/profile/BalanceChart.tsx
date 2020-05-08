import React, { memo } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexSpline = ({
  series,
  seriesColors
}: {
  series: {
    name: string;
    data: number[];
  }[];
  seriesColors: string[];
}) => {
  const apexBarChartOpt = {
    chart: {
      toolbar: {
        show: false
      },
      width: '100%',
      type: 'area',
      parentHeightOffset: 0,
      redrawOnParentResize: false
    },
    dataLabels: {
      show: false,
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    colors: seriesColors,
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
      },
      axisBorder: {
        show: false
      }
    },
    legend: {
      show: false
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
