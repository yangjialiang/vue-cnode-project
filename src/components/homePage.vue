<template>
  <div>
    <v-header>
      <div class="title" slot="title">首页</div>
      <div class="menuBtn" @click="menu" slot="left"></div>
    </v-header>
    <v-list></v-list>
    <v-menu :showMenu = "showMenu" :closeMenu = "remove"></v-menu>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import Header from './header';
import Menu from './memu';
import List from './list';
import { postInfo } from '../common/axiosUtil';

export default {
  name: 'homePage',
  data() {
    return {
      showMenu: false,
    };
  },
  computed: {
    ...mapState(['accesstoken']),
  },
  created() {
    if (this.accesstoken) {
      const url = 'https://cnodejs.org/api/v1/accesstoken';
      postInfo(url, { accesstoken: this.accesstoken }, (data) => {
        if (data.success) {
          const userInfo = {
            userName: data.loginname,
            userImg: data.avatar_url,
            userId: data.id,
          };
          this.changeState(userInfo);
        } else {
          const userInfo = {
            userName: '',
            userImg: '',
            userId: '',
            accesstoken: '',
          };
          this.changeState(userInfo);
        }
      });
    }
  },
  methods: {
    ...mapMutations(['changeState']),
    remove() {
      this.showMenu = false;
    },
    menu() {
      this.showMenu = true;
    }
  },
  watch: {
    accesstoken(newVal) {
      console.log(newVal);
    }
  },
  components: {
    'v-header': Header,
    'v-menu': Menu,
    'v-list': List
  }
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transform: translate3d(0, 0, 0);
  transition: transform 0.5s, opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
