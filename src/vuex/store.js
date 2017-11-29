import Vue from 'vue';
import Vuex from 'vuex';
import login from './mutations';


Vue.use(Vuex);

const state = {
  accesstoken: localStorage.getItem('accesstoken'),
  userName: '',
  userImg: '',
  userId: '',
  listType: 'all',
};
const mutations = {
  changeState(oldVal, newVal) {
    Object.keys(newVal).forEach((element) => {
      state[element] = newVal[element];
    });
  },
  ...login
};

const getters = {
  userName() {
    return state.userName;
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
});
