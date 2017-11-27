<template>
  <div id="List">
    <ul>
      <div class="refreshTips" v-show="refreshTips"><img src="../assets/images/loading.gif" alt=""> 正在刷新...</div>
      <v-listElement v-for="listInfo in list" :listInfo="listInfo"></v-listElement>     
      <div class="loadmoreTips"><img src="../assets/images/loading.gif" alt=""> 加载中...</div>
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
    };
  },
  computed: {
    ...mapState(['listType']),
  },
  methods: {
    resetList() {
      this.page = 1;
      getInfo(
        'https://cnodejs.org/api/v1/topics?',
        {
          page: this.page,
          tab: this.listType
        },
        (data) => {
          if (data.success) {
            console.log(data);
            this.listUpdate = true;
            this.list = data.data;
          }
        }
      );
      document.querySelector('#List').scrollTop = 0;
    },
    loadMore() {
      // 上拉加载更多
      // this.loading = true;
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
              // self.allLoaded = true;
            } else {
              // self.allLoaded = false;
            }
            // self.loading = false;
            // self.$refs.loadmore.onBottomLoaded();
          }
        }
      );
    }
  },
  watch: {
    listType() {
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

