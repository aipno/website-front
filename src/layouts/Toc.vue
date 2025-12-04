<template>
  <button id="backToTop"
          class="fixed bottom-8 right-8 w-12 h-12 bg-primary rounded-full shadow-lg flex items-center justify-center text-white opacity-0 transition-opacity">
    <Icon icon="mdi:arrow-up"></Icon>
  </button>
</template>

<script setup>
import {Icon} from "@iconify/vue";

document.addEventListener('DOMContentLoaded', () => {
  // 回到顶部按钮
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.classList.remove('opacity-0');
    } else {
      backToTop.classList.add('opacity-0');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // 滚动动画
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-on-scroll');
        entry.target.classList.remove('scroll-target');
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.scroll-target').forEach(target => {
    observer.observe(target);
  });
});
</script>

<style scoped>

</style>