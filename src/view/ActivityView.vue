<script setup>
import {computed, onMounted, onUnmounted, ref} from 'vue';

const currentTime = ref('');
const activeFilter = ref('all');
const searchQuery = ref('');

// Countdown Logic
const countdown = ref({days: '00', hours: '00', minutes: '00', seconds: '00'});
const targetDate = new Date('2023-11-20T09:00:00').getTime(); // Example date

const updateCountdown = () => {
  // For demo purposes, let's just make it a random future date if expired
  // In real app, use targetDate
  const now = new Date().getTime();
  // Mocking a future date for demo visual
  const demoTarget = now + 258400000;

  const distance = demoTarget - now;

  countdown.value.days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
  countdown.value.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
  countdown.value.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
  countdown.value.seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
};

const filters = [
  {label: './ALL', value: 'all'},
  {label: './CTF', value: 'ctf'},
  {label: './WORKSHOP', value: 'workshop'},
  {label: './SALON', value: 'salon'}
];

const events = [
  {
    id: 1,
    title: 'Web Security 101: SQL Injection',
    date: '2023-10-28',
    type: 'workshop',
    status: 'finished',
    desc: '由 Spider 带领大家深入浅出地学习 SQL 注入原理，包括布尔盲注和报错注入。',
    tags: ['sqlmap', 'burpsuite', 'web']
  },
  {
    id: 2,
    title: 'Mini-CTF: 新生挑战赛',
    date: '2023-11-05',
    type: 'ctf',
    status: 'upcoming',
    desc: '面向新成员的轻量级 CTF 比赛，包含 Web、Crypto 和 Misc 题目。前三名有机械键盘奖励。',
    tags: ['competition', 'beginner', 'prizes']
  },
  {
    id: 3,
    title: '周五沙龙：APT 攻击案例分析',
    date: '2023-10-14',
    type: 'salon',
    status: 'finished',
    desc: '复盘近期著名的供应链攻击事件，分析黑客组织的渗透路径。',
    tags: ['apt', 'red-team', 'case-study']
  },
  {
    id: 4,
    title: 'Linux Kernel Pwn 入门',
    date: '2023-11-12',
    type: 'workshop',
    status: 'upcoming',
    desc: '高阶课程。需要具备 C 语言和操作系统基础。我们将尝试复现 Dirty Pipe 漏洞。',
    tags: ['kernel', 'exploit', 'c']
  },
  {
    id: 5,
    title: 'DefCon 观影会 & 披萨派对',
    date: '2023-09-20',
    type: 'salon',
    status: 'finished',
    desc: '一起观看 DefCon 31 的精彩演讲录像，享受美食与极客文化。',
    tags: ['social', 'defcon', 'food']
  },
  {
    id: 6,
    title: 'XSS 跨站脚本攻击实战',
    date: '2023-11-18',
    type: 'workshop',
    status: 'upcoming',
    desc: '搭建本地靶场，演示存储型与反射型 XSS 的利用与防御代码编写。',
    tags: ['javascript', 'xss', 'defense']
  }
];

const filteredEvents = computed(() => {
  return events.filter(event => {
    const matchesType = activeFilter.value === 'all' || event.type === activeFilter.value;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        event.desc.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesType && matchesSearch;
  });
});

// Utilities
const getStatusColor = (status) => {
  return status === 'upcoming' ? 'bg-cyber-green' : 'bg-gray-700';
};

const getIcon = (type) => {
  const map = {
    'ctf': 'fas fa-flag',
    'workshop': 'fas fa-laptop-code',
    'salon': 'fas fa-comments',
    'social': 'fas fa-glass-cheers'
  };
  return map[type] || 'fas fa-calendar';
};

const getIconColor = (type) => {
  const map = {
    'ctf': '#ff2a2a', // Red for combat
    'workshop': '#00ff41', // Green for code
    'salon': '#00f0ff', // Blue for talk
  };
  return map[type] || '#ccc';
};

const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString('en-GB', {hour12: false});
};

let timerInterval;
let timeInterval;

onMounted(() => {
  timerInterval = setInterval(updateCountdown, 1000);
  timeInterval = setInterval(updateTime, 1000);
  updateCountdown();
  updateTime();
});

onUnmounted(() => {
  clearInterval(timerInterval);
  clearInterval(timeInterval);
});
</script>

