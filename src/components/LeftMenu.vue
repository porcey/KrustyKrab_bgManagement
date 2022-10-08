<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    default-active="2"
    text-color="#fff"
    @select="handleSelect"
  >
    <template v-for="item in dynamicRoute" :key="item.path">
      <!-- 带下拉的菜单项 -->
      <el-sub-menu v-if="item.children" :index="item.path">
        <template #title>
          <el-icon><component :is="item.meta.icon"></component></el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <!-- 下拉子项 -->
        <el-menu-item-group v-for="child in item.children" :key="child.path"
          ><el-menu-item :index="child.path">
            <el-icon><component :is="child.meta.icon"></component></el-icon>
            <span>{{ child.meta.title }}</span>
          </el-menu-item></el-menu-item-group
        >
      </el-sub-menu>
      <!-- 无下拉的菜单项 -->
      <el-menu-item :index="item.path" v-else>
        <el-icon><component :is="item.meta.icon"></component></el-icon>
        <span>{{ item.meta.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import {
  Wallet,
  Files,
  RefreshRight,
  User,
  PieChart,
} from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
const router = useRouter();
// 动态路由：用于遍历生成左侧菜单项的数据
const dynamicRoute = router.options.routes[0].children;
const handleSelect = (key: string, keyPath: string[]) => {
  // 选中后跳转到对应的路由页面
  router.push(key);
};
</script>

<style></style>
