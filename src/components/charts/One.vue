<template>
  <div id="main" style="width: 100%; height: 300px; padding-top: 10px"></div>
</template>

<script setup>
import { inject } from "@vue/runtime-core";
import apiUrl from "../../api/apiUrl.js";
import { onMounted } from "vue";
import link from "../../api/link.js";
import { reactive } from "@vue/reactivity";
import axios from "axios";
const echarts = require("echarts/lib/echarts");
require("echarts/lib/component/title");
require("echarts/lib/component/grid");
require("echarts/lib/component/dataZoom");
require("echarts/lib/chart/bar");
// let echarts = inject("echarts");
// import * as echarts from "echarts";
let tableData = [
  {
    title: "一月",
    num: 1827,
  },
  {
    title: "二月",
    num: 342,
  },
  {
    title: "三月",
    num: 541,
  },
  {
    title: "四月",
    num: 1347,
  },
  {
    title: "五月",
    num: 2431,
  },
  {
    title: "六月",
    num: 876,
  },
  {
    title: "七月",
    num: 1578,
  },
  {
    title: "八月",
    num: 223,
  },
  {
    title: "九月",
    num: 20,
  },
  {
    title: "十月",
    num: 0,
  },
  {
    title: "十一月",
    num: 0,
  },
  {
    title: "十二月",
    num: 0,
  },
];
let dataAxis = [];
let datas = [];
let option = null;

onMounted(() => {
  //#region
  for (let i of tableData) {
    dataAxis.push(i.title);
    datas.push(i.num);
  }
  option = {
    title: {
      text: "蟹堡王月销量",
      subtext: "九月份由于痞老板炸毁蟹堡王，修缮花费大量资金，生意惨淡",
    },
    xAxis: {
      data: dataAxis,
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      z: 10,
    },
    yAxis: {
      axisLabel: {
        color: "#999",
      },
    },
    dataZoom: [
      {
        type: "inside",
      },
    ],
    series: [
      {
        type: "bar",
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#90C86458" },
            { offset: 0.5, color: "#7CCD7C" },
            { offset: 1, color: "#548B54" },
          ]),
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#548B54" },
              { offset: 0.7, color: "#7CCD7C" },
              { offset: 1, color: "#90C86458" },
            ]),
          },
        },
        data: datas,
      },
    ],
  };
  // Enable data zoom when user click bar.
  var myChart = echarts.init(document.getElementById("main"));
  const zoomSize = 6;
  myChart.on("click", function (params) {
    // console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
    myChart.dispatchAction({
      type: "dataZoom",
      startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
      endValue:
        dataAxis[Math.min(params.dataIndex + zoomSize / 2, datas.length - 1)],
    });
    //#endregion
  });
  // 基于准备好的dom，初始化echarts实例
  option && myChart.setOption(option);
});
</script>

<style scoped></style>
