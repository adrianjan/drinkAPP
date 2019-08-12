import Vue from 'vue'
import Router from 'vue-router'
import Index from '../Index.vue'
import Edit from '../Edit.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/edit/:id',
      name: 'EditDrink',
      component: Edit
    }
  ]
})
