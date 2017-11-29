import { getInfo, postInfo } from '../common/axiosUtil';

const mutations = {
  login(state) {
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
  },
  getCollect(state, callBack) {
    const url = `https://cnodejs.org/api/v1/topic_collect/${state.userName}`;
    getInfo(url, {}, (data) => {
      if (data.success) {
        if (callBack) {
          callBack(data.data);
        }
      } else {
        alert(data.error_msg);
      }
    });
  },
  getUserInfo(state, callBack) {
    const url = `https://cnodejs.org/api/v1/user/${state.userName}`;
    getInfo(url, {}, (data) => {
      if (data.success) {
        if (callBack) {
          callBack(data.data);
        }
      } else {
        alert(data.error_msg);
      }
    });
  },
  cancel(state, router) {
    localStorage.setItem('accesstoken', '');
    const userInfo = {
      userName: '',
      userImg: '',
      userId: '',
      accesstoken: '',
    };
    Object.assign(state, userInfo);
    if (history.length === 1) {
      router.push('/');
    } else {
      history.go(-1);
    }
  }
};

export default mutations;
