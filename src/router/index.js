import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/home.vue';

const routes = [
  {
    path: '/',
    redirect: '/select'
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'select',
        name: 'Select',
        component: () => import('@/views/child-components/select.vue')
      },
      {
        path: 'up-en-ex',
        name: 'UpEnEx',
        component: () => import('@/views/child-components/up-en-ex.vue')
      },
      {
        path: 'draw-react',
        name: 'DrawReact',
        component: () => import('@/views/child-components/draw-react.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
