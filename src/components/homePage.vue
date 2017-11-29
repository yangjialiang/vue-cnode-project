<template>
  <div>
    <v-header>
      <div class="title" slot="title">首页</div>
      <div class="menuBtn" @click="menu" slot="left"></div>
    </v-header>
    <v-list></v-list>
    <v-menu :showMenu = "showMenu" @changeView = "changeView" :closeMenu = "remove"></v-menu>
    <v-collect @changeView = "changeView" v-if="showCollect"></v-collect>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import Header from './header';
import Menu from './memu';
import Collect from './collect';
import List from './list';

export default {
  name: 'homePage',
  data() {
    return {
      showMenu: false,
      showCollect: false,
    };
  },
  computed: {
    ...mapState(['accesstoken']),
  },
  beforeCreate() {
    console.log(this.$store.state.accesstoken);
  },
  created() {
    this.login();
  },
  methods: {
    ...mapMutations(['changeState', 'login']),
    remove() {
      this.showMenu = false;
    },
    menu() {
      this.showMenu = true;
    },
    changeView(data) {
      Object.assign(this, data);
    }
  },
  watch: {
    accesstoken() {
      this.login();
    }
  },
  components: {
    'v-header': Header,
    'v-menu': Menu,
    'v-list': List,
    'v-collect': Collect
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
