<template>
  <section id="home" class="pt-20 min-h-screen flex items-center relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 z-0"></div>
    <div class="absolute inset-0 z-0">
      <img alt="" class="w-full h-full object-cover opacity-50"
           src="https://modao.cc/agent-py/media/generated_images/2025-12-03/3dd57f372dac40cb97bde904e283181a.jpg"/>
    </div>
    <div class="container mx-auto px-6 relative z-10 py-16">
      <div class="max-w-3xl mx-auto text-center">
        <h1 class="text-5xl md:text-7xl font-bold mb-6 text-white">零壹网络安全社团</h1>
        <p class="text-xl mb-10 text-gray-300">守护数字世界，培养安全卫士</p>
        <div class="flex flex-wrap justify-center gap-4">
          <button @click="scrollTo('/join')"
              class="px-8 py-4 bg-gradient-to-r from-primary to-teal-500 rounded-full text-lg font-semibold hover:scale-105 transition-transform">
            加入我们
          </button>
          <button @click="scrollTo('about')" class="px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-full text-lg transition-all">了解更多
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

</script>

<style scoped>

</style>