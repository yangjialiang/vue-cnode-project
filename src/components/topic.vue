<template>
  <transition name="topic">
    <div id="Topic" class="page" v-show="topicId">
      <v-header>
        <div class="title" slot="title">文章详情页</div>
        <div class="comeBackBtn" slot="left" @click="comeBack"></div>
      </v-header>
      <div class="TopicCon">
        <div class="markdown-text" v-html="compiledMarkdown"></div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import marked from 'marked';
import Header from './header';
import { getInfo } from '../common/axiosUtil';

export default {
  name: 'Topic',
  data() {
    return {
      content: ''
    };
  },
  computed: {
    ...mapState(['topicId']),
    compiledMarkdown() {
      return marked(this.content, { sanitize: true });
    }
  },
  methods: {
    ...mapMutations(['changeState']),
    comeBack() {
      this.changeState({ 'topicId': '' });
    }
  },
  components: { 'v-header': Header },
  watch: {
    topicId(newVal) {
      this.content = '';
      if (newVal) {
        const url = `https://cnodejs.org/api/v1//topic/${newVal}`;
        getInfo(
          url,
          {
            mdrender: false
          },
          (data) => {
            this.content = data.data.content;
            console.log(data.data.content);
          }
        );
      }
    }
  }
};
</script>
<style scoped>
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
.TopicCon {
  width: 100%;
  position: absolute;
  top: 1rem;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
.topic-enter-active,
.topic-leave-active {
  transform: translate3d(0, 0, 0);
  transition: transform 0.5s, opacity 0.5s;
}
.topic-enter,
.topic-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>



