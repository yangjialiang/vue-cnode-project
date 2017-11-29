import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/components/homePage';
import Topic from '@/components/topic';
import WritePosts from '@/components/writePosts';
import LoginPage from '@/components/login';
// import Collect from '@/components/collect';
import UserInfo from '@/components/userInfo';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/homepage'
    },
    {
      path: '/homepage',
      name: 'HomePage',
      component: HomePage,
      children: [
        {
          path: '/homepage/topic/:topicId',
          name: 'Topic',
          component: Topic,
        },
        {
          path: '/homepage/writePosts',
          name: 'WritePosts',
          component: WritePosts,
        },
        {
          path: '/homepage/login',
          name: 'LoginPage',
          component: LoginPage,
        },
        {
          path: '/homepage/userInfo',
          name: 'UserInfo',
          component: UserInfo,
        }
      ]
    },
    {
      path: '*',
      redirect: '/homepage/'
    }
  ],
});
