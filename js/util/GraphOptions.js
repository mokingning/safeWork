/* eslint-disable prettier/prettier */
import * as echarts from 'echarts/core';

export const barOptionCheck = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五'],
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: '正常通勤',
      type: 'bar',
      // stack: 'Ad',
      emphasis: {
        focus: 'series',
      },
      data: [1, 1, 1, 1, 0],
    },
    {
      name: '加班',
      type: 'bar',
      // stack: 'Ad',
      emphasis: {
        focus: 'series',
      },
      data: [1, 0, 1, 0, 0],
    },
    {
      name: '请假',
      type: 'bar',
      // stack: 'Ad',
      emphasis: {
        focus: 'series',
      },
      data: [0, 0, 0, 0, 1],
    },
  ],
};

export const pieOptionCheck = {
  tooltip: {
    trigger: 'item',
  },
  legend: {
    left: 'center',
    bottom: '4%',
  },
  grid: {
    top: '10%',
    left: '15px',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  series: [
    {
      name: '考勤',
      type: 'pie',
      radius: ['30%', '60%'], // 饼图大小控制
      avoidLabelOverlap: false,
      labelLine: {
        show: true,
      },
      label: {
        show: true,
        formatter: '{b}\n({d}%)', //自定义显示格式(b:name, c:value, d:百分比)
      },
      data: [
        {value: 4, name: '正常'},
        {value: 1, name: '请假'},
        {value: 1, name: '加班'},
      ],
    },
  ],
};
export const barOptionStudy = {
  title: {
    text: '近一周学习情况',
    left: 'center',
    textStyle: {fontSize: 15, fontWeight: 'normal'},
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999',
      },
    },
  },
  legend: {
    data: ['PDF学习', '文章学习', '视频学习', '学习总量'],
    bottom: '5%',
    itemWidth: 5,
    itemHeight: 5,
  },
  grid: {
    bottom: '15%',
    left: '5%',
    right: '4%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      axisPointer: {
        type: 'shadow',
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: '学习数量',
      min: 0,
      max: 4,
      interval: 2,
      axisLabel: {
        formatter: '{value}',
      },
    },
    {
      type: 'value',
      name: '学习总量',
      min: 0,
      max: 10,
      interval: 2,
      axisLabel: {
        formatter: '{value} 个',
      },
    },
  ],
  series: [
    {
      name: '文章学习',
      type: 'bar',
      tooltip: {
        valueFormatter: function (value) {
          return value + ' 个';
        },
      },
      data: [1, 1, 2, 1, 3, 1, 4],
    },
    {
      name: '视频学习',
      type: 'bar',
      tooltip: {
        valueFormatter: function (value) {
          return value + ' 个';
        },
      },
      data: [1, 1, 1, 1, 2, 1, 2],
    },
    {
      name: 'PDF学习',
      type: 'bar',
      tooltip: {
        valueFormatter: function (value) {
          return value + ' 个';
        },
      },
      data: [2, 1, 1, 2, 1, 3, 2],
    },
    {
      name: '学习总量',
      type: 'line',
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value) {
          return value + ' 个';
        },
      },
      data: [4, 3, 4, 4, 6, 5, 8],
    },
  ],
};
export const pieOptionStudy = {
  title: {
    text: '现有学习资源',
    left: 'center',
    textStyle: {fontSize: 15, fontWeight: 'normal'},
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    left: 'center',
    bottom: '1%',
  },
  grid: {
    top: '10%',
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  series: {
    name: '学习资料种类',
    type: 'pie',
    radius: ['30%', '60%'], // 饼图大小控制
    avoidLabelOverlap: false,
    labelLine: {
      show: true,
    },
    label: {
      show: true,
      formatter: '{b}\n({d}%)', //自定义显示格式(b:name, c:value, d:百分比)
    },
    data: [
      {value: 4, name: '视频'},
      {value: 1, name: 'PDF'},
      {value: 1, name: '文章'},
    ],
  },
};
