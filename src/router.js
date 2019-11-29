import Vue from 'vue'
import Router from 'vue-router'
import SubPerInfo from './views/SubPerInfo.vue'
import CardAnswer from './views/CardAnswer.vue'
import Result from './views/Result.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  mode: 'hash',
  base: './',
  routes: [
    {
      path: '*',
      redirect: '/',
    },
    {
      path: '/',
      name: 'subperinfo',
      component: SubPerInfo
    },
    {
      path: '/cardanswer',
      name: 'cardanswer',
      component: CardAnswer
    },
    {
      path: '/result',
      name: 'result',
      component: Result,  // 结果页面
    }
  ]
})
