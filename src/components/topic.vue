<template>
    <div id="Topic" class="page" :key="topicId">
      <v-header class="header">
        <div class="title" slot="title">文章详情页</div>
        <div class="comeBackBtn" slot="left" @click="comeBack"></div>
        <div slot="right" class="iconfont collectBtn" @click="collect">
          <span v-if="is_collect">&#xe668;</span>
          <span v-else style="color:white">&#xe669;</span>
        </div>
      </v-header>
      <div class="TopicScrollCon">
        <div class="TopicCon">
          <h1 v-text="title"></h1>
          <div v-html="content"></div>
        </div>
        <div class="repliesCon" v-show='content'>
          <div class="repliesHead">
            <p class="columnHead">评论：</p>
          </div>
          <div class="repliesList" v-for="(item,index) in replies">
            <div class="authorHead" :style="{backgroundImage: 'url('+item.author.avatar_url+')'}"></div>
            <div class="repliesTextCon">
              <div class="authorName" >{{item.author.loginname}}<span class="iconfont" @click="showCommentView('commentOtherCon'+index)">&#xe718;{{index+1}}楼</span><span :class="['iconfont',item.is_uped?'active':'']" @click="ups({replyId:item.id})" v-html="'&#xe870; '+item.ups.length"></span></div>
              <div v-html="item.content"></div>
              <div class="commentOtherCon" :ref="'commentOtherCon'+index">
                <input type="text" class="commentOtherInput" :value="'@'+item.author.loginname" :ref="'repliesText'+index">
                <div @click="submit({id:item.id,refId:'repliesText'+index})" class="commentOtherSubmit">提交</div>
              </div>
            </div>
          </div>
          <div class="commentEndTips" v-if="replies.length!=0">到底了哦 ^_^ </div>
          <div class="commentTips" v-else @click="comment"></div>
        </div>
      </div>
      <div class="commentInput">
				<input type="text" name="comment" id="comment" ref="comment" @submit="submit" @focus="islogin" v-model="commentText" placeholder="点击参与评论吧..." />
        <div class="submitBtn" @click="submit">提交</div>
			</div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import Header from './header';
import { getInfo, postInfo } from '../common/axiosUtil';

