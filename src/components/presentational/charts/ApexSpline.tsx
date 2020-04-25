import React, { memo } from 'react';
import ReactApexChart from 'react-apexcharts';

export interface ChartData {
  name: string;
  data: number[];
}

export type ChartDataColors = string[];

const ApexSpline = ({ chartData, chartDataColors }: { chartData: ChartData[]; chartDataColors: ChartDataColors }) => {
  const apexBarChartOpt = {
    chart: {
      toolbar: {
        show: false
      },
      width: '100%',
      height: '100%',
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
    colors: chartDataColors,
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
      position: 'top'
    }
  };

  return <ReactApexChart options={apexBarChartOpt} series={chartData} type="area" />;
};

export default memo(ApexSpline);
