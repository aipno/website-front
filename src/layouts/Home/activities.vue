<template>
  <section id="activities" class="py-20 bg-dark text-white scroll-target">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold mb-4">近期活动</h2>
        <p class="max-w-2xl mx-auto text-gray-400">加入我们的技术盛宴，与同行交流最前沿的安全知识</p>
      </div>
      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="activity in activities.slice(0, 3)" :key="activity.id"
             class="bg-gray-800 rounded-xl overflow-hidden transition-transform hover:scale-105 group">
          <div class="aspect-video overflow-hidden">
            <img :alt="activity.name"
                 :src="activity.image"
                 class="w-full h-full object-cover group-hover:scale-110 transition-transform"/>
          </div>
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <span class="text-primary font-semibold">{{ activity.type }}</span>
              <span class="text-gray-400">{{ activity.date }}</span>
            </div>
            <h3 class="text-xl font-bold mb-3">{{ activity.name }}</h3>
            <p class="text-gray-300 mb-6">{{ activity.description }}</p>
            <button class="text-primary font-medium flex items-center group-hover:underline">
              查看详情
              <Icon class="ml-1" icon="mdi:arrow-right"></Icon>
            </button>
          </div>
        </div>
      </div>
      <div class="text-center mt-12">
        <button
            class="px-6 py-3 border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all">
          查看所有活动
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import {Icon} from "@iconify/vue";
import {onMounted, ref} from "vue";
import {getActivityList} from "@/api/activity";

const activities = ref([])

function getActivity() {
  getActivityList().then(res => {
    activities.value = res.data
    console.log(res.data)
  })
}

onMounted(() => {
  getActivity()
})
</script>

<style scoped></style>