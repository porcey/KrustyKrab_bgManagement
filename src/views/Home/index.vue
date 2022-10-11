<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px"><LeftMenu /></el-aside>
      <el-container>
        <el-header><RightTop /></el-header>
        <el-main>
          <!-- 路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import LeftMenu from "../../components/LeftMenu.vue";
import RightTop from "../../components/RightTop.vue";
</script>

<style lang="scss">
.common-layout,
.el-container {
  height: 100%;
}
.el-aside {
  background-color: rgb(109, 135, 87);
}
.el-header {
  background-color: white;
}
.el-main {
  background-color: #f5f8fe;
}
</style>
