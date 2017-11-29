<template>
  <div :class="['menuCon iconfont',showMenu?'show':'']" @click="closeMenu">
    <div class="menu">
      <div class="avatarCon">
        <img :src="userHeadImg" alt="" width="80" class="avatar" @click="login">
        <p class="avatarTips" v-text="userNameText"></p>
        <!-- <span>注销</span> -->
      </div>
      <div>
        <ul>
          <li @click="changeType" type='good'>
            <p class="good">精选</p>
          </li>
          <li @click="changeType" type='share'>
            <p class="share">分享</p>
          </li>
          <li @click="changeType" type='ask'>
            <p class="ask">问答</p>
          </li>
          <li @click="changeType" type='job'>
            <p class="job">招聘</p>
          </li>
          <li @click="changeType" type='dev'>
            <p class="dev">测试</p>
          </li>
          <li class="line"></li>
          <!-- <li>
            <p class="set">设置</p>
          </li> -->
          <li @click="collect">
            <p class="collect">我的收藏</p>
          </li>
          <li class="line"></li>
          <li @click="writePosts">           
            <p class="writePosts">写帖</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import headerImg from '../assets/images/headImg.jpg';

  export default {
    name: 'mymenu',
    data() {
      return {
      };
    },
    computed: {
      ...mapState(['userName', 'userImg', 'accesstoken']),
      userHeadImg() {
        return this.userImg || headerImg;
      },
      userNameText() {
        return this.userName || '点击头像登录';
      }
    },
    methods: {
      ...mapMutations(['changeState']),
      changeType(e) {
        // e.stopPropagation();
        this.changeState({ listType: e.target.type });
      },
      login() {
        if (!this.accesstoken) {
          this.$router.push('/homepage/login');
        } else {
          this.$router.push('/homepage/userinfo');
        }
      },
      writePosts() {
        this.$router.push('/homepage/writePosts');
        if (!this.accesstoken) {
          this.$router.push('/homepage/login');
        }
      },
      collect() {
        // this.$router.push(`/homepage/collect/${this.userName}`);
        if (!this.accesstoken) {
          this.$router.push('/homepage/login');
        } else {
          this.$emit('changeView', { 'showCollect': true });
        }
      }
    },
    props: ['showMenu', 'closeMenu']
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
    width: 1.9rem;
    text-align: center;
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
    padding: 0.28rem 0;
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
  .good:before{
    content: "\e870";
    margin-right: 0.05rem;
  }
  .share:before{
    content: "\e86e";
    margin-right: 0.05rem;
  }
  .ask:before{
    content: "\e626";
    margin-right: 0.05rem;
  }
  .job:before{
    content: "\e629";
    margin-right: 0.05rem;
  }
  .dev:before{
    content: "\e628";
    margin-right: 0.05rem;
  }
  .set:before{
    content: "\e64b";
    margin-right: 0.05rem;
  }
  .collect:before{
    content: "\e86d";
    margin-right: 0.05rem;
  }
  .writePosts:before{
    content: "\e641";
    margin-right: 0.05rem;
  }
  @media only screen and (max-height: 500px) {
    .avatarCon {
      height: 3rem;
    }
  }
</style>

