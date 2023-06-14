/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

import {useRef, useEffect} from 'react';
import * as echarts from 'echarts/core';
import {BarChart, LineChart, PieChart} from 'echarts/charts';
import {
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
} from 'echarts/components';
import SvgChart, {SVGRenderer} from '@wuba/react-native-echarts/svgChart';

import {Dimensions} from 'react-native';

// 注册需要用到的组件
echarts.use([
  DataZoomComponent,
  SVGRenderer,
  BarChart,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  TooltipComponent,
  TitleComponent,
  PieChart,
  LineChart,
]);

// 图表默认宽高
const CHART_WIDTH = Dimensions.get('screen').width * 0.95; // 默认用手机屏幕宽度
const CHART_HEIGHT = 250;

const Chart = ({
  option,
  onInit,
  onRefresh,
  width = CHART_WIDTH,
  height = CHART_HEIGHT,
  ChartComponent,
}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    let chart;
    if (chartRef.current) {
      chart = echarts.init(chartRef.current, 'light', {
        renderer: 'svg',
        width,
        height,
      });
      option && chart.setOption(option);
      onInit?.(chart);
      onRefresh?.(chart);
    }
    return () => chart?.dispose();
  }, [option]);
  return <ChartComponent ref={chartRef} />;
};

const MySvgChart = props => <Chart {...props} ChartComponent={SvgChart} />;

export {MySvgChart};
