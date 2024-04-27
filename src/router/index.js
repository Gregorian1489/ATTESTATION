import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TaskView from '../views/TaskView.vue'
import AutorizationView from '../views/AutorizationView.vue'
import TaskSecondView from '../views/TaskSecondView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'AutorizationView',
    component: AutorizationView,
  },
  {
    path: '/admin',
    name: 'HomeView',
    component: HomeView,
  },
  {
    path: '/task',
    name: 'task',
    component: TaskView
  },
  {
    path: '/task/2',
    name: 'task2',
    component: TaskSecondView
  },
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;
