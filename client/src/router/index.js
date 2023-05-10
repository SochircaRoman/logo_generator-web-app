import { createWebHistory, createRouter } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import RegistrationView from '../views/RegistrationView.vue';
import LoginView from '../views/LoginView.vue';
import GeneratorView from '../views/GeneratorView.vue';

// lazy-loaded
const Profile = () => import("../views/ProfileView.vue");
const Settings = () => import("../views/SettingsView.vue");
const Logos = () => import("../views/LogosView.vue");

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
      path: '/generator',
      name: 'generator',
      component: GeneratorView
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
    {
      path: '/logos',
      name: 'logos',
      // lazy-loaded
      component: Logos,
    },
  ]
})

export default router