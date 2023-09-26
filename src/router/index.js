import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import { auth } from '@/stores/auth';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: { requiresGuest: true },
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('@/views/AboutView.vue'),
            // meta: { requiresGuest: true },
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('@/views/ProfileView.vue'),
            meta: { requiresAuth: true },
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/LoginWithMagicLinkView.vue'),
            meta: { requiresGuest: true },
        },
    ],
});

router.beforeEach((to, from) => {
    if (to.meta.requiresAuth && !auth.state.user.id) {
        return {
            name: 'login', 
        };
    }
    if (to.meta.requiresGuest && auth.state.user.id) {
        return {
            name: 'profile',
        };
    }
});

export default router;