<template>
  <div id="main" style="width: 100%; height: 100%; ,padding-top: 1rem"></div>
</template>

<script setup>
import { inject } from "@vue/runtime-core";
import apiUrl from "../../api/apiUrl.js";
import { onMounted } from "vue";
import link from "../../api/link.js";
import { reactive } from "@vue/reactivity";
let echarts = inject("echarts");

onMounted(() => {
  let xdata = []; // 底部标签名
  let ydata = []; // 每一类的值
  let xj = 123;
  link(apiUrl.chartDataOne).then((value) => {
    let { data } = value; // 解构赋值
    xdata = data.map((v) => v.title);
    ydata = data.map((v) => v.num);
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption({
      title: {
        text: "人数统计",
      },
      xAxis: {
        type: "value",
        // data: xdata,
      },
      yAxis: {
        type: "category",
        data: xdata,
      },
      series: [
        {
          type: "bar",
          data: ydata,
        },
      ],
    });
  });

  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById("main"));
});
</script>

<style scoped></style>