<template>
  <div class="relative min-h-screen flex flex-col font-sans antialiased bg-hex-pattern">

    <!-- Main Content -->
    <main class="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">

      <!-- Header: Mission Control -->
      <div class="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-800 pb-4">
        <div>
          <div class="text-xs font-mono text-cyber-green mb-1 animate-pulse">:: SYSTEM_STATUS: MONITORING ::</div>
          <h1 class="text-4xl md:text-5xl font-bold font-mono text-white">OPERATIONS_LOG</h1>
        </div>
        <div class="text-right hidden md:block">
          <div class="text-xs text-gray-500 font-mono">ENCRYPTED CONNECTION</div>
          <div class="text-xl font-mono text-cyber-green">{{ currentTime }}</div>
        </div>
      </div>

      <!-- Featured Event / Active Mission -->
      <section class="mb-20 relative">
        <div class="absolute -top-4 -left-4 bg-cyber-green text-black font-bold text-xs px-2 py-1 font-mono z-20">
          PRIORITY: HIGH
        </div>

        <div class="hologram-card rounded-xl p-0 grid grid-cols-1 lg:grid-cols-3 border-l-4 border-l-cyber-green">
          <!-- Visual / Radar -->
          <div
              class="relative bg-cyber-dark/50 h-64 lg:h-auto overflow-hidden flex items-center justify-center border-b lg:border-b-0 lg:border-r border-cyber-green/20">
            <div
                class="absolute inset-0 bg-[url('https://media.giphy.com/media/U3qYN8S0j3bpK/giphy.gif')] opacity-10 bg-cover bg-center"></div>
            <div class="w-48 h-48 rounded-full border border-cyber-green/30 relative flex items-center justify-center">
              <div class="radar-scan"></div>
              <div class="absolute w-2 h-2 bg-cyber-red rounded-full top-10 right-10 animate-ping"></div>
              <i class="fas fa-flag text-4xl text-cyber-green z-10"></i>
            </div>
            <div class="absolute bottom-4 left-4 font-mono text-xs text-cyber-green">
              TARGET: CTF_COMPETITION<br>
              COORDS: 127.0.0.1
            </div>
          </div>

          <!-- Info -->
          <div class="lg:col-span-2 p-8 flex flex-col justify-center">
            <div class="flex items-center space-x-3 mb-4">
              <span
                  class="px-2 py-0.5 border border-cyber-red text-cyber-red text-xs font-mono rounded">LIVE_EVENT</span>
              <span class="text-gray-400 text-sm font-mono"><i class="far fa-clock mr-1"></i>2023-11-20 09:00</span>
            </div>

            <h2 class="text-3xl font-bold text-white mb-4 glitch-text">冬季攻防演练：红蓝对抗</h2>
            <p class="text-gray-400 mb-6 font-mono text-sm leading-relaxed">
              本年度最大规模的实战演练。红队由校友战队组成，蓝队由在校成员防守。环境包括内网域渗透、Docker逃逸及Web逻辑漏洞挖掘。这是一场不容错过的实战机会。
            </p>

            <div
                class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-center bg-black/30 p-4 rounded border border-gray-800">
              <div>
                <div class="text-2xl font-bold text-cyber-green font-mono">{{ countdown.days }}</div>
                <div class="text-[10px] text-gray-500 uppercase">Days</div>
              </div>
              <div>
                <div class="text-2xl font-bold text-cyber-green font-mono">{{ countdown.hours }}</div>
                <div class="text-[10px] text-gray-500 uppercase">Hours</div>
              </div>
              <div>
                <div class="text-2xl font-bold text-cyber-green font-mono">{{ countdown.minutes }}</div>
                <div class="text-[10px] text-gray-500 uppercase">Mins</div>
              </div>
              <div>
                <div class="text-2xl font-bold text-cyber-green font-mono">{{ countdown.seconds }}</div>
                <div class="text-[10px] text-gray-500 uppercase">Secs</div>
              </div>
            </div>

            <div class="flex space-x-4">
              <button
                  class="bg-cyber-green text-black font-bold py-2 px-6 rounded hover:bg-white transition-all duration-300 font-mono">
                REGISTER_NOW
              </button>
              <button
                  class="border border-cyber-green text-cyber-green py-2 px-6 rounded hover:bg-cyber-green/10 transition-all duration-300 font-mono flex items-center">
                <i class="fas fa-download mr-2"></i> BRIEFING.PDF
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Filters -->
      <div class="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div class="flex bg-cyber-dark border border-gray-800 rounded p-1">
          <button
              v-for="filter in filters"
              :key="filter.value"
              :class="activeFilter === filter.value ? 'bg-cyber-green text-black font-bold shadow-[0_0_10px_rgba(0,255,65,0.3)]' : 'text-gray-400 hover:text-white'"
              class="px-4 py-1.5 text-sm font-mono transition-all duration-300 rounded"
              @click="activeFilter = filter.value"
          >
            {{ filter.label }}
          </button>
        </div>

        <div class="relative w-full sm:w-64">
          <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600"></i>
          <input
              v-model="searchQuery"
              class="w-full bg-cyber-dark border border-gray-800 text-gray-300 text-sm font-mono py-2 pl-10 pr-4 rounded focus:outline-none focus:border-cyber-green focus:shadow-[0_0_5px_#00ff41] transition-all"
              placeholder="grep 'event_name'..."
              type="text"
          >
        </div>
      </div>

      <!-- Events Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="event in filteredEvents" :key="event.id"
             class="hologram-card rounded-lg group flex flex-col h-full">
          <!-- Status Bar -->
          <div :class="getStatusColor(event.status)" class="h-1 w-full"></div>

          <div class="p-6 flex flex-col h-full">
            <div class="flex justify-between items-start mb-4">
              <div class="flex flex-col">
                <span class="text-xs font-mono text-gray-500 mb-1">{{ event.date }}</span>
                <span class="text-[10px] border border-gray-700 px-1.5 rounded text-gray-400 font-mono w-max">
                                    {{ event.type.toUpperCase() }}
                                </span>
              </div>
              <i :class="getIcon(event.type)"
                 :style="{ color: getIconColor(event.type) }"
                 class="text-2xl opacity-20 group-hover:opacity-100 transition-opacity duration-300"></i>
            </div>

            <h3 class="text-xl font-bold text-white mb-2 font-mono group-hover:text-cyber-green transition-colors">
              {{ event.title }}</h3>
            <p class="text-gray-400 text-sm mb-4 flex-grow">{{ event.desc }}</p>

            <!-- Tech Stack Tags -->
            <div class="flex flex-wrap gap-2 mb-6">
              <span v-for="tag in event.tags" :key="tag"
                    class="text-[10px] bg-gray-900 text-gray-400 px-2 py-1 rounded font-mono">#{{ tag }}</span>
            </div>

            <div class="border-t border-gray-800 pt-4 flex justify-between items-center mt-auto">
                            <span :class="event.status === 'upcoming' ? 'text-cyber-green animate-pulse' : 'text-gray-600'"
                                  class="text-xs font-mono">
                                [{{ event.status === 'upcoming' ? 'ONLINE' : 'OFFLINE' }}]
                            </span>
              <button class="text-sm font-mono font-bold hover:text-cyber-green transition-colors flex items-center">
                DETAILS <i class="fas fa-chevron-right ml-1 text-xs"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredEvents.length === 0" class="text-center py-20 border border-dashed border-gray-800 rounded">
        <i class="fas fa-search text-4xl text-gray-700 mb-4"></i>
        <p class="text-gray-500 font-mono">Target not found in logs.</p>
      </div>

    </main>

    <!-- Footer -->
    <footer class="bg-black/80 border-t border-gray-900 py-6 text-center">
      <div class="text-xs text-gray-600 font-mono">
        SECURE CHANNEL ESTABLISHED. END OF TRANSMISSION.
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Radar Animation */
.radar-scan {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid rgba(0, 255, 65, 0.3);
  background: conic-gradient(from 0deg, transparent 0deg, rgba(0, 255, 65, 0.1) 60deg, transparent 60.1deg);
  animation: radar 4s linear infinite;
}

@keyframes radar {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.hologram-card {
  background: rgba(10, 15, 13, 0.6);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(0, 255, 65, 0.1);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.hologram-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 65, 0.1), transparent);
  transition: 0.5s;
}

.hologram-card:hover::before {
  left: 100%;
}

.hologram-card:hover {
  border-color: #00ff41;
  box-shadow: 0 0 15px rgba(0, 255, 65, 0.15);
}

.glitch-text:hover {
  animation: glitch-skew 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
  color: #00ff41;
}

@keyframes glitch-skew {
  0% {
    transform: skew(0deg);
  }
  20% {
    transform: skew(-2deg);
  }
  40% {
    transform: skew(2deg);
  }
  60% {
    transform: skew(-1deg);
  }
  80% {
    transform: skew(1deg);
  }
  100% {
    transform: skew(0deg);
  }
}
</style>
