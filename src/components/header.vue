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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#Header {
  width: 100%;
  height: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  background: rgb(14, 227, 179);
  font-family: " 微软雅黑";
  color: white;
  z-index: 1;
}
.title {
  width: 50%;
  height: 100%;
  margin: 0 25%;
  line-height: 1rem;
  text-align: center;
  font-size: 0.4rem;
}
.menuBtn {
  width: 0.6rem;
  height: 0.6rem;
  background: url("../assets/images/menuIcon.png") no-repeat;
  background-size: contain;
  position: absolute;
  top: 0.2rem;
  left: 0.2rem;
}
</style>
