<template>
  <div class="item">
    <slot name="main"></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.item {
  height: 5.125rem;
  border: 1px solid rgba(208, 223, 231, 0.591);
  margin: 0.25rem;
  border-radius: 10px;
  // background-color: rgba(237, 237, 237, 0.7);
}
</style>
