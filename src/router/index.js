import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/view/HomeView.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('@/view/AboutView.vue')
        },
        {
            path: '/activity',
            name: 'activity',
            component: () => import('@/view/ActivityView.vue')
        },
        {
            path: '/join',
            name: 'joinUs',
            component: () => import('@/view/JoinUsView.vue')
        }
    ]
})

export default router