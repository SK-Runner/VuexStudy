import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import GetterTest from '@/components/GetterTest'
import MutationTest from '@/components/MutationTest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/GetterTest',
      name: 'GetterTest',
      component: GetterTest
    },
    {
      path: '/MutationTest',
      name: 'MutationTest',
      component: MutationTest
    },
  ]
})
