<template>
  <div
      class="relative min-h-screen flex flex-col font-sans antialiased selection:bg-cyber-green selection:text-cyber-black">
    <!-- Matrix Background -->
    <canvas id="matrix-bg"></canvas>

    <!-- Hero Section -->
    <section id="hero" class="relative flex items-center justify-center min-h-screen pt-16">
      <div class="text-center px-4 max-w-4xl mx-auto z-10">
        <div
            class="inline-block px-3 py-1 mb-4 border border-cyber-green/30 rounded-full bg-cyber-greenDim backdrop-blur-sm">
          <span class="text-cyber-green font-mono text-xs tracking-widest">SYSTEM_STATUS: ONLINE</span>
        </div>
        <h1 class="text-5xl md:text-7xl font-bold mb-6 font-mono tracking-tight text-white">
          WE ARE <span class="text-cyber-green neon-text">01WEBSEC</span>
        </h1>
        <div class="h-16 md:h-20 flex items-center justify-center">
          <p class="text-xl md:text-2xl text-gray-400 font-mono">
            <span class="text-cyber-green">root@01websec:~$</span> {{ typedText }}<span
              class="animate-blink bg-cyber-green w-3 h-6 inline-block align-middle ml-1"></span>
          </p>
        </div>
        <div class="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button
              class="px-8 py-3 bg-cyber-green text-cyber-black font-bold font-mono rounded hover:bg-white transition-all duration-300 hover:shadow-[0_0_20px_#00ff41]">
            开始 CTF 之旅
          </button>
          <button
              class="px-8 py-3 border border-gray-600 text-gray-300 font-bold font-mono rounded hover:border-cyber-green hover:text-cyber-green transition-all duration-300 bg-cyber-black/50 backdrop-blur-sm">
            了解更多
          </button>
        </div>
      </div>
    </section>

    <!-- About / Directions Section -->
    <section id="about" class="py-20 bg-gradient-to-b from-transparent to-cyber-dark/80 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4 font-mono"><span class="text-cyber-green">#</span>
            学习方向</h2>
          <p class="text-gray-400 max-w-2xl mx-auto">
            加入我们，探索网络安全的无限可能。无论你是新手还是老鸟，这里都有属于你的战场。
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(track, index) in tracks" :key="index" class="cyber-card p-6 rounded-lg group">
            <div
                class="w-12 h-12 bg-cyber-greenDim rounded-lg flex items-center justify-center mb-4 group-hover:bg-cyber-green transition-colors duration-300">
              <i :class="track.icon"
                 class="text-2xl text-cyber-green group-hover:text-cyber-black transition-colors duration-300"></i>
            </div>
            <h3 class="text-xl font-bold text-white mb-2 font-mono">{{ track.title }}</h3>
            <p class="text-gray-400 text-sm mb-4 h-16">{{ track.desc }}</p>
            <div class="w-full bg-gray-800 rounded-full h-1.5 mt-2">
              <div :style="{ width: track.difficulty }" class="bg-cyber-green h-1.5 rounded-full"></div>
            </div>
            <span class="text-xs text-gray-500 mt-1 inline-block font-mono">难度系数: {{ track.difficulty }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-12 border-y border-cyber-green/10 bg-cyber-black/50 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div v-for="(stat, index) in stats" :key="index">
            <div class="text-4xl font-bold text-white font-mono mb-2">{{ stat.value }}</div>
            <div class="text-cyber-green text-sm font-mono uppercase tracking-wider">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- News & Events -->
    <section id="news" class="py-20 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-end mb-12 border-b border-gray-800 pb-4">
          <div>
            <h2 class="text-3xl font-bold text-white font-mono"><span class="text-cyber-green">./</span> 最近活动</h2>
          </div>
          <router-link class="text-sm text-cyber-green font-mono hover:underline hidden sm:block" to="/activity">VIEW_ALL_ACTIVITIES</router-link>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Main News -->
          <div class="md:col-span-2 cyber-card rounded-xl overflow-hidden relative group">
            <div
                class="absolute top-0 right-0 bg-cyber-green text-cyber-black text-xs font-bold px-3 py-1 font-mono z-10">
              NEW
            </div>
            <div class="h-64 bg-gray-800 relative overflow-hidden">
              <!-- Abstract coding background for image placeholder -->
              <div class="absolute inset-0 bg-gradient-to-t from-cyber-black to-transparent z-10"></div>
              <div v-for="(activity, id) in activityList.slice(0, 1)" :key="id">
                <div class="w-full h-full bg-gray-800 flex items-center justify-center">
                  <img :src="activity.cover" alt="Activity Image"
                       class="w-auto h-auto"/>

                </div>
                <div class="absolute bottom-0 left-0 p-6 z-20">
                  <span class="text-cyber-green text-xs font-mono mb-2 block">{{ formatDateTime(activity?.date || '') }}</span>
                  <h3 class="text-2xl font-bold text-white mb-2">{{ activity?.title || '' }}</h3>
                  <p class="text-gray-300 text-sm line-clamp-2">
                    {{ activity?.description || '' }}</p>
                </div>
              </div>
              <!-- 当没有活动时的默认显示 -->
              <div v-if="!activityList || activityList.length === 0"
                   class="w-full h-full bg-gray-800 flex items-center justify-center">
                <i class="fas fa-newspaper text-5xl text-gray-600"></i>
              </div>
            </div>
          </div>

          <!-- Side List -->
          <div class="space-y-4">
            <div v-for="(activity, id) in activityList.slice(1, 4)" :key="id"
                 class="cyber-card p-4 rounded-lg flex items-start space-x-4 cursor-pointer hover:bg-cyber-greenDim/20">
              <div class="flex-shrink-0 pt-1">
                <div class="w-2 h-2 rounded-full bg-cyber-green animate-pulse"></div>
              </div>
              <div>
                <span class="text-xs text-gray-500 font-mono block mb-1">{{ formatDateTime(activity.date) }}</span>
                <h4 class="text-white font-medium hover:text-cyber-green transition-colors text-sm">{{
                    activity.title
                  }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from 'vue';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {getActivityList} from "@/api/activity.js";

/**
 * 响应式变量，用于跟踪页面是否已滚动
 * @type {import('vue').Ref<boolean>}
 */
const isScrolled = ref(false);

/**
 * 响应式变量，用于控制移动端菜单的开合状态
 * @type {import('vue').Ref<boolean>}
 */
const mobileMenuOpen = ref(false);

/**
 * 响应式变量，用于标识当前活动的页面区域
 * @type {import('vue').Ref<string>}
 */
const activeSection = ref('hero');

// Hero Typing Effect
/**
 * 完整的打字文本内容
 * @type {string}
 */
const fullText = "Hack the Planet. Secure the Future.";

/**
 * 响应式变量，用于存储当前已显示的打字文本
 * @type {import('vue').Ref<string>}
 */
const typedText = ref("");

/**
 * 当前打字效果的字符索引位置
 * @type {number}
 */
let charIndex = 0;

/**
 * 学习方向数据数组
 * @type {Array<{title: string, desc: string, icon: string, difficulty: string}>}
 */
const tracks = [
  {
    title: 'Web Security',
    desc: 'SQL注入、XSS、RCE... 探索万维网背后的漏洞与防御。',
    icon: 'fas fa-globe',
    difficulty: '40%'
  },
  {
    title: 'Reverse Engineering',
    desc: '汇编语言、脱壳、逆向分析。从二进制层面理解软件逻辑。',
    icon: 'fas fa-cogs',
    difficulty: '85%'
  },
  {
    title: 'Pwnable',
    desc: '栈溢出、堆利用、内核攻击。二进制世界的最高艺术。',
    icon: 'fas fa-memory',
    difficulty: '95%'
  },
  {
    title: 'Crypto & Misc',
    desc: '密码学原理、隐写术、取证分析。脑洞与数学的结合。',
    icon: 'fas fa-key',
    difficulty: '60%'
  }
];

/**
 * 统计数据数组
 * @type {Array<{value: string, label: string}>}
 */
const stats = [
  {value: '30+', label: 'Members'},
  {value: '12', label: 'CTF Wins'},
  {value: '4', label: 'Workshops'},
  {value: '1024', label: 'Flags'}
];

/**
 * 活动列表数据
 * @type {import('vue').Ref<Array>}
 */
const activityList = ref([]);

/**
 * 获取活动列表数据并更新到activityList响应式变量中
 * 处理可能的API错误并提供默认空数组
 */
function getActivity() {
  getActivityList().then(res => {
    // 确保返回的数据是数组格式
    if (Array.isArray(res)) {
      activityList.value = res;
    } else if (res && Array.isArray(res.data)) {
      activityList.value = res.data;
    } else {
      activityList.value = []; // 设置为空数组作为后备
    }
  }).catch(err => {
    console.error('获取活动列表失败:', err);
    activityList.value = []; // 发生错误时设置为空数组
  })
}

// Scroll Handling
/**
 * 处理页面滚动事件，当滚动超过20像素时更新isScrolled状态
 */
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

/**
 * 平滑滚动到指定ID的页面元素
 * @param {string} id - 目标元素的ID
 */
const scrollTo = (id) => {
  if (id === '#') return;
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({behavior: 'smooth'});
    activeSection.value = id;
    mobileMenuOpen.value = false;
  }
};

/**
 * 移动端导航点击处理函数
 * @param {string} id - 目标元素的ID
 */
const mobileNavClick = (id) => {
  scrollTo(id);
};

// Typing Animation Logic
/**
 * 打字机效果实现函数
 * 逐个字符地将fullText的内容显示到typedText中
 */
const typeWriter = () => {
  if (charIndex < fullText.length) {
    typedText.value += fullText.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 100);
  }
};

