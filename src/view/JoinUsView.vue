<template>
  <div id="app" class="relative min-h-screen flex flex-col font-sans antialiased">
    <div class="matrix-bg"></div>

    <!-- Main Content -->
    <div class="flex-grow pt-24 pb-12 px-4 relative z-10">
      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

        <!-- Left Panel: Info & Manifesto (4 cols) -->
        <div class="lg:col-span-4 space-y-8">
          <div class="animate-fade-in-left">
            <h1 class="text-4xl font-bold text-white font-mono mb-2">
              RECRUITMENT_<br><span class="text-cyber-green neon-text">PROTOCOL_V2.0</span>
            </h1>
            <div class="h-1 w-20 bg-cyber-green mb-4"></div>
            <p class="text-gray-400 font-mono text-sm border-l-2 border-cyber-green pl-4 py-2 bg-cyber-greenDim/10">
              "Talk is cheap. Show me the code."
            </p>
          </div>

          <!-- Benefits List -->
          <div
              class="bg-cyber-dark/80 backdrop-blur border border-gray-800 p-6 rounded-lg relative overflow-hidden group hover:border-cyber-green/50 transition-colors duration-300">
            <div
                class="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity duration-500 transform group-hover:scale-110">
              <i class="fas fa-microchip text-8xl text-cyber-green"></i>
            </div>
            <h3 class="text-lg font-bold text-white font-mono mb-4 flex items-center">
              <span class="mr-2 text-cyber-green">></span> ACCESS_PRIVILEGES
            </h3>
            <ul class="space-y-4 text-sm text-gray-300 font-mono">
              <li class="flex items-start group/item">
                <span class="text-cyber-green mr-3 group-hover/item:animate-pulse">[+]</span>
                <span>专属内网靶场访问权限 (VPN Access)</span>
              </li>
              <li class="flex items-start group/item">
                <span class="text-cyber-green mr-3 group-hover/item:animate-pulse">[+]</span>
                <span>每周线下技术沙龙 (Tech Workshops)</span>
              </li>
              <li class="flex items-start group/item">
                <span class="text-cyber-green mr-3 group-hover/item:animate-pulse">[+]</span>
                <span>CTF 战队选拔资格 (Team Selection)</span>
              </li>
              <li class="flex items-start group/item">
                <span class="text-cyber-green mr-3 group-hover/item:animate-pulse">[+]</span>
                <span>前辈大厂内推机会 (Referrals)</span>
              </li>
            </ul>
          </div>

          <!-- CTF Hint -->
          <div class="border border-dashed border-gray-600 p-6 rounded-lg text-center bg-black/20">
            <p class="text-xs text-gray-500 font-mono mb-2 uppercase tracking-widest">Hidden Challenge Detected</p>
            <p class="text-sm text-gray-300 mb-2">
              <i class="fas fa-exclamation-triangle text-yellow-500 mr-2"></i>
              想要快速通过审核？
            </p>
            <p class="text-xs text-gray-500">
              尝试在 <span class="text-cyber-green font-bold">Console (F12)</span> 中寻找 FLAG。
            </p>
          </div>
        </div>

        <!-- Right Panel: The Form (8 cols) -->
        <div class="lg:col-span-8">
          <div
              class="bg-cyber-gray/90 backdrop-blur-md border border-gray-700 rounded-lg relative shadow-2xl overflow-hidden">
            <!-- Decorative Corners -->
            <div class="corner-border top-left"></div>
            <div class="corner-border bottom-right"></div>

            <!-- Terminal Header -->
            <div class="bg-cyber-dark px-4 py-3 border-b border-gray-700 flex justify-between items-center">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div class="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div class="text-xs font-mono text-gray-400">root@01websec:~/applications/new</div>
              <div class="w-10"></div> <!-- Spacer -->
            </div>

            <!-- Form Body -->
            <div class="p-6 md:p-8 relative">
              <div v-if="submitting" class="scan-line"></div>

              <el-form
                  ref="ruleFormRef"
                  :model="form"
                  :rules="rules"
                  class="space-y-6"
                  label-position="top"
              >
                <!-- Row 1 -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <el-form-item class="custom-label" label="姓名" prop="nickname">
                    <div class="relative group">
                      <el-input v-model="form.nickname" class="hacker-input" placeholder="张三"/>
                      <i class="fas fa-user absolute right-3 top-3 text-gray-600 group-hover:text-cyber-green transition-colors"></i>
                    </div>
                  </el-form-item>

                  <el-form-item class="custom-label" label="联系方式 (QQ/Email)" prop="contact">
                    <div class="relative group">
                      <el-input v-model="form.contact" class="hacker-input" placeholder="encrypted_signal"/>
                      <i class="fas fa-envelope absolute right-3 top-3 text-gray-600 group-hover:text-cyber-green transition-colors"></i>
                    </div>
                  </el-form-item>
                </div>

                <!-- Row 2 -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <el-form-item class="custom-label" label="专业年级" prop="major">
                    <div class="relative group">
                      <el-input v-model="form.major" class="hacker-input" placeholder="24信息安全3"/>
                      <i class="fas fa-graduation-cap absolute right-3 top-3 text-gray-600 group-hover:text-cyber-green transition-colors"></i>
                    </div>
                  </el-form-item>

                  <!-- Flag Input with Visual Feedback -->
                  <el-form-item class="custom-label" label="CTF Flag (Optional)" prop="flag">
                    <div class="relative group">
                      <el-input
                          v-model="form.flag"
                          :class="{'input-success': flagCorrect, 'input-error': form.flag && !flagCorrect}"
                          class="hacker-input"
                          placeholder="01CTF{...}"
                      />
                      <div class="absolute right-3 top-0 transition-colors">
                        <i v-if="flagCorrect" class="fas fa-check-circle text-cyber-green animate-pulse"></i>
                        <i v-else-if="form.flag" class="fas fa-lock text-red-500"></i>
                        <i v-else class="fas fa-flag text-gray-600 group-hover:text-yellow-500"></i>
                      </div>
                    </div>
                    <div v-if="flagCorrect"
                         class="absolute -bottom-5 right-0 text-[10px] text-cyber-green font-mono tracking-widest">
                      [ACCESS GRANTED]
                    </div>
                  </el-form-item>
                </div>

                <!-- Interactive Interests Selection -->
                <el-form-item class="custom-label" label="感兴趣的方向 (Select Modules)" prop="interests">
                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
                    <div
                        v-for="item in interestOptions"
                        :key="item.label"
                        :class="{'border-cyber-green bg-cyber-green/10 shadow-[0_0_15px_rgba(0,255,65,0.3)]': form.interests.includes(item.label)}"
                        class="cursor-pointer border border-gray-700 bg-black/40 rounded p-3 text-center transition-all duration-300 hover:border-cyber-green/50 hover:shadow-[0_0_10px_rgba(0,255,65,0.2)] group relative overflow-hidden"
                        @click="toggleInterest(item.label)"
                    >
                      <i :class="[item.icon, form.interests.includes(item.label) ? 'text-cyber-green' : 'text-gray-500']"
                         class="text-xl mb-2 block transition-colors group-hover:text-cyber-green"></i>
                      <span :class="form.interests.includes(item.label) ? 'text-white' : 'text-gray-400'"
                            class="text-xs font-mono block">{{
                          item.label
                        }}</span>

                      <!-- Corner accent for selected items -->
                      <div v-if="form.interests.includes(item.label)"
                           class="absolute top-0 right-0 w-2 h-2 bg-cyber-green"></div>
                    </div>
                  </div>
                </el-form-item>

                <!-- Bio / Manifesto -->
                <el-form-item class="custom-label" label="投名状 / Personal Manifesto" prop="bio">
                  <el-input
                      v-model="form.bio"
                      :rows="4"
                      class="hacker-input"
                      placeholder="// Tell us about your skills, github link, or why you want to join... &#10;// Console.log('Hello World');"
                      type="textarea"
                  />
                </el-form-item>

                <!-- Submit Area & Terminal Log -->
                <div class="pt-4 border-t border-gray-800">
                  <div class="flex flex-col md:flex-row items-center justify-between gap-4">
                    <!-- Status Display -->
                    <div
                        ref="terminalRef"
                        class="w-full md:w-2/3 h-24 bg-black rounded border border-gray-800 p-2 font-mono text-xs overflow-y-auto custom-scrollbar relative">
                      <div class="absolute top-0 right-2 text-[10px] text-gray-600">TERMINAL_OUTPUT</div>
                      <div v-if="logs.length === 0" class="text-gray-600 italic pt-6 text-center">
                        Waiting for input stream...
                      </div>
                      <div v-for="(log, i) in logs" :key="i" :class="log.color" class="mb-1">
                        {{ log.text }}
                      </div>
                      <div v-if="submitting" class="text-cyber-green animate-pulse">_</div>
                    </div>

                    <!-- Submit Button -->
                    <button
                        :disabled="submitting"
                        class="w-full md:w-auto flex-shrink-0 bg-cyber-green text-black font-bold font-mono py-4 px-8 rounded hover:bg-white hover:shadow-[0_0_20px_#00ff41] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                        type="button"
                        @click="submitForm(ruleFormRef)"
                    >
                      <span class="relative z-10 flex items-center justify-center gap-2">
                        <span v-if="!submitting">> EXECUTE_PAYLOAD.sh</span>
                        <span v-else>PROCESSING...</span>
                        <i v-if="!submitting"
                           class="fas fa-terminal group-hover:translate-x-1 transition-transform"></i>
                        <i v-else class="fas fa-circle-notch animate-spin"></i>
                      </span>
                      <!-- Button Glitch Effect Background -->
                      <div class="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    </button>
                  </div>
                </div>
              </el-form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, reactive, ref} from 'vue';
