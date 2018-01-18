<template>
  <div class="loginPage page">
    <v-header class="header">
      <div class="title" slot="title">登录</div>
      <div class="comeBackBtn" slot="left" @click="comeBack"></div>
    </v-header>
    <input type="text" name="accesstoken" id="accesstokenText" v-model="accesstokenText" placeholder="accesstoken:">
    <div class="keepMessageCon" @click="isKeep">
      <div id="keepMessage" :class="keep?'active':''"></div>
      <span>下次自动登录</span>
    </div>
    <div :class="['loginBtn',canLogin?'active':'']" @click="login">登录</div>
  </div>
</template>
<script>
  import { mapMutations } from 'vuex';
  import Header from './header';
  import { postInfo } from '../common/axiosUtil';

  export default {
    name: 'loginPage',
    data() {
      return {
        keep: false,
        accesstokenText: '',
        canLogin: false,
      };
    },
    methods: {
      ...mapMutations(['changeState']),
      comeBack() {
        if (history.length === 1) {
          this.$router.push('/');
        } else {
          console.log(location.href);
          history.go(-1);
        }
      },
      isKeep() {
        this.keep = !this.keep;
      },
      login() {
        if (!this.canLogin) {
          return;
        }
        const url = 'https://cnodejs.org/api/v1/accesstoken';
        postInfo(url, { accesstoken: this.accesstokenText }, (data) => {
          if (data.success) {
            const userInfo = {
              userName: data.loginname,
              userImg: data.avatar_url,
              userId: data.id,
              accesstoken: this.accesstokenText,
            };
            if (this.keep) {
              window.localStorage.setItem('accesstoken', this.accesstokenText);
            } else {
              window.localStorage.setItem('accesstoken', '');
            }
            this.changeState(userInfo);
            if (location.href.includes('homepage/writePosts/login')) {
              this.$router.replace('/homepage/writePosts');
            } else {
              history.go(-1);
            }
          } else {
            alert(data.error_msg);
          }
        });
      }
    },
    components: {
      'v-header': Header,
    },
    watch: {
      accesstokenText(newVal) {
        if (newVal.length > 0) {
          this.canLogin = true;
        } else {
          this.canLogin = false;
        }
      }
    }
  };

</script>
<style scoped>
  .header {
    z-index: 1;
  }
  .comeBackBtn {
    width: 1rem;
    height: 1rem;
    background: url("../assets/images/comeBackBtn.png") no-repeat;
    background-size: 0.4rem 0.4rem;
    background-position: center;
    position: absolute;
    top: 0;
    left: 0;
  }
  #accesstokenText {
    width: 90%;
    display: block;
    margin: 2rem 5% 0;
    padding: 12px 0;
    font-size: .3rem;
    background: none;
    border: none;
    border-radius: 0;
    text-indent: 0.2rem;
    border-bottom: 1px rgb(235,234,231) solid;
  }
  .keepMessageCon {
    width: 40%;
    height: auto;
    overflow: hidden;
    margin: .5rem 0 0 5%;   
    display: flex;
    align-items:center;
  }
  #keepMessage {
    width: 0.3rem;
    height: 0.3rem;
    border: 3px solid gray;
  }
  #keepMessage.active {
    background: rgb(12, 253, 0);
  }
  .keepMessageCon>span {
    margin: auto 0.2rem;
    height: 100%;
  }
  .loginBtn {
    width: 90%;
    height: 0.8rem;
    background: gray;
    margin: .5rem 5% 0;
    line-height: 0.8rem;
    font-size: 0.3rem;
    color: white;
    border-radius: 0.8rem;
  }
  .loginBtn.active{
    background: green;
  }
</style>

