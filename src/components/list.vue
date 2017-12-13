<template>
  <div id="List">
    <ul>
      <div class="refreshTips" v-show="refreshTips"><img src="../assets/images/loading.gif" alt=""> 正在刷新...</div>
      <v-listElement v-for="listInfo in list" :listInfo="listInfo"></v-listElement>     
      <div class="loadmoreTips" v-if="!allLoaded"><img src="../assets/images/loading.gif" alt=""> 加载中...</div>
      <div v-else>全部加载完啦^_^</div>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import BScroll from 'better-scroll';
import { getInfo } from '../common/axiosUtil';
import ListEle from './listElement';

export default {
  name: 'List',
  data() {
    return {
      list: '',
      page: 1,
      scroll: '',
      refreshTips: false,
      listUpdate: false,
      allLoaded: false,
    };
  },
  computed: {
    ...mapState(['listType']),
  },
  methods: {
    resetList() {
      // 列表初始化
      this.page = 1;
      this.allLoaded = false;
      getInfo(
        'https://cnodejs.org/api/v1/topics?',
        {
          page: this.page,
          tab: this.listType
        },
        (data) => {
          if (data.success) {
            this.listUpdate = true;
            this.list = data.data;
          }
        }
      );
      document.querySelector('#List').scrollTop = 0;
    },
    loadMore() {
      // 上拉加载更多
      const self = this;
      this.page += 1;
      getInfo(
        'https://cnodejs.org/api/v1/topics?', {
          page: this.page,
          tab: this.listType
        }, (data) => {
          if (data.success) {
            this.listUpdate = true;
            this.list = self.list.concat(data.data);

            if (data.data.length === 0) {
              this.allLoaded = true;
            } else {
              this.allLoaded = false;
            }
          }
        }
      );
    }
  },
  watch: {
    listType() {
      // 监听显示内容类型
      this.list = [];
      this.resetList();
      this.scroll.scrollTo(0, 0);
      console.log(this.scroll.y);
    }
  },
  mounted() {
    this.resetList();
    const wrapper = document.querySelector('#List');
    this.scroll = new BScroll(wrapper, {
      click: true,
      pullDownRefresh: true,
      pullUpLoad: true,
    });
    this.scroll.on('pullingDown', () => {
      this.refreshTips = true;
      this.resetList();
    });
    this.scroll.on('pullingUp', () => {
      this.loadMore();
    });
  },
  updated() {
    if (this.listUpdate) {
      this.refreshTips = false;
      this.listUpdate = false;
      this.scroll.finishPullDown();
      this.scroll.finishPullUp();
      this.scroll.refresh();
    }
  },
  components: {
    'v-listElement': ListEle
  }
};
</script>
<style scoped>
#List {
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
</style>

