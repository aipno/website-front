<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-content">
        <div class="navbar-logo">
          <a class="logo-link" href="/">
            <span class="logo-text">零壹网络安全社团</span>
          </a>
        </div>

        <!-- 桌面导航 -->
        <ul class="navbar-menu desktop-menu">
          <li v-for="item in navItems" :key="item.path" class="navbar-item">
            <a
                :class="{ active: route.path === item.path }"
                :href="item.path"
                class="navbar-link"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>

        <!-- 移动端导航 -->
        <div class="mobile-menu-container">
          <button class="mobile-menu-toggle" @click="toggleMobileMenu">
            <span class="menu-icon">{{ isMobileMenuOpen ? '✕' : '☰' }}</span>
          </button>

          <ul v-if="isMobileMenuOpen" class="navbar-menu mobile-menu">
            <li v-for="item in navItems" :key="item.path" class="navbar-item">
              <a
                  :class="{ active: route.path === item.path }"
                  :href="item.path"
                  class="navbar-link"
                  @click="toggleMobileMenu"
              >
                {{ item.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import {ref} from 'vue'
import {useRoute} from 'vue-router'

const route = useRoute()
const isMobileMenuOpen = ref(false)

const navItems = [
  {path: '/', label: '首页'},
  {path: '/about', label: '关于我们'},
  {path: '/activities', label: '社团活动'},
  {path: '/members', label: '社团成员'},
  {path: '/contact', label: '联系我们'}
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<style scoped>
.navbar {
  height: 64px;
  line-height: 5vh;
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  transition: all var(--transition-base);
  position: relative;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.navbar-logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 700;
  font-size: var(--font-size-lg);
  transition: all var(--transition-base);
  padding: var(--spacing-8) 0;
}

.logo-link:hover {
  color: var(--primary-color);
}

.logo-text {
  margin: 0;
  white-space: nowrap;
}

/* 导航菜单 */
.navbar-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: var(--spacing-24);
  align-items: center;
}

.navbar-item {
  margin: 0;
  position: relative;
}

.navbar-link {
  display: inline-block;
  text-decoration: none;
  color: var(--text-secondary);
  font-size: var(--font-size-base);
  font-weight: 500;
  padding: var(--spacing-12) 0;
  position: relative;
  transition: all var(--transition-base);
  line-height: 1;
}

.navbar-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 3px;
  background-color: var(--primary-color);
  border-radius: 2px;
  transition: all var(--transition-base);
  transform: translateX(-50%);
}

.navbar-link:hover {
  color: var(--primary-color);
}

.navbar-link:hover::after {
  width: 100%;
  left: 0;
  transform: translateX(0);
}

.navbar-link.active {
  color: var(--primary-color);
  font-weight: 600;
}

.navbar-link.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: var(--primary-color);
  border-radius: 2px;
  transition: all var(--transition-base);
  transform: none;
}

/* 移动端菜单容器 */
.mobile-menu-container {
  display: none;
  position: relative;
}

.mobile-menu-toggle {
  background: none;
  border: none;
  font-size: var(--font-size-2xl);
  color: var(--text-primary);
  cursor: pointer;
  padding: var(--spacing-8);
  transition: all var(--transition-base);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--border-radius-base);
}

.mobile-menu-toggle:hover {
  background-color: var(--bg-hover);
}

.menu-icon {
  display: block;
  line-height: 1;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .navbar-menu {
    gap: var(--spacing-20);
  }
}

@media (max-width: 768px) {
  /* 隐藏桌面菜单 */
  .desktop-menu {
    display: none;
  }

  /* 显示移动端菜单容器 */
  .mobile-menu-container {
    display: block;
  }

  /* 移动端菜单样式 */
  .mobile-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-base);
    box-shadow: var(--shadow-lg);
    padding: var(--spacing-8);
    width: 200px;
    z-index: 1000;
    flex-direction: column;
    gap: var(--spacing-8);
    margin-top: var(--spacing-4);
  }

  .navbar-item {
    margin: 0;
  }

  .navbar-link {
    display: block;
    padding: var(--spacing-12) var(--spacing-16);
    border-radius: var(--border-radius-base);
    width: 100%;
    text-align: left;
  }

  .navbar-link:hover {
    background-color: var(--bg-hover);
  }

  .navbar-link.active::after {
    display: none;
  }

  .navbar-link.active {
    background-color: var(--primary-light);
    color: var(--primary-color);
  }

  .logo-text {
    font-size: var(--font-size-base);
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 var(--spacing-16);
  }

  .logo-text {
    font-size: var(--font-size-sm);
  }

  .mobile-menu {
    width: 180px;
  }
}
</style>