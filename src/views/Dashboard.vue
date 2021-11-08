<template>
  <div id="line" style="width: 100%; height: 25%">dashboard</div>
  <div id="bar" style="width: 100%; height: 25%"></div>
  <div id="pie" style="width: 100%; height: 25%"></div>
  <div id="scatter" style="width: 100%; height: 25%"></div>
</template>

<script setup>
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, LineChart, PieChart, ScatterChart } from 'echarts/charts';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
} from 'echarts/components';
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';

import { onMounted, ref } from 'vue';
// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  LineChart,
  PieChart,
  ScatterChart,
  CanvasRenderer,
]);
onMounted(() => {
  // 接下来的使用就跟之前一样，初始化图表，设置配置项
  const lineChart = echarts.init(document.getElementById('line'));
  lineChart.setOption({
    xAxis: {
      data: ['A', 'B', 'C', 'D', 'E'],
    },
    yAxis: {},
    series: [
      {
        data: [10, 22, 28, 23, 19],
        type: 'line',
        smooth: true,
      },
    ],
  });
  const barChart = echarts.init(document.getElementById('bar'));
  barChart.setOption({
    xAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {},
    series: [
      {
        type: 'bar',
        data: [23, 24, 18, 25, 27, 28, 25],
      },
    ],
  });
  const pieChart = echarts.init(document.getElementById('pie'));
  pieChart.setOption({
    series: [
      {
        type: 'pie',
        data: [
          {
            value: 335,
            name: '直接访问',
          },
          {
            value: 234,
            name: '联盟广告',
          },
          {
            value: 1548,
            name: '搜索引擎',
          },
        ],
        radius: '50%',
      },
    ],
  });
  const scatterChart = echarts.init(document.getElementById('scatter'));
  scatterChart.setOption({
    xAxis: {},
    yAxis: {},
    series: [
      {
        type: 'scatter',
        data: [
          [10, 5],
          [0, 8],
          [6, 10],
          [2, 12],
          [8, 9],
        ],
      },
    ],
  });
});

const age = ref(10);
const sex = ref(20);
</script>

<style scoped></style>
