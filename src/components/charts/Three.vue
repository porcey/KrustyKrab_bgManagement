<template>
  <div>
    <div id="mainThree" style="width: 100%; height: 320px"></div>
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
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "40",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: 892,
            name: "蟹黄堡",
          },
          {
            value: 123,
            name: "海带圈",
          },
          {
            value: 324,
            name: "香炸珊瑚(中号)",
          },
          {
            value: 89,
            name: "健怡可乐(中杯)",
          },
          {
            value: 453,
            name: "美味热狗",
          },
          {
            value: 662,
            name: "双层蟹黄堡",
          },
        ],
      },
    ],
  };
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById("mainThree"));

  // console.log("配置项!：", option);
  option && myChart.setOption(option);
});
</script>

<style></style>
