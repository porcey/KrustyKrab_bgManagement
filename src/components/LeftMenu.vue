<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#6D875758"
    default-active="2"
    text-color="#fff"
    @select="handleSelect"
  >
    <img src="../assets/money.png" alt="" />
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

<script>
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
  Burger,
  Money,
} from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { onMounted, reactive, shallowRef, toRaw } from "vue";
import { useStore } from "vuex";

export default {
  components: {
    Wallet: shallowRef(Wallet),
    Files: shallowRef(Files),
    RefreshRight: shallowRef(RefreshRight),
    User: shallowRef(User),
    PieChart: shallowRef(PieChart),
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    let dynamicRoute = router.options.routes[0].children;
    const handleSelect = (key, keyPath) => {
      // 选中后跳转到对应的路由页面
      router.push(key);
    };
    onMounted(() => {
      console.log("我是主角：", dynamicRoute);
    });
    return {
      dynamicRoute,
      handleSelect,
    };
  },
};
</script>

<style scoped>
.el-menu {
  border: transparent;
}
img {
  position: absolute;
  top: 250px;
  left: 50px;
  width: 100px;
  transform: rotate(-45deg);
}
</style>
