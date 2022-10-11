<template>
  <div class="container">
    <div class="left">
      <IP style="padding-top: 0.375rem">
        <template #main>
          <One />
        </template>
      </IP>
      <IP style="padding-top: 0.375rem"
        ><template #main> <Two /> </template
      ></IP>
    </div>
    <div class="right">
      <IP style="padding-top: 0.375rem">
        <template #main>
          <Three />
        </template>
      </IP>
      <IP style="padding-top: 0.375rem">
        <template #main>
          <Four />
        </template>
      </IP>
    </div>
  </div>
</template>

<script setup>
import IP from "./ItemPage.vue";
import One from "../../../components/charts/One.vue";
import Two from "../../../components/charts/Two.vue";
import Three from "../../../components/charts/Three.vue";
import Four from "../../../components/charts/Four.vue";
</script>

<style lang="scss">
.container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  // background-color: pink;
  display: flex;
  .left,
  .right {
    flex: 1;
  }
  .left {
    // background-color: olivedrab;
  }
  .right {
    // background-color: wheat;
  }
}
</style>
