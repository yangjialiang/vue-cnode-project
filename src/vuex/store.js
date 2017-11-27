import Vue from 'vue';
import Vuex from 'vuex';
import { postInfo } from '../common/axiosUtil';

Vue.use(Vuex);

const state = {
  accesstoken: window.localStorage.getItem('accesstoken'),
  userName: '',
  userImg: '',
  userId: '',
  listType: 'share',
};
const mutations = {
  changeState(oldVal, newVal) {
    Object.keys(newVal).forEach((element) => {
      state[element] = newVal[element];
    });
  },
  login() {
    if (state.accesstoken) {
      const url = 'https://cnodejs.org/api/v1/accesstoken';
      postInfo(url, { accesstoken: state.accesstoken }, (data) => {
        const userInfo = {
          userName: '',
          userImg: '',
          userId: '',
          accesstoken: '',
        };
        if (data.success) {
          userInfo.userName = data.loginname;
          userInfo.userImg = data.avatar_url;
          userInfo.userId = data.id;
          userInfo.accesstoken = state.accesstoken;
        }
        Object.assign(state, userInfo);
      });
    }
  }
};

export default new Vuex.Store({
  state,
  mutations,
});
