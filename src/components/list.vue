<template>
  <div id="List">
    <ul>
      <v-listElement v-for="listInfo in list" :listInfo="listInfo"></v-listElement>     
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { getInfo } from '../common/axiosUtil';
import ListEle from './listElement';

export default {
  name: 'List',
  data() {
    return {
      list: '',
      page: 1,
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
    }
  },
  watch: {
    listType() {
      console.log('1');
      this.resetList();
    }
  },
  mounted() {
    this.resetList();
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
  overflow-x: hidden;
  overflow: scroll;
}
</style>

