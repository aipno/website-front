<template>
  <footer class="bg-hacker-gray border-t border-gray-800 pt-12 pb-6 relative overflow-hidden">
    <!-- Matrix Deco Background -->
    <div class="absolute top-0 right-0 p-4 opacity-5 select-none pointer-events-none">
            <pre class="text-xs font-mono text-hacker-green text-right">
0101010101
1010010010
0011100101
SYSTEM_EOF
            </pre>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

        <!-- Brand Column -->
        <div class="col-span-1 md:col-span-1">
          <div class="flex items-center gap-2 mb-4">
            <el-icon :size="20" color="#00ff41">
              <component :is="'Platform'"/>
            </el-icon>
            <span class="font-mono text-lg font-bold text-white">0xSHIELD</span>
          </div>
          <p class="text-gray-500 text-sm mb-4">
            致力培养下一代白帽黑客。<br>
            "Defense through Offense."
          </p>
          <div class="flex gap-4">
            <a class="text-gray-400 hover:text-white transition" href="#">
              <el-icon>
                <component :is="'ChatDotSquare'"/>
              </el-icon>
            </a>
            <a class="text-gray-400 hover:text-white transition" href="#">
              <el-icon>
                <component :is="'Message'"/>
              </el-icon>
            </a>
            <a class="text-gray-400 hover:text-white transition" href="#"><i>GitHub</i></a>
          </div>
        </div>

        <!-- Links Column -->
        <div>
          <h3 class="text-white font-mono font-bold mb-4 text-sm uppercase tracking-wider">>> SITEMAP</h3>
          <ul class="space-y-2 text-sm text-gray-400 font-mono">
            <li><a class="hover:text-hacker-green transition-colors" href="#">./home</a></li>
            <li><a class="hover:text-hacker-green transition-colors" href="#">./about_us</a></li>
            <li><a class="hover:text-hacker-green transition-colors" href="#">./join_us</a></li>
            <li><a class="hover:text-hacker-green transition-colors" href="#">./wiki</a></li>
          </ul>
        </div>

        <!-- Resources Column -->
        <div>
          <h3 class="text-white font-mono font-bold mb-4 text-sm uppercase tracking-wider">>> RESOURCES</h3>
          <ul class="space-y-2 text-sm text-gray-400 font-mono">
            <li><a class="hover:text-hacker-green transition-colors" href="#">Kali Mirrors</a></li>
            <li><a class="hover:text-hacker-green transition-colors" href="#">CTF Writeups</a></li>
            <li><a class="hover:text-hacker-green transition-colors" href="#">Tools Archive</a></li>
            <li><a class="hover:text-hacker-green transition-colors" href="#">Vulnerability DB</a></li>
          </ul>
        </div>

        <!-- Contact Us Column -->
        <div>
          <h3 class="text-white font-mono font-bold mb-4 text-sm uppercase tracking-wider">>> CONTACT US</h3>
          <ul class="space-y-2 text-sm text-gray-400 font-mono">
            <li class="flex items-start gap-2">
              <el-icon class="mt-0.5 flex-shrink-0">
                <component :is="'Location'"/>
              </el-icon>
              <span>连云港市海州区江苏财会职业学院行健楼#3网络安全实训基地</span>
            </li>
            <li class="flex items-start gap-2">
              <el-icon class="mt-0.5 flex-shrink-0">
                <component :is="'Phone'"/>
              </el-icon>
              <span>+86 400-HACKER</span>
            </li>
            <li class="flex items-start gap-2">
              <el-icon class="mt-0.5 flex-shrink-0">
                <component :is="'Message'"/>
              </el-icon>
              <span>contact@0xshield.cn</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Terminal Footer Bar -->
      <div
          class="border-t border-gray-800 pt-6 mt-6 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-gray-500">
        <div class="flex items-center gap-4 mb-4 md:mb-0 w-full md:w-auto overflow-hidden">
          <span class="text-hacker-green">root@0xShield:~#</span>
          <span class="truncate">tail -f /var/log/syslog | grep "STATUS"</span>
          <span class="text-white ml-2">{{ terminalLog }}<span class="cursor-blink">_</span></span>
        </div>

        <div class="flex items-center gap-6">
          <span>PING: <span :class="pingColor">{{ ping }}ms</span></span>
          <span>&copy; 2025 0xSHIELD TEAM</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";

const ping = ref(24);
const terminalLog = ref('System Stable');

// Simulate live server stats
const simulatePing = () => {
  ping.value = Math.floor(Math.random() * 40) + 15;
  const logs = ['System Stable', 'Scanning Ports...', 'Updating DB...', 'Traffic Normal', 'Analyzing Packets'];
  terminalLog.value = logs[Math.floor(Math.random() * logs.length)];
};

const pingColor = computed(() => {
  if (ping.value < 50) return 'text-hacker-green';
  if (ping.value < 100) return 'text-yellow-500';
  return 'text-red-500';
});

onMounted(() => {
  setInterval(simulatePing, 3000);
});
</script>

<style>
/* 底部终端光标 */
.cursor-blink {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

</style>