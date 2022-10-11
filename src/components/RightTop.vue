<template>
  <div class="notice">
    本月痞老板偷袭 3 次，成功 0 次，造成损失攻击$253。
    <img src="../assets/Sheldon.png" alt="" />
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "vue";
</script>
<style scoped>
.notice {
  position: relative;
  font-size: 20px;
  text-align: center;
  line-height: 60px;
}
img {
  position: absolute;
  width: 50px;
  height: 50px;
  top: 0;
  left: 20%;
}
</style>
