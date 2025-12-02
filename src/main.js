import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initScrollAnimations } from './utils/scrollAnimation'
import './styles.css'

const app = createApp(App)
app.use(router)

// 挂载应用
app.mount('#app')

// 初始化滚动动画
window.addEventListener('load', initScrollAnimations)

// 监听路由变化，重新初始化动画
router.afterEach(() => {
  // 延迟一下，确保DOM已更新
  setTimeout(initScrollAnimations, 100)
})

// 平滑滚动效果
app.directive('smooth-scroll', {
  mounted(el) {
    el.addEventListener('click', (e) => {
      // 检查是否是内部链接
      const href = el.getAttribute('href')
      if (href && href.startsWith('#')) {
        e.preventDefault()
        const targetId = href.slice(1)
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      }
    })
  }
})

// 为所有导航链接添加平滑滚动
router.options.routes.forEach(route => {
  // 路由导航后的平滑滚动
  router.afterEach((to) => {
    if (to.hash) {
      setTimeout(() => {
        const element = document.querySelector(to.hash)
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      }, 100)
    }
  })
})

// 全局平滑滚动
document.documentElement.style.scrollBehavior = 'smooth'
