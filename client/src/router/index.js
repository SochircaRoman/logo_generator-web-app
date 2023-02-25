import { createWebHistory, createRouter } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import RegistrationView from '../views/RegistrationView.vue';
import LoginView from '../views/LoginView.vue';

// lazy-loaded
const Profile = () => import("../views/ProfileView.vue");
const Settings = () => import("../views/SettingsView.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/register',
      name: 'register',
      component: RegistrationView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/profile',
      name: 'profile',
      // lazy-loaded
      component: Profile,
    },
    {
      path: '/settings',
      name: 'settings',
      // lazy-loaded
      component: Settings,
    },
  ]
})

export default router