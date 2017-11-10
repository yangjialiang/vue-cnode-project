<template>
  <transition name="writePosts">
    <div class="writePosts page" v-show="showWrite">
      <v-header>
        <div class="title" slot="title">发送主题</div>
        <div id="comeBack" slot="left" @click="comeBack">取消</div>
        <div id="sendBtn" slot="right" @click="sendMessage">发表</div>
      </v-header>
      <div>
        <div class="postsTitleCon">
          <div>主题：</div><input id="postsTitle" placeholder="请输入标题" type="text" v-model="poststitle">
        </div>
        <div class="postsTextCon">
          <div>内容：</div>
          <div id="postsText" v-show="showMarkdown">
            <div class="markdown-text" v-html="compiledMarkdown"></div>
          </div>
          <textarea id="postsTextInput" v-show="!showMarkdown" v-model="poststext"></textarea>
        </div>
        <div class="seeBtn" @click="seeMarkdown">预览</div>
      </div>       
    </div>
  </transition>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import marked from 'marked';
  import Header from './header';
  import { postInfo } from '../common/axiosUtil';

  export default {
    name: 'writePosts',
    data() {
      return {
        poststitle: '',
        poststext: '',
        showMarkdown: false
      };
    },
    computed: {
      ...mapState(['showWrite']),
      compiledMarkdown() {
        return marked(this.poststext, { sanitize: true });
      }
    },
    methods: {
      ...mapMutations(['changeState']),
      sendMessage() {
        if (this.poststext.trim().length > 0 && this.poststitle.trim().length > 0) {
          postInfo(
            'https://cnodejs.org/api/v1/topics?', {
              accesstoken: 'c3337ce2-49b6-4e25-a081-e03f0510cd9c',
              title: this.poststitle,
              tab: 'dev',
              content: this.poststext,
            }, (data) => {
              if (data.success) {
                console.log(data);
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
        this.changeState({ 'showWrite': false });
      },
      writePostsText() {
        this.$refs.PostsText.focus();
        console.log(this.$refs.PostsText);
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
  .postsTitleCon{
    width: 90%;
    margin: 1.5rem 5% 0;
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
    /* font-size: 0.5rem; */
    border-bottom: 1px dashed black;
    outline:none;
    /* background-color: rgba(0, 0, 0, 0.5); */
    display: block;
    /* margin-top: 1rem; */
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
  .writePosts-enter-active,
  .writePosts-leave-active {
    transform: translate3d(0, 0, 0);
    opacity: 1;
    transition: transform 0.5s, opacity 0.5s;
  }
  .writePosts-enter,
  .writePosts-leave-to {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
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