import {ElMessage} from 'element-plus';

// CTF Secret
const REAL_FLAG = "01CTF{w3lc0m3_n3w_member}";

const ruleFormRef = ref();
const submitting = ref(false);
const logs = ref([]);
const terminalRef = ref(null);

const form = reactive({
  nickname: '',
  contact: '',
  major: '',
  flag: '',
  interests: [],
  bio: ''
});

// 兴趣标签选项
const interestOptions = [
  {label: 'Web Security / WEB安全', icon: 'fas fa-globe'},
  {label: 'Reverse / 逆向', icon: 'fas fa-cogs'},
  {label: 'Cryptography / 密码学', icon: 'fas fa-key'},
  {label: 'Pwn & Binary / 二进制', icon: 'fas fa-memory'},
  {label: 'Red Teaming / 渗透', icon: 'fas fa-user-secret'},
  {label: 'DevSecOps / 安全开发', icon: 'fas fa-server'},
  {label: 'Officer / 事务官', icon: 'fas fa-briefcase'},
];

const rules = reactive({
  nickname: [{required: true, message: 'Identity required', trigger: 'blur'}],
  contact: [{required: true, message: 'Signal frequency required', trigger: 'blur'}],
  major: [{required: true, message: 'Origin required', trigger: 'blur'}],
  interests: [{type: 'array', required: true, message: 'Select at least one module', trigger: 'change'}],
  bio: [{required: true, message: 'Manifesto required', trigger: 'blur'}],
});

