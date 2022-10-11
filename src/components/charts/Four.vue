<template>
  <div>
    <div
      id="mainFour"
      style="width: 600px; height: 400px; margin-top: 20px"
    ></div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted } from "vue";
const echarts = require("echarts/lib/echarts");
require("echarts/lib/component/title");
require("echarts/lib/component/grid");
require("echarts/lib/component/dataZoom");
require("echarts/lib/chart/bar");
let dataAxis = [];
let datas = [];
let option = null;
onMounted(() => {
  option = {
    title: {
      text: "当前店内热度",
    },
    series: [
      {
        type: "gauge",
        center: ["50%", "60%"],
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 60,
        splitNumber: 12,
        itemStyle: {
          color: "#FFAB91",
        },
        progress: {
          show: true,
          width: 30,
        },
        pointer: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            width: 30,
          },
        },
        axisTick: {
          distance: -45,
          splitNumber: 5,
          lineStyle: {
            width: 2,
            color: "#999",
          },
        },
        splitLine: {
          distance: -52,
          length: 14,
          lineStyle: {
            width: 3,
            color: "#999",
          },
        },
        axisLabel: {
          distance: -20,
          color: "#999",
          fontSize: 20,
        },
        anchor: {
          show: false,
        },
        title: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          width: "60%",
          lineHeight: 40,
          borderRadius: 8,
          offsetCenter: [0, "-15%"],
          fontSize: 50,
          fontWeight: "bolder",
          formatter: "{value} °C",
          color: "auto",
        },
        data: [
          {
            value: 20,
          },
        ],
      },
      {
        type: "gauge",
        center: ["50%", "60%"],
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 60,
        itemStyle: {
          color: "#FD7347",
        },
        progress: {
          show: true,
          width: 8,
        },
        pointer: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        detail: {
          show: false,
        },
        data: [
          {
            value: 20,
          },
        ],
      },
    ],
  };
  setInterval(function () {
    const random = +(Math.random() * 60).toFixed(2);
    myChart.setOption({
      series: [
        {
          data: [
            {
              value: random,
            },
          ],
        },
        {
          data: [
            {
              value: random,
            },
          ],
        },
      ],
    });
  }, 3000);
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById("mainFour"));
  option && myChart.setOption(option);
});
</script>

<style></style>
