<script setup>
import {RouterView} from 'vue-router'
import NavBar from './components/Header.vue'
import Footer from "@/components/Footer.vue";
</script>

<template>
  <div class="bg-hacker-black min-h-screen text-gray-200 font-sans selection:bg-hacker-green selection:text-black">
    <NavBar/>

    <!-- 路由过渡动画 -->
    <router-view v-slot="{ Component }">
      <transition mode="out-in" name="fade">
        <component :is="Component"/>
      </transition>
    </router-view>

    <Footer></Footer>
  </div>
</template>

<style>

</style>