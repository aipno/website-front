<template>
  <Header></Header>
  <section id="join" class="py-20 bg-dark text-white scroll-target mt-5">
    <div class="container mx-auto px-6">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-4xl font-bold mb-6">加入网络安全卫士的行列</h2>
        <p class="mb-10 text-lg text-gray-300">无论你是技术大牛还是安全爱好者，都有适合你的位置</p>
        <div class="flex flex-wrap justify-center gap-6">
          <div class="bg-gray-800 p-8 rounded-xl w-full sm:w-5/12 transition-transform hover:scale-105">
            <div class="flex justify-center mb-6">
              <Icon class="text-primary text-5xl" icon="mdi:account-supervisor"></Icon>
            </div>
            <h3 class="text-xl font-bold mb-3">普通会员</h3>
            <p class="text-gray-400 mb-6">访问技术资源，参与公开活动和讲座</p>
            <button class="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-full transition">立即加入</button>
          </div>
          <div
              class="bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 p-8 rounded-xl w-full sm:w-5/12 transition-transform hover:scale-105">
            <div class="flex justify-center mb-6">
              <Icon class="text-white text-5xl" icon="mdi:shield-crown"></Icon>
            </div>
            <h3 class="text-xl font-bold mb-3">技术团队</h3>
            <p class="text-gray-300 mb-6">参与核心项目，专业指导，竞赛机会</p>
            <button class="px-5 py-2 bg-primary hover:bg-blue-700 rounded-full transition">申请考核</button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <Footer></Footer>
</template>

<script setup>
import {Icon} from "@iconify/vue";
import Header from "@/layouts/Header.vue";
import Footer from "@/layouts/Footer.vue";
</script>


<style scoped>

</style>