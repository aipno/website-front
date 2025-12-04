<template>
  <!-- 导航区域 -->
  <Header></Header>
  <!-- 英雄区域 -->
  <HeroSection></HeroSection>
  <!-- 关于社团模块 -->
  <About></About>
  <!-- 活动展示模块 -->
  <Activities></Activities>
  <!-- 成员风采模块 -->
  <Members></Members>
  <!-- 页脚区域 -->
  <Footer></Footer>
  <!-- 返回顶部按钮 -->
  <Toc></Toc>
</template>

<script setup>
import Header from "@/layouts/Header.vue";
import Footer from "@/layouts/Footer.vue";
import HeroSection from "@/layouts/Home/HeroSection.vue";
import Toc from "@/layouts/Toc.vue";
import Members from "@/layouts/Home/Members.vue";
import About from "@/layouts/Home/About.vue";
import Activities from "@/layouts/Home/activities.vue";
</script>

<style>
/* 定义从下往上淡入的动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}



/* 自定义网页滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  background: #1A1A1A;
}

/* 滚动条滑块样式 */
::-webkit-scrollbar-thumb {
  background: #0066CC;
  border-radius: 4px;
}
</style>