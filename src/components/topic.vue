<template>
  <transition name="topic">
    <div id="Topic" class="page" :id="topicId">
      <v-header>
        <div class="title" slot="title">文章详情页</div>
        <div class="comeBackBtn" slot="left" @click="comeBack"></div>
      </v-header>
      <div class="TopicCon">
        <h1 v-text="title"></h1>
        <!-- <hr> -->
        <div v-html="content"></div>
      </div>
    </div>
  </transition>
</template>
<script>
import Header from './header';
import { getInfo } from '../common/axiosUtil';

export default {
  name: 'Topic',
  data() {
    return {
      content: '',
      title: '',
      topicId: '',
    };
  },
  methods: {
    comeBack() {
      history.go(-1);
    }
  },
  beforeCreate() {
    this.topicId = this.$route.params.topicId;
    this.content = '';
    this.title = '';
    const url = `https://cnodejs.org/api/v1//topic/${this.topicId}`;
    getInfo(
      url,
      {
        mdrender: true
      },
      (data) => {
        this.content = `${data.data.content}`;
        if (!this.content.includes('h1')) {
          this.title = `${data.data.title}`;
        }
        console.log(data.data);
      }
    );
  },
  components: { 'v-header': Header },
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
.TopicCon>h1,.TopicCon>hr{
  width: 90%;
  margin: 0 auto;
  overflow: hidden;
}
.TopicCon>h1{
    font-family: "Microsoft Yahei", Helvetica, arial, sans-serif;
    padding: 0;
    font-weight: bold;
    text-align: left;
    -webkit-print-color-adjust: exact;
    font-size: 28px;
    color: #2b3f52;
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