const flagCorrect = computed(() => form.flag === REAL_FLAG);

// 切换兴趣标签选择
const toggleInterest = (label) => {
  const index = form.interests.indexOf(label);
  if (index > -1) {
    form.interests.splice(index, 1);
  } else {
    form.interests.push(label);
  }
};

const addLog = (text, color = 'text-gray-400') => {
  logs.value.push({text: `[${new Date().toLocaleTimeString('en-GB')}] ${text}`, color});
  // 自动滚动到底部
  if (terminalRef.value) {
    setTimeout(() => {
      terminalRef.value.scrollTop = terminalRef.value.scrollHeight;
    }, 0);
  }
};

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      submitting.value = true;
      logs.value = []; // clear logs

      // Simulation sequence
      addLog("Initializing secure handshake...", "text-white");

      setTimeout(() => {
        addLog("Validating user identity signature...", "text-cyber-green");
      }, 400);

      setTimeout(() => {
        addLog("Encrypting payload with AES-256-GCM...", "text-yellow-500");
      }, 800);

      setTimeout(() => {
        if (flagCorrect.value) {
          addLog("[SUCCESS] ROOT FLAG DETECTED! Privilege Level: ADMIN", "text-cyber-green font-bold glow-text");
        } else {
          addLog("[INFO] Standard user privileges assigned.", "text-gray-400");
        }
      }, 1500);

      setTimeout(() => {
        addLog("Uploading data to secure vault...", "text-blue-400");
      }, 2000);

      setTimeout(() => {
        addLog("Connection terminated gracefully.", "text-red-400");
        submitting.value = false;

        ElMessage({
          message: flagCorrect.value
              ? 'ROOT ACCESS GRANTED: 欢迎加入核心组，请查收加密邮件。'
              : 'Application Sent: 申请已提交，请等待审核。',
          type: 'success',
          duration: 5000,
          showClose: true,
        });
      }, 2800);

    } else {
      addLog("[ERROR] Validation failed. Missing required fields.", "text-red-500");
      ElMessage.error('Input Error: 请检查必填项');
    }
  });
};

