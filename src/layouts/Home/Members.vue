<template>
  <section id="team" class="py-20 bg-dark text-white scroll-target">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold mb-4">核心团队</h2>
        <p class="max-w-2xl mx-auto text-gray-400">认识我们的技术专家和领域领袖</p>
      </div>
      <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <!-- 成员 1 -->
        <div class="group relative rounded-xl overflow-hidden">
          <div class="aspect-square overflow-hidden">
            <img alt="Cybersecurity expert profile"
                 class="w-full h-full object-cover group-hover:scale-110 transition-transform"
                 src="https://modao.cc/agent-py/media/generated_images/2025-12-03/bc1e699d8dea48b4af605d92f3c070bb.jpg"/>
          </div>
          <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h3 class="font-bold text-xl">李明</h3>
            <p class="text-primary text-sm">技术总监</p>
          </div>
          <div
              class="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
            <p class="text-sm text-gray-300 mb-4">
              前国家级网络安全工程师，10年攻防经验，专精加密算法及区块链安全
            </p>
            <div class="flex space-x-3">
              <Icon class="text-xl hover:text-primary transition" icon="mdi:github"></Icon>
              <Icon class="text-xl hover:text-primary transition" icon="mdi:linkedin"></Icon>
              <Icon class="text-xl hover:text-primary transition" icon="mdi:email"></Icon>
            </div>
          </div>
        </div>
        <!-- 成员 2 -->
        <div class="group relative rounded-xl overflow-hidden">
          <div class="aspect-square overflow-hidden">
            <img alt="Security researcher profile"
                 class="w-full h-full object-cover group-hover:scale-110 transition-transform"
                 src="https://modao.cc/agent-py/media/generated_images/2025-12-03/d932fcc924b4451f95bcb08d07c6b320.jpg"/>
          </div>
          <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h3 class="font-bold text-xl">张悦</h3>
            <p class="text-primary text-sm">首席研究员</p>
          </div>
          <div
              class="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
            <p class="text-sm text-gray-300 mb-4">
              人工智能安全领域专家，研发的AI威胁检测系统获国家科技创新奖
            </p>
            <div class="flex space-x-3">
              <Icon class="text-xl hover:text-primary transition" icon="mdi:github"></Icon>
              <Icon class="text-xl hover:text-primary transition" icon="mdi:twitter"></Icon>
              <Icon class="text-xl hover:text-primary transition" icon="mdi:email"></Icon>
            </div>
          </div>
        </div>
        <!-- 成员 3 -->
        <div class="group relative rounded-xl overflow-hidden">
          <div class="aspect-square overflow-hidden">
            <img alt="Cybersecurity trainer profile"
                 class="w-full h-full object-cover group-hover:scale-110 transition-transform"
                 src="https://modao.cc/agent-py/media/generated_images/2025-12-03/eb38495533c74c708da10bfc097919f0.jpg"/>
          </div>
          <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h3 class="font-bold text-xl">陈杰</h3>
            <p class="text-primary text-sm">培训主管</p>
          </div>
          <div
              class="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
            <p class="text-sm text-gray-300 mb-4">
              网络安全教育专家，培训学生超1000人，设计开发社团CTF训练体系
            </p>
            <div class="flex space-x-3">
              <Icon class="text-xl hover:text-primary transition" icon="mdi:github"></Icon>
              <Icon class="text-xl hover:text-primary transition" icon="mdi:web"></Icon>
              <Icon class="text-xl hover:text-primary transition" icon="mdi:email"></Icon>
            </div>
          </div>
        </div>
        <!-- 成员 4 -->
        <div class="group relative rounded-xl overflow-hidden">
          <div class="aspect-square overflow-hidden">
            <img alt="Security operation manager profile"
                 class="w-full h-full object-cover group-hover:scale-110 transition-transform"
                 src="https://modao.cc/agent-py/media/generated_images/2025-12-03/47bdb04b6f844df4b174636048f309b3.jpg"/>
          </div>
          <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h3 class="font-bold text-xl">王华</h3>
            <p class="text-primary text-sm">运营总监</p>
          </div>
          <div
              class="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
            <p class="text-sm text-gray-300 mb-4">
              项目管理专家，成功组织多场国际级安全会议，建立企业合作关系网络
            </p>
            <div class="flex space-x-3">
              <Icon class="text-xl hover:text-primary transition" icon="mdi:linkedin"></Icon>
              <Icon class="text-xl hover:text-primary transition" icon="mdi:email"></Icon>
              <Icon class="text-xl hover:text-primary transition" icon="mdi:phone"></Icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {Icon} from "@iconify/vue";
</script>

<style scoped>

</style>