<template>
  <div>
    <v-header>
      <div class="title" slot="title">首页</div>
      <div class="menuBtn" @click="menu" slot="left"></div>
    </v-header>
    <v-list></v-list>
    <v-topic></v-topic>
    <v-menu></v-menu>
    <v-writePosts></v-writePosts>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import Header from './header';
import Menu from './memu';
import List from './list';
import Topic from './topic';
import WritePosts from './writePosts';

export default {
  name: 'homePage',
  data() {
    return {
      msg: 'hello homePage'
    };
  },
  computed: {
    ...mapState(['showMenu'])
  },
  methods: {
    ...mapMutations(['changeState']),
    menu() {
      this.changeState({ showMenu: true });
    }
  },
  components: {
    'v-header': Header,
    'v-menu': Menu,
    'v-list': List,
    'v-topic': Topic,
    'v-writePosts': WritePosts
  }
};
</script>