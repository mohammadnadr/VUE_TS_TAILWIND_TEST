import { createRouter, createWebHistory,  } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuth } from '../composables/useAuth';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/objectCreateForm',
      name: 'objectCreateForm',
      component: () => import('../views/ObjectFormView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/objectEditForm/:id',
      name: 'objectEditForm',
      component: () => import('../views/ObjectFormView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/objectDetail/:id',
      name: 'objectDetail',
      component: () => import('../views/ObjectDetailView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: { requiresGuest: true }
    },

  ],
})
router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth();

  if (to.meta.requiresAuth && !isAuthenticated()) {
    console.log(1)
    next({ name: 'login' });
  } else if (to.meta.requiresGuest && isAuthenticated()) {
    console.log(2)
    next();
  } else {
    console.log(3)
    next();
  }
});
export default router
