<template>
  <div :class="['menuCon',showMenu?'show':'']" @click="remove">
    <div class="menu">
      <div class="avatarCon">
        <img src="../assets/images/headImg.jpg" alt="" width="80" class="avatar">
        <p class="avatarTips">点击头像登录</p>
      </div>
      <div>
        <ul>
          <li @click="changeType" type='good'>
            <p>精选</p>
          </li>
          <li @click="changeType" type='share'>
            <p>分享</p>
          </li>
          <li @click="changeType" type='ask'>
            <p>问答</p>
          </li>
          <li @click="changeType" type='job'>
            <p>招聘</p>
          </li>
          <li @click="changeType" type='dev'>
            <p>测试</p>
          </li>
          <li class="line"></li>
          <li>
            <p>设置</p>
          </li>
          <li>
            <p>关于</p>
          </li>
          <li class="line"></li>
          <li @click="showWrite">
            <p>写帖</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';

  export default {
    name: 'mymenu',
    data() {
      return {
        headimg: 'myMenu.headImg'
      };
    },
    computed: {
      ...mapState(['showMenu'])
    },
    methods: {
      ...mapMutations(['changeState']),
      remove() {
        this.changeState({ showMenu: false });
      },
      changeType(e) {
        // e.stopPropagation();
        this.changeState({ listType: e.target.type });
      },
      showWrite() {
        this.changeState({ showWrite: true });
      }
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .menuCon {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    background-color: rgba(0, 0, 0,0.6);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.5s;
  }
  .menuCon.show{
    opacity: 1;
    pointer-events: auto;
  }
  .menu {
    position: absolute;
    top: 0;
    left: 0;
    width: 90%;
    height: 100%;
    background-color: #fff;
    text-align: left;
    border-right: 1px solid #eee;
    transform: translate(-100%,0);
    transition: transform 0.5s;
  }
  .menuCon.show>.menu{
    transform: translate(0,0);
  }

  .avatarCon {
    height: 4rem;
    background-color: rgb(249,242,234);
    padding: 0.7rem 0 0 0.4rem;
  }

  .avatarTips {
    margin-top: 0.2rem;
    font-size: 0.3rem;
  }

  .avatar {
    border-radius: 1.7rem;
    width: 1.7rem;
    height: 1.7rem;
    border: 0.1rem white solid;
    background-size: contain;
  }
  li p {
    display: block;
    margin: 0 5%;
    padding: 12px 0;
    pointer-events: none;
    border-bottom: 1px rgb(235,234,231) solid;
  }

  a {
    color: #42b983;
  }

  li.line {
    border-bottom: 0.2rem solid rgb(235, 236, 231);
    padding: 0;
  }
</style>
