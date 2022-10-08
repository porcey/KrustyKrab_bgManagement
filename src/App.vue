<template>
  <!-- 路由入口 -->
  <router-view />
</template>
<script setup>
import * as echarts from "echarts";
import { provide } from "vue";
provide("echarts", echarts);
</script>
<style lang="scss"></style>
