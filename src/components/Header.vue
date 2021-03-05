<template>
  <div class="header">{{title}}</div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style scoped>
  .header {
    position: fixed;
    z-index: 99;
    left: 0;
    top: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #333;
    color: #fff;
  }
</style>
