import Vue from 'vue';
import Vuex from 'vuex';

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
  }
};

export default new Vuex.Store({
  state,
  mutations,
});
