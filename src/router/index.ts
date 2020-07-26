import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import AssignMission from '../views/Game/AssignMission.vue';

const routes: Array<any> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/name',
    name: 'Name',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Name.vue')
  },
  {
    path: '/room/:id',
    name: 'Room',
    component: () => import('../views/Room.vue')
  },
  {
    path: '/role-reveal/:id',
    name: 'RoleReview',
    component: () => import('../views/RoleReveal.vue')
  },
  {
    path: '/game/:id',
    name: 'Game',
    component: () => import('../views/Game/Game.vue'),
    children: [
      {
        path: 'assign-mission',
        component: AssignMission
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