const goHome = () => {
  window.location.href = '/';
};

// Easter Egg
console.log(`
%c
   __  __          _
  / / / /_  ____ _(_)___  ____ _
 / /_/ / / / / __ \`/ / __ \/ __ \` /
/ __  / /_/ / /_/ / / / / / /_/ /
/_/ /_/\__,_/\__,_/_/_/ /_/\__, /
                          /____/

%c> HINT: The flag is ${REAL_FLAG}
> Do not share this with non-members.`,
    "font-family:monospace;color:#00ff41;font-weight:bold;font-size:16px;", "color:#fff;background:#000;padding:5px;");
</script>

<style scoped>
/* 矩阵背景动画 */
.matrix-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  opacity: 0.05;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300ff41' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

/* 霓虹文字效果 */
.neon-text {
  text-shadow: 0 0 5px rgba(0, 255, 65, 0.5), 0 0 10px rgba(0, 255, 65, 0.3);
}

.glow-text {
  text-shadow: 0 0 8px #00ff41;
}

/* 极客风格输入框覆盖 Element Plus 样式 */
:deep(.hacker-input .el-input__wrapper),
:deep(.hacker-input .el-textarea__inner) {
  background-color: rgba(13, 17, 23, 0.8) !important;
  box-shadow: none !important;
  border: 1px solid #30363d !important;
  border-radius: 4px !important;
  color: #e6edf3 !important;
  font-family: 'JetBrains Mono', monospace;
  padding-left: 12px;
  transition: all 0.3s ease;
}

:deep(.hacker-input .el-input__wrapper:hover),
:deep(.hacker-input .el-textarea__inner:hover) {
  border-color: #58a6ff !important;
}

:deep(.hacker-input .el-input__wrapper.is-focus),
:deep(.hacker-input .el-textarea__inner:focus) {
  border-color: #00ff41 !important;
  box-shadow: 0 0 8px rgba(0, 255, 65, 0.2) !important;
  background-color: rgba(13, 17, 23, 1) !important;
}

/* 特殊状态的输入框 */
:deep(.input-success .el-input__wrapper) {
  border-color: #00ff41 !important;
  box-shadow: 0 0 5px rgba(0, 255, 65, 0.2) inset !important;
}

:deep(.input-error .el-input__wrapper) {
  border-color: #ff2a2a !important;
}

/* 自定义 Form Label */
:deep(.el-form-item__label) {
  color: #8b949e !important;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
}

/* 扫描线动画 */
.scan-line {
  width: 100%;
  height: 2px;
  background: rgba(0, 255, 65, 0.5);
  position: absolute;
  z-index: 20;
  top: 0;
  left: 0;
  animation: scan 2s linear infinite;
  box-shadow: 0 0 10px rgba(0, 255, 65, 0.8);
}

@keyframes scan {
  0% {
    top: 0%;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

/* 装饰性边角 */
.corner-border {
  position: absolute;
  width: 30px;
  height: 30px;
  border: 2px solid #00ff41;
  transition: all 0.3s ease;
  z-index: 10;
  pointer-events: none;
}

.top-left {
  top: 0;
  left: 0;
  border-right: 0;
  border-bottom: 0;
  border-top-left-radius: 0.5rem;
}

.bottom-right {
  bottom: 0;
  right: 0;
  border-left: 0;
  border-top: 0;
  border-bottom-right-radius: 0.5rem;
}

/* 自定义滚动条 */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #0d1117;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #30363d;
  border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #00ff41;
}

/* 简单的进入动画 */
.animate-fade-in-left {
  animation: fadeInLeft 0.8s ease-out forwards;
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>