// Matrix Rain Effect
/**
 * 初始化矩阵雨背景动画效果
 * @returns {number|null} 返回setInterval的ID或null（如果初始化失败）
 */
const initMatrix = () => {
  const canvas = document.getElementById('matrix-bg');
  if (!canvas) {
    console.error('Matrix canvas not found');
    return null;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('Could not get 2d context from canvas');
    return null;
  }

  // Set canvas size
  /**
   * 调整canvas大小以适应窗口尺寸
   */
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const letters = '0101010101010101010101ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  /**
   * 绘制矩阵雨动画帧
   */
  const draw = () => {
    // 更明显的黑色半透明层来创建拖尾效果
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00FF41'; // Cyber绿色文字
    ctx.font = `bold ${fontSize}px monospace`; // 添加bold使字符更清晰

    for (let i = 0; i < drops.length; i++) {
      const text = letters.charAt(Math.floor(Math.random() * letters.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      // 当到达底部或者随机重置时重置字符流
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  };

  return setInterval(draw, 100); // 调整速度让效果更明显
};

/**
 * 矩阵动画的定时器ID
 * @type {number}
 */
let matrixInterval;

/**
 * 格式化日期时间
 * @param {string|number|Date} date - 需要格式化的日期时间
 * @returns {string} 格式化后的日期时间字符串，格式为 YYYY-MM-DD HH:mm:ss
 */
const formatDateTime = (date) => {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    return ''; // 无效日期返回空字符串
  }

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

/**
 * Vue组件挂载时执行的生命周期钩子
 * 注册事件监听器，启动动画和打字效果
 */
onMounted(() => {
  getActivity();
  window.addEventListener('scroll', handleScroll);
  setTimeout(typeWriter, 500);
  matrixInterval = initMatrix();

  // 添加错误处理，以防canvas初始化失败
  if (!matrixInterval) {
    console.error('Matrix animation failed to start');
  }
});

/**
 * Vue组件卸载时执行的生命周期钩子
 * 清理事件监听器和定时器，防止内存泄漏
 */
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  if (matrixInterval) clearInterval(matrixInterval);
});
</script>

<style scoped>
.neon-text {
  text-shadow: 0 0 5px #00ff41, 0 0 10px #00ff41;
}

.neon-box {
  box-shadow: 0 0 5px #00ff41, inset 0 0 5px #00ff41;
}

.cyber-card {
  background: rgba(10, 15, 13, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 255, 65, 0.2);
  transition: all 0.3s ease;
}

.cyber-card:hover {
  border-color: #00ff41;
  transform: translateY(-5px);
  box-shadow: 0 0 15px rgba(0, 255, 65, 0.2);
}

/* Glitch Effect Utility */
.glitch-wrapper {
  position: relative;
}

canvas#matrix-bg {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  opacity: 0.5; /* 进一步增加不透明度使效果更明显 */
  pointer-events: none; /* 确保不会干扰其他元素交互 */
}
</style>