<script setup>

const historyLogs = [
  {
    year: '2023',
    tag: 'MILESTONE',
    title: 'CISCN 全国一等奖',
    content: '战队主力 "0xAlpha" 在第十六届全国大学生信息安全竞赛中突围，获得华南赛区特等奖及全国总决赛一等奖。'
  },
  {
    year: '2022',
    tag: 'EXPANSION',
    title: '实验室 2.0 启用',
    content: '社团获得学院支持，迁入全新的网络安全攻防实验室，部署了私有云靶场平台，服务器算力提升 400%。'
  },
  {
    year: '2021',
    tag: 'INIT',
    title: '社团成立',
    content: '三位创始人以 "White Hat, Black Heart" 为口号，在旧机房成立了 0xShield。首批招新 20 人。'
  }
];

const members = [
  {
    id: 'UID_001',
    name: 'Alex "Root"',
    role: 'President / Pwn',
    avatarIcon: 'fas fa-user-astronaut',
    skills: [
      {name: 'Binary Exploitation', level: 95},
      {name: 'C/C++', level: 90},
      {name: 'Kernel', level: 80}
    ]
  },
  {
    id: 'UID_002',
    name: 'Sarah "Cipher"',
    role: 'Vice President / Crypto',
    avatarIcon: 'fas fa-user-secret',
    skills: [
      {name: 'Cryptography', level: 98},
      {name: 'Python', level: 95},
      {name: 'Mathematics', level: 85}
    ]
  },
  {
    id: 'UID_003',
    name: 'Mike "Spider"',
    role: 'Web Head / Penetration',
    avatarIcon: 'fas fa-user-ninja',
    skills: [
      {name: 'Web Security', level: 92},
      {name: 'Network Pentest', level: 88},
      {name: 'Java', level: 75}
    ]
  },
  {
    id: 'UID_004',
    name: 'Vera "Re"',
    role: 'Reverse Engineering',
    avatarIcon: 'fas fa-bug',
    skills: [
      {name: 'Assembly', level: 90},
      {name: 'Malware Analysis', level: 85},
      {name: 'Android', level: 70}
    ]
  },
  {
    id: 'UID_005',
    name: 'Ghost',
    role: 'Misc / Forensics',
    avatarIcon: 'fas fa-ghost',
    skills: [
      {name: 'Data Forensics', level: 85},
      {name: 'Steganography', level: 90},
      {name: 'Bash Scripting', level: 80}
    ]
  },
  {
    id: 'UID_006',
    name: 'Bot_404',
    role: 'Infrastructure',
    avatarIcon: 'fas fa-robot',
    skills: [
      {name: 'DevOps', level: 95},
      {name: 'Docker/K8s', level: 90},
      {name: 'Network Admin', level: 85}
    ]
  }
];
</script>

<template>
  <div class="relative min-h-screen flex flex-col">
    <div class="scanline"></div>

    <!-- Main Content -->
    <main class="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">

      <!-- Header Section -->
      <section class="mb-20">
        <h1 class="text-4xl md:text-6xl font-bold font-mono mb-4 text-white glitch" data-text="WHOAMI">WHOAMI</h1>
        <div class="h-1 w-20 bg-cyber-green mb-8"></div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Terminal Text Block -->
          <div
              class="bg-cyber-dark border border-gray-800 rounded p-6 shadow-lg font-mono text-sm md:text-base relative overflow-hidden group">
            <div class="flex items-center gap-2 mb-4 border-b border-gray-800 pb-2">
              <div class="w-3 h-3 rounded-full bg-red-500"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div class="w-3 h-3 rounded-full bg-green-500"></div>
              <span class="ml-2 text-gray-500 text-xs">root@0xshield:~/mission</span>
            </div>
            <div class="text-gray-300 space-y-4">
              <p><span class="text-cyber-green">root@0xshield:~$</span> cat description.txt</p>
              <p class="leading-relaxed">
                0xShield 是一个由热衷于网络攻防技术的极客组成的学生社团。我们信奉“以攻促防”的理念，致力于探索二进制世界的奥秘。
                <br><br>
                在这里，没有枯燥的理论，只有真实的靶场、高强度的 CTF 训练以及通宵达旦的代码审计。我们是校园网络安全的守护者，也是未来的白帽子黑客。
              </p>
              <p class="terminal-cursor"><span class="text-cyber-green">root@0xshield:~$</span> <span
                  class="text-gray-500">_</span></p>
            </div>
            <!-- Corner decorations -->
            <div class="absolute top-0 right-0 p-2 text-cyber-green/20 text-4xl"><i class="fas fa-terminal"></i></div>
          </div>

          <!-- Abstract Visual -->
          <div
              class="relative h-64 lg:h-80 flex items-center justify-center border border-cyber-green/20 bg-cyber-greenDim/5 rounded-lg">
            <div class="absolute inset-0 flex items-center justify-center opacity-20 text-cyber-green">
              <i class="fas fa-fingerprint text-9xl"></i>
            </div>
            <div class="text-center z-10">
              <div class="text-5xl font-mono font-bold text-white mb-2 counter">101010</div>
              <div class="text-cyber-green font-mono text-sm tracking-[0.3em]">SECURE CONNECTION</div>
            </div>
          </div>
        </div>
      </section>

      <!-- History / Timeline Section -->
      <section class="mb-20">
        <h2 class="text-2xl font-bold font-mono mb-8 text-white flex items-center">
          <span class="text-cyber-green mr-2">./</span> HISTORY_LOGS
        </h2>

        <div class="relative border-l border-gray-800 ml-4 md:ml-6 space-y-12">
          <div v-for="(log, index) in historyLogs" :key="index" class="relative pl-8 md:pl-12 group">
            <!-- Dot on timeline -->
            <div
                class="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-gray-600 group-hover:bg-cyber-green group-hover:shadow-[0_0_10px_#00ff41] transition-all duration-300"></div>

            <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
              <span class="text-cyber-green font-mono font-bold text-lg">{{ log.year }}</span>
              <span class="text-xs text-gray-500 font-mono border border-gray-800 px-2 py-0.5 rounded">{{
                  log.tag
                }}</span>
            </div>
            <h3 class="text-xl text-white font-bold mb-2">{{ log.title }}</h3>
            <p class="text-gray-400 text-sm leading-relaxed max-w-3xl">{{ log.content }}</p>
          </div>
        </div>
      </section>

      <!-- Team Section -->
      <section class="mb-20">
        <div class="flex justify-between items-end mb-10">
          <h2 class="text-2xl font-bold font-mono text-white flex items-center">
            <span class="text-cyber-green mr-2">./</span> SUDO_USERS
          </h2>
          <div class="text-xs text-gray-500 font-mono hidden sm:block">Found {{ members.length }} active sessions</div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="member in members" :key="member.id"
               class="group relative bg-cyber-gray tech-border p-1 transition-transform duration-300 hover:-translate-y-1">
            <!-- Glowing Border Effect on Hover -->
            <div
                class="absolute inset-0 bg-cyber-green opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style="clip-path: inherit; z-index: -1;"></div>

            <div class="bg-cyber-dark h-full p-6 relative overflow-hidden"
                 style="clip-path: polygon(0 0, 100% 0, 100% calc(100% - 19px), calc(100% - 19px) 100%, 0 100%);">
              <!-- Top Decoration -->
              <div class="absolute top-0 right-0 p-2">
                <i class="fas fa-wifi text-gray-700 group-hover:text-cyber-green transition-colors"></i>
              </div>

              <div class="flex items-center space-x-4 mb-6">
                <div
                    class="w-16 h-16 rounded bg-gray-800 border border-gray-600 flex items-center justify-center overflow-hidden">
                  <i :class="member.avatarIcon" class="text-2xl text-gray-400"></i>
                </div>
                <div>
                  <h3 class="text-white font-mono font-bold text-lg">{{ member.name }}</h3>
                  <div class="text-cyber-green text-xs font-mono uppercase">{{ member.role }}</div>
                </div>
              </div>

              <!-- Skill Bars -->
              <div class="space-y-3 font-mono text-xs">
                <div v-for="(skill, sIndex) in member.skills" :key="sIndex">
                  <div class="flex justify-between text-gray-400 mb-1">
                    <span>{{ skill.name }}</span>
                    <span>{{ skill.level }}%</span>
                  </div>
                  <div class="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                    <div
                        :style="{ width: skill.level + '%' }"
                        class="h-full bg-cyber-green group-hover:shadow-[0_0_8px_#00ff41] transition-all duration-1000 ease-out"></div>
                  </div>
                </div>
              </div>

              <!-- ID Badge -->
              <div class="mt-6 pt-4 border-t border-gray-800 flex justify-between items-center">
                <span class="text-[10px] text-gray-600 font-mono">ID: {{ member.id }}</span>
                <i class="fab fa-github text-gray-400 hover:text-white cursor-pointer"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA / Lab Environment -->
      <section class="relative rounded-xl overflow-hidden border border-cyber-green/30 bg-cyber-dark">
        <div
            class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div class="relative z-10 px-6 py-12 md:px-12 md:py-16 text-center">
          <i class="fas fa-network-wired text-5xl text-cyber-green mb-6 opacity-80"></i>
          <h2 class="text-3xl md:text-4xl font-bold text-white font-mono mb-4">加入我们的实验室</h2>
          <p class="text-gray-400 max-w-2xl mx-auto mb-8 font-mono">
            我们每周二、四晚上在<span class="text-white">信息楼 404</span>举行线下沙龙。带上你的笔记本电脑，连接我们的内网靶场，开始你的黑客之旅。
          </p>
          <button
              class="bg-transparent hover:bg-cyber-green text-cyber-green hover:text-cyber-black font-mono font-bold py-3 px-8 border border-cyber-green rounded transition-all duration-300 hover:shadow-[0_0_15px_#00ff41]">
            APPLY_NOW()
          </button>
        </div>
      </section>
    </main>

    <!-- Simple Footer -->
    <footer class="border-t border-gray-900 bg-cyber-black py-8 text-center">
      <p class="text-gray-600 font-mono text-sm">
        <span class="text-cyber-green">&lt;/&gt;</span> with <i class="fas fa-heart text-red-900"></i> by 0xShield Dev
        Team
      </p>
    </footer>
  </div>
</template>

<style scoped>
/* Scanline Effect */
.scanline {
  width: 100%;
  height: 100px;
  z-index: 10;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 255, 65, 0.04) 50%, rgba(0, 0, 0, 0) 100%);
  opacity: 0.1;
  position: fixed;
  bottom: 100%;
  animation: scanline 10s linear infinite;
  pointer-events: none;
}

@keyframes scanline {
  0% {
    bottom: 100%;
  }
  100% {
    bottom: -100px;
  }
}

/* Glitch Text */
.glitch {
  position: relative;
}

.glitch::before, .glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #050505;
}

.glitch::before {
  left: 2px;
  text-shadow: -1px 0 #ff00c1;
  clip: rect(44px, 450px, 56px, 0);
  animation: glitch-anim 5s infinite linear alternate-reverse;
}

.glitch::after {
  left: -2px;
  text-shadow: -1px 0 #00fff9;
  clip: rect(44px, 450px, 56px, 0);
  animation: glitch-anim2 5s infinite linear alternate-reverse;
}

@keyframes glitch-anim {
  0% {
    clip: rect(38px, 9999px, 49px, 0);
  }
  5% {
    clip: rect(12px, 9999px, 98px, 0);
  }
  10% {
    clip: rect(65px, 9999px, 14px, 0);
  }
  100% {
    clip: rect(44px, 9999px, 56px, 0);
  }
}

@keyframes glitch-anim2 {
  0% {
    clip: rect(16px, 9999px, 86px, 0);
  }
  5% {
    clip: rect(58px, 9999px, 29px, 0);
  }
  10% {
    clip: rect(8px, 9999px, 91px, 0);
  }
  100% {
    clip: rect(2px, 9999px, 62px, 0);
  }
}

.terminal-cursor::after {
  content: '';
  display: inline-block;
  width: 10px;
  height: 1.2em;
  background-color: #00ff41;
  animation: blink 1s step-end infinite;
  vertical-align: text-bottom;
  margin-left: 4px;
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.tech-border {
  position: relative;
  clip-path: polygon(
      0 0,
      100% 0,
      100% calc(100% - 20px),
      calc(100% - 20px) 100%,
      0 100%
  );
}

.tech-border::before {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, transparent 50%, #00ff41 50%);
  opacity: 0.5;
}
</style>