export default {
  name: 'Topic',
  data() {
    return {
      content: '',
      title: '',
      topicId: '',
      is_collect: false,
      replies: [],
      commentText: '',
    };
  },
  computed: {
    ...mapState(['accesstoken'])
  },
  methods: {
    comeBack() {
      if (history.length === 1) {
        this.$router.push('/');
      } else {
        history.go(-1);
      }
    },
    showCommentView(value) {
      this.$refs[value][0].style.display = 'block';
    },
    ups(info) {
      const { replyId } = info;
      const url = `https://cnodejs.org/api/v1/reply/${replyId}/ups`;
      postInfo(
        url,
        {
          accesstoken: this.accesstoken
        },
        (data) => {
          if (data.success) {
            console.log(data);
            this.commentUpdata();
          } else {
            alert('不能为自己点赞哦^_^');
          }
        }
      );
    },
    topicInit() {
      this.topicId = this.$route.params.topicId;
      this.content = '';
      this.is_collect = false;
      this.title = '';
      const url = `https://cnodejs.org/api/v1/topic/${this.topicId}`;
      getInfo(
        url,
        {
          mdrender: true,
          accesstoken: this.accesstoken
        },
        (data) => {
          this.content = `${data.data.content}`;
          this.replies = data.data.replies;
          this.is_collect = data.data.is_collect;
          if (!this.content.includes('h1')) {
            this.title = `${data.data.title}`;
          }
        }
      );
    },
    commentUpdata() {
      this.topicId = this.$route.params.topicId;
      const url = `https://cnodejs.org/api/v1/topic/${this.topicId}`;
      getInfo(
        url,
        {
          mdrender: true,
          accesstoken: this.accesstoken
        },
        (data) => {
          this.replies = data.data.replies;
          console.log(data.data.replies);
        }
      );
    },
    collect() {
      if (this.accesstoken) {
        let url;
        if (this.is_collect) {
          url = 'https://cnodejs.org/api/v1/topic_collect/de_collect';
        } else {
          url = 'https://cnodejs.org/api/v1/topic_collect/collect';
        }
        postInfo(
          url,
          {
            accesstoken: this.accesstoken,
            topic_id: this.topicId
          },
          (data) => {
            if (data.success) {
              this.is_collect = !this.is_collect;
            }
          }
        );
      } else {
        this.$router.push('/homepage/login');
      }
    },
    comment() {
      this.$refs.comment.focus();
    },
    islogin() {
      if (!this.accesstoken) {
        this.$router.push('/homepage/login');
      }
    },
    submit(info) {
      const { id, refId } = info;
      let text;
      if (refId) {
        text = this.$refs[refId][0].value;
      }
      if (this.commentText.trim().length === 0 && text.trim().length === 0) {
        alert('评论内容不能为空^_^');
      } else {
        const url = `https://cnodejs.org/api/v1/topic/${this.$route.params.topicId}/replies`;
        postInfo(
          url,
          {
            accesstoken: this.accesstoken,
            content: text || this.commentText,
            reply_id: id,
          },
          (data) => {
            if (data.success) {
              alert('评论提交成功^_^');
              this.commentUpdata();
              this.commentText = '';
            }
          }
        );
      }
    },
  },
  created() {
    this.topicInit();
  },
  components: { 'v-header': Header },
};
</script>
<style scoped>
.iconfont.active{
  color: red;
}
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
.TopicScrollCon {
  width: 100%;
  position: absolute;
  top: 1rem;
  left: 0;
  right: 0;
  bottom: 0.98rem;
  overflow-x: hidden;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
.TopicCon {
  width: 100%;
}
.TopicCon > h1,
.TopicCon > hr {
  width: 90%;
  margin: 0 auto;
  overflow: hidden;
}
.TopicCon > h1 {
  font-family: "Microsoft Yahei", Helvetica, arial, sans-serif;
  padding: 0;
  font-weight: bold;
  text-align: left;
  -webkit-print-color-adjust: exact;
  font-size: 28px;
  color: #2b3f52;
}
.collectBtn {
  width: 1rem;
  height: 1rem;
  position: absolute;
  top: 0;
  right: 0;
  text-align: center;
  line-height: 1rem;
  font-size: 0.5rem;
  color: #f34f4f;
}
.repliesCon {
  width: 90%;
  margin-left: 5%;
  background-color: rgb(244, 252, 240);
  overflow: hidden;
}
.repliesHead {
  height: 0.78rem;
  display: flex;
  align-items: center;
  border-left: 3px solid orange;
  background-color: rgb(240, 231, 225);
}
.columnHead {
  margin-left: 0.2rem;
}
.repliesList {
  width: 100%;
  height: auto;
  border-radius: 0.05rem;
  overflow: hidden;
  margin-top: 0.2rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid rgba(240, 240, 240, 1);
}
.repliesInfo {
  width: 1rem;
}
.authorHead {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 0.8rem;
  background-size: cover;
  margin: 0.1rem;
  float: left;
}
.repliesTextCon {
  width: 5.5rem;
  float: left;
}
.authorName {
  margin-top: 0.1rem;
  text-align: left;
  margin-bottom: 0.2rem;
}
.authorName > span {
  margin-right: 0.2rem;
  color: rgb(220, 220, 240);
  float: right;
}
.commentEndTips {
  height: 0.8rem;
  line-height: 0.8rem;
}
.commentTips {
  width: 100%;
  height: 2.54rem;
  background: white url(../assets/images/commentTips.jpg) no-repeat;
  background-size: contain;
  background-position: center center;
}
.commentOtherCon{
  width: 100%; 
  margin: 0.2rem 0 0 0;
  font-size: 0.28rem;
  color: #999999;
  background: white;
  display: none;
}
.commentOtherInput{
  width: 85%;
  border: none;
  padding: 0;
  color: #999999;
}
.commentOtherSubmit{
  width: 15%;
  border: none;
  padding: 0;
  color: #999999;
  float: right;
}
.commentInput {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.98rem;
}
.commentInput:before {
  width: 100%;
  height: 0.14rem;
  background: -webkit-gradient(
    linear,
    0 0,
    0 bottom,
    from(rgba(246, 246, 246, 0)),
    to(rgba(246, 246, 246, 0.8))
  );
  content: " ";
  display: block;
}
.commentInput > input {
  width: 6.67rem;
  height: 0.84rem;
  border: none;
  margin: 0;
  padding: 0;
  font-size: 0.28rem;
  color: #999999;
  text-indent: 1em;
  float: left;
}
.submitBtn{
  width: 0.84rem;
  height: 0.84rem;
  position: absolute;
  bottom: 0;
  right: 0;
  line-height: 0.84rem;
  text-align: center;
  background: white;
}
</style>



