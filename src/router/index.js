import {createRouter, createWebHashHistory} from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/pages/HomeView.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('@/pages/AboutView.vue')
        },
        {
            path: '/activities',
            name: 'activities',
            component: () => import('@/pages/ActivitiesView.vue')
        },
        {
            path: '/join',
            name: 'joinUs',
            component: () => import('@/pages/JoinUsView.vue')
        }
    ],
    scrollBehavior() {
        return {top: 0}
    }
})

export default router
