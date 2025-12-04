<template>
  <footer class="w-full pt-16 pb-10 bg-gray-900">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div>
          <div class="flex items-center mb-5">
            <Icon class="text-primary text-3xl mr-2" icon="mdi:shield-lock"></Icon>
            <span class="text-white font-bold text-xl">零壹网络安全社团</span>
          </div>
          <p class="text-gray-400 mb-6">构建安全网络生态，培养未来安全人才</p>
          <div class="flex space-x-4">
            <a href="https://www.baidu.com/">
              <Icon class="text-gray-400 hover:text-primary text-xl" icon="mdi:wechat"></Icon>
            </a>
            <a href="https://www.baidu.com/">
              <Icon class="text-gray-400 hover:text-primary text-xl" icon="mdi:github"></Icon>
            </a>
            <a href="https://www.baidu.com/">
              <Icon class="text-gray-400 hover:text-primary text-xl" icon="mdi:twitter"></Icon>
            </a>
            <a href="https://www.baidu.com/">
              <Icon class="text-gray-400 hover:text-primary text-xl" icon="mdi:instagram"></Icon>
            </a>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-white mb-5">快速链接</h3>
          <ul class="space-y-3">
            <li>
              <router-link class="text-gray-400 hover:text-white transition" to="/about">关于我们</router-link>
            </li>
            <li>
              <router-link class="text-gray-400 hover:text-white transition" to="/activities">社团活动</router-link>
            </li>
            <li>
              <router-link class="text-gray-400 hover:text-white transition" to="/join">加入我们</router-link>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-white mb-5">联系我们</h3>
          <ul class="space-y-3 text-gray-400">
            <li class="flex items-start">
              <Icon class="mr-2 mt-1" icon="mdi:map-marker"></Icon>
              <span>行健楼(C)3楼-网络安全实训基地</span>
            </li>
            <li class="flex items-center">
              <Icon class="mr-2" icon="mdi:email"></Icon>
              <span>contact@websec.org.cn</span>
            </li>
            <li class="flex items-center">
              <img alt="qq" class="w-4 mr-2" src="@/assets/image/qq.png">
              <span>966465835</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-white mb-5">订阅更新</h3>
          <p class="text-gray-400 mb-4">获取最新活动和技术资讯</p>
          <form class="flex flex-col space-y-3">
            <input
                class="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-primary"
                placeholder="您的邮箱地址" type="email"/>
            <button class="px-4 py-2 bg-primary hover:bg-blue-700 rounded-lg transition" type="submit">订阅
            </button>
          </form>
        </div>
      </div>
      <div class="border-t border-gray-800 pt-8 text-center text-gray-500">
        <p>© 2025 零壹网络安全社团. 保留所有权利</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import {Icon} from "@iconify/vue";
</script>

<style scoped>

</style>