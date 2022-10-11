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
  border: 1px solid gainsboro;
  margin: 0.25rem;
  background-color: rgba(237, 237, 237, 0.7);
}
</style>
