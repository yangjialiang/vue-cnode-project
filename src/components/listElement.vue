<template>
    <li class="list" @click="showTopic">
      <div class="authorHead" :style="{backgroundImage: 'url('+listInfo.author.avatar_url+')'}"></div>
      <div class='title'>{{ listInfo.title }}</div>
        <div class='tab'>
          <div :class="['listTypeName',listInfo.top | listInfo.good?'good':'']" v-text="listTypeText"></div>
          <div class='authorName'>{{listInfo.author.loginname}}</div>
          <div class='replyTime'>{{getTime(listInfo.last_reply_at)}}</div>
        </div>
    </li>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'listElement',
  data() {
    return {
    };
  },
  computed: {
    listTypeText() {
      let text = '';
      if (this.listInfo.good) {
        text = '精华';
      } else if (this.listInfo.top) {
        text = '置顶';
      } else {
        switch (this.listInfo.tab) {
          case 'share':
            text = '分享';
            break;
          case 'ask':
            text = '问答';
            break;
          case 'job':
            text = '招聘';
            break;
          case 'good':
            text = '精选';
            break;
          default:
            text = '测试';
            break;
        }
      }
      return text;
    }
  },
  methods: {
    ...mapMutations(['changeState']),
    showTopic() {
      this.changeState({ 'topicId': this.listInfo.id });
    },
    getTime: (_time) => {
      const nowTime = new Date();
      const createTime = new Date(_time);
      const num = (nowTime - createTime) / (1000 * 3600 * 24);
      let timeStr;
      if (num < 1) {
        if (num * 24 < 1) {
          timeStr = parseInt(num * 24 * 60, 10);
          timeStr += '分钟前';
        } else {
          timeStr = parseInt(num * 24, 10);
          timeStr += '小时前';
        }
      } else {
        timeStr = parseInt(num, 10);
        timeStr += '天前';
      }
      return timeStr;
    },
  },
  props: ['listInfo']
};
</script>

<style scoped>
.list {
    width: 100%;
    height: 1.38rem;
    border-bottom: 0.02rem solid rgba(222, 222, 222, 0.8);
    overflow: hidden;
  }

  .title {
    margin-top: 0.28rem;
    text-align: left;
    font-size: 0.3rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 0 0.2rem 0 0;
    color: #444;
  }

  .tab {
    margin-top: 0.07rem;
    padding: 0 0.3rem;
    position: relative;
  }

  .listTypeName {
    border-radius: 0.02rem;
    padding:0.02rem 0.05rem;
    font-size: 0.23rem;
    float: left;
    /* color: rgb(151,151,151); */
    color: #fff;
    background-color: #fc4f1e;
    /* background-color: rgb(225,225,225); */
  }
  .listTypeName.good {
    color: white;
    background-color: rgb(127,188,9);
  }

  .authorName {
    padding: 0.05rem;
    font-size: 0.23rem;
    float: left;
    margin-left: 0.08rem;
    color: #269f3f;
  }
.authorHead {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 0.8rem;
    float: left;
    background-size: cover;
    margin: 0.28rem 0.2rem;
  }
  .replyTime {
    height: 0.37rem;
    line-height: 0.37rem;
    font-size: 0.23rem;
    float: right;
    margin-right: 0.2rem;
    color: rgb(103, 103, 103);
  }
</style>
