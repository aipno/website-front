<template>
  <div class="app">
    <header class="app-header">
      <Navbar/>
    </header>
    <main class="app-main">
      <router-view v-slot="{ Component }">
        <transition mode="out-in" name="fade">
          <component :is="Component"/>
        </transition>
      </router-view>
    </main>
    <footer class="app-footer">
      <Footer/>
    </footer>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

.app-header {
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all var(--transition-base);
}

.app-header:hover {
  box-shadow: var(--shadow-base);
}

.app-main {
  flex: 1;
  background-color: var(--bg-primary);
}

.app-footer {
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  padding: var(--spacing-48) 0;
  margin-top: auto;
  transition: all var(--transition-base);
}

/* 页面过渡效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--transition-base), transform var(--transition-base);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .app-footer {
    padding: var(--spacing-32) 0;
  }
}
</style>