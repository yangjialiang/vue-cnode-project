<template>
  <!-- <div> -->
    <transition name="fade" mode="out-in">
      <div class="collectPage page">
        <v-header class="header">
          <div class="title" slot="title">我的收藏</div>
          <div class="comeBackBtn" slot="left" @click="comeBack"></div>
        </v-header>
        <div id="collectList">
          <ul>
            <v-listElement v-for="listInfo in list" :listInfo="listInfo"></v-listElement>     
            <div class="loadmoreTips" v-show="loadmoreTips"><img src="../assets/images/loading.gif" alt=""> 加载中...</div>
          </ul>
        </div>
      </div>
    </transition>
  <!-- </div> -->
</template>
<script>
  import BScroll from 'better-scroll';
  import Header from './header';
  import { getInfo } from '../common/axiosUtil';
  import ListEle from './listElement';

  export default {
    name: 'loginPage',
    data() {
      return {
        list: [],
        loadmoreTips: true,
      };
    },
    computed: {
    },
    methods: {
      comeBack() {
        this.$emit('changeView', { 'showCollect': false });
      },
    },
    beforeCreate() {
      const url = `https://cnodejs.org/api/v1/topic_collect/${this.$store.state.userName}`;
      getInfo(url, {}, (data) => {
        if (data.success) {
          console.log(data);
          this.list = this.list.concat(data.data);
          this.loadmoreTips = false;
        } else {
          alert(data.error_msg);
        }
      });
    },
    mounted() {
      const wrapper = document.querySelector('#collectList');
      this.scroll = new BScroll(wrapper, {
        click: true,
      });
    },
    updated() {
      this.scroll.refresh();
    },
    components: {
      'v-header': Header,
      'v-listElement': ListEle
    },
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
  #collectList {
  width: 100%;
  position: absolute;
  top: 1rem;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
.refreshTips {
  padding: 0.28rem;
}
.refreshTips>img{
  width: 0.5rem;
}
.loadmoreTips {
  padding: 0.28rem;
}
.loadmoreTips>img{
  width: 0.5rem;
}
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

