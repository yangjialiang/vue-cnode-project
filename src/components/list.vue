<template>
  <div id="List">
    <ul>
      <v-listElement v-for="listInfo in list" :listInfo="listInfo"></v-listElement>     
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
      self.page += 1;
      getInfo(
        'https://cnodejs.org/api/v1/topics?', {
          page: self.page,
          tab: self.$store.state.listType
        }, (data) => {
          if (data.success) {
            self.list = self.list.concat(data.data);
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
      this.resetList();
    });
    this.scroll.on('pullingUp', () => {
      this.loadMore();
    });
  },
  updated() {
    this.scroll.finishPullDown();
    this.scroll.finishPullUp();
    this.scroll.refresh();
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
</style>

