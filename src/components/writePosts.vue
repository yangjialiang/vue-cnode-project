<template>
    <div class="writePosts page">
      <v-header>
        <div class="title" slot="title">发送主题</div>
        <div id="comeBack" slot="left" @click="comeBack">取消</div>
        <div id="sendBtn" slot="right" @click="sendMessage">发表</div>
      </v-header>
      <div>
        <div class="selectCon">
          选择版块：
          <select v-model="tab">
            <option value="share">分享</option>
            <option value ="ask">问答</option>
            <option value="job">招聘</option>
            <option value ="dev">测试</option>
          </select>
        </div>
        <div class="postsTitleCon">
          <div>主题：</div><input id="postsTitle" placeholder="请输入标题" type="text" v-model="poststitle">
        </div>
        <div class="postsTextCon">
          <div>内容：</div>
          <div id="postsText" v-show="showMarkdown">
            <div class="markdown-text" v-html="compiledMarkdown"></div>
          </div>
          <textarea id="postsTextInput" v-show="!showMarkdown" v-model="poststext" placeholder="支持Markdown格式"></textarea>
        </div>
        <div class="seeBtn" @click="seeMarkdown">预览</div>
      </div>       
    </div>
</template>

<script>
  import marked from 'marked';
  import { mapState } from 'vuex';
  import Header from './header';
  import { postInfo } from '../common/axiosUtil';

  export default {
    name: 'writePosts',
    data() {
      return {
        poststitle: '',
        poststext: '',
        showMarkdown: false,
        tab: 'share'
      };
    },
    computed: {
      ...mapState(['accesstoken']),
      compiledMarkdown() {
        return marked(this.poststext, { sanitize: true });
      }
    },
    methods: {
      sendMessage() {
        if (this.poststext.trim().length > 0 && this.poststitle.trim().length > 0) {
          postInfo(
            'https://cnodejs.org/api/v1/topics?', {
              accesstoken: this.accesstoken,
              title: this.poststitle,
              tab: this.tab,
              content: this.poststext,
            }, (data) => {
              if (data.success) {
                console.log(data);
                alert('发布成功');
                history.go(-1);
              } else {
                alert(data.error_msg);
                if (data.error_msg.includes('accessToken')) {
                  this.$router.push('/homepage/login');
                }
              }
            }
          );
        } else if (!this.poststitle.trim().length > 0) {
          alert('标题不能为空哦^_^');
        } else if (!this.poststext.tthis.poststitlerim().length > 0) {
          alert('内容不难为空哦^_^');
        }
      },
      comeBack() {
        if (history.length === 1) {
          this.$router.push('/');
        } else {
          history.go(-1);
        }
      },
      writePostsText() {
        this.$refs.PostsText.focus();
      },
      seeMarkdown() {
        this.showMarkdown = !this.showMarkdown;
      }
    },
    components: {
      'v-header': Header
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .selectCon{    
    width: 90%;
    text-align: left;
    font-size: 0.5rem;
    margin: 1.5rem 5% 0;
  }
  .selectCon>select{
    font-size: 0.5rem;
    width: 50%;
    border: none;
  }
  .postsTitleCon{
    width: 90%;
    margin: 0.2rem 5% 0;
    text-align: left;
    font-size: 0.5rem;
  }
  .postsTextCon{
    width: 90%;
    margin: .5rem 5% 0;
    text-align: left;
    font-size: 0.5rem;
    overflow: hidden;
  }
  .postsTitleCon>div{
    float: left;
  }
  #postsTitle{
    width: 70%;
    height: 0.58rem;
    border: 0;
    margin: 0;
    padding: 0;
    border-radius:0; 
    font-size: 0.46rem;
    border-bottom: 1px dashed black;
    outline:none;
    display: block;
  }
  #postsText{
    width: 100%;
    height: 7rem;
    background: rgba(255, 255, 255, 1);
    border: none;
    overflow: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
  #postsTextInput{
    display: block;
    outline:none;
    resize: none;
    word-wrap:break-word;
    width: 100%;
    height: 7rem;
    background: rgba(255, 255, 255, 1);
    border: 0;
    margin: 0;
    padding: 0;
    border-radius:0; 
  }
  #comeBack,#sendBtn{
    position: absolute;
    top: 0;
    width: 1rem;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
  }
  #sendBtn{
    right: 0;
  }
  #comeBack{
    left: 0;
  } 
  .seeBtn{
    width: 1.2rem;
    height: 0.6rem;
    line-height: 0.6rem;
    margin: 0.5rem;
    background: rgb(14, 227, 179);
    border-radius: 0.1rem;
  }
</style>
