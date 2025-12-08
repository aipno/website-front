<template>
  <!-- ================= HEADER START ================= -->
  <nav class="fixed w-full z-50 bg-hacker-dark/90 backdrop-blur border-b border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">

        <!-- Logo -->
        <div class="flex items-center gap-3 cursor-pointer group">
          <div class="relative">
            <div
                class="absolute -inset-1 bg-hacker-green rounded-full blur opacity-20 group-hover:opacity-50 transition"></div>
            <el-icon :size="24" class="relative" color="#00ff41">
              <component :is="'Platform'"/>
            </el-icon>
          </div>
          <span class="font-mono text-xl font-bold tracking-wider text-white">
                        0x<span class="text-hacker-green">SHIELD</span>
                    </span>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-8 font-mono text-sm">
            <router-link class="nav-link text-white px-3 py-2" to="/">/home</router-link>
            <router-link class="nav-link text-gray-300 px-3 py-2" to="/about">./about</router-link>
            <router-link class="nav-link text-gray-300 px-3 py-2" to="/activity">./activities</router-link>
            <a class="nav-link text-gray-300 px-3 py-2" href="https://docs.websec.org.cn" target="_blank">./docs</a>
          </div>
        </div>

        <!-- Right Actions (Status & Login) -->
        <div class="hidden md:flex items-center gap-4">
          <!-- Network Status Indicator -->
          <div
              class="flex items-center gap-2 px-3 py-1 rounded bg-black border border-gray-800 text-xs font-mono text-gray-400">
                        <span class="relative flex h-2 w-2">
                          <span
                              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
            <span>NET: ONLINE</span>
          </div>

          <el-button class="font-mono font-bold" size="small" type="primary" @click="handleLogin">
            > LOGIN
          </el-button>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center">
          <button class="text-gray-300 hover:text-white focus:outline-none" @click="mobileMenuOpen = !mobileMenuOpen">
            <el-icon :size="24">
              <component :is="mobileMenuOpen ? 'Close' : 'Menu'"/>
            </el-icon>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Panel -->
    <div v-show="mobileMenuOpen" class="md:hidden bg-hacker-gray border-b border-gray-800 absolute w-full">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 font-mono">
        <a class="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800" href="#">> /home</a>
        <a class="text-gray-300 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800" href="#">>
          ./about</a>
        <a class="text-gray-300 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800" href="#">>
          ./activities</a>
        <a class="text-gray-300 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800" href="#">>
          ./ctf_rank</a>
        <div class="pt-4 px-3">
          <el-button class="w-full" type="primary">LOGIN_SHELL</el-button>
        </div>
      </div>
    </div>
  </nav>
  <!-- ================= HEADER END ================= -->
</template>

<script setup>
import {ref} from "vue";
import {ElMessage} from "element-plus";

const mobileMenuOpen = ref(false);

const handleLogin = () => {
  ElMessage.info('Redirecting to Auth Gateway...');
};

</script>

<style>
/* 导航链接悬停特效 */
.nav-link {
  position: relative;
  transition: all 0.3s;
}

.nav-link::before, .nav-link::after {
  position: absolute;
  opacity: 0;
  transition: all 0.3s;
  color: #00ff41;
}

.nav-link::before {
  content: '[';
  left: -10px;
}

.nav-link::after {
  content: ']';
  right: -10px;
}

.nav-link:hover {
  color: #00ff41;
}

.nav-link:hover::before {
  opacity: 1;
  left: -5px;
}

.nav-link:hover::after {
  opacity: 1;
  right: -5px;
}

</style>