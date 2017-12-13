<template>
  <div id="Header">
    <slot name="title"></slot>
    <slot name="left"></slot>
    <slot name="right"></slot>
  </div>
</template>

<script>

export default {
  name: 'Header',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  },
};
</script>

<style scoped>
#Header {
  width: 100%;
  height: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  background: rgb(131, 153, 169);
  font-family: " 微软雅黑";
  color: white;
}
.title {
  width: 50%;
  height: 100%;
  margin: 0 25%;
  line-height: 1rem;
  text-align: center;
  font-size: 0.4rem;
}
</style>
