import {createRouter, createWebHashHistory} from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
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
    ],
    scrollBehavior(to, from, savedPosition) {
        // 如果有保存的位置（如浏览器前进后退），则返回保存的位置
        if (savedPosition) {
            return savedPosition
        } else {
            // 否则滚动到页面顶部
            return { top: 0 }
        }
    }
})
export default router