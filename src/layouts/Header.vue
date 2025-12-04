<template>
  <header class="fixed top-0 w-full h-20 bg-dark/90 backdrop-blur-md z-50 shadow-lg">
    <div class="container mx-auto px-6 h-full flex items-center justify-between">
      <div class="flex items-center">
        <Icon class="text-primary text-3xl mr-2" icon="mdi:shield-lock"></Icon>
        <span class="text-white font-bold text-xl">零壹网络安全社团</span>
      </div>
      <nav class="hidden md:flex space-x-10">
        <router-link to="/" class="text-white hover:text-primary transition">首页</router-link>
        <router-link to="/about" class="text-white hover:text-primary transition">关于我们</router-link>
        <router-link to="/activities" class="text-white hover:text-primary transition">社团活动</router-link>
        <a href="https://docs.websec.org.cn/" class="text-white hover:text-primary transition" target="_blank">技术分享</a>
        <router-link to="/join" class="text-white hover:text-primary transition">加入我们</router-link>
      </nav>
      <div class="flex items-center space-x-4">
        <button class="p-2 rounded-full hover:bg-gray-800">
          <Icon class="text-xl" icon="ic:baseline-search"></Icon>
        </button>
        <button class="px-4 py-2 rounded-lg bg-primary hover:bg-blue-700 transition">登录</button>
        <button class="md:hidden text-2xl">
          <Icon icon="charm:menu-hamburger"></Icon>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import {Icon} from "@iconify/vue";
</script>

<style scoped>

</style>