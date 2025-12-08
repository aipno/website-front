<script setup>
import {computed, reactive, ref} from 'vue';
import {ElMessage} from 'element-plus';

// CTF Secret
const REAL_FLAG = "0xSHIELD{w3lc0m3_n3wb13}";

const ruleFormRef = ref();
const submitting = ref(false);
const logs = ref([]);

const form = reactive({
  nickname: '',
  contact: '',
  major: '',
  flag: '',
  interests: [],
  bio: ''
});

const rules = reactive({
  nickname: [{required: true, message: 'Identity required', trigger: 'blur'}],
  contact: [{required: true, message: 'Signal frequency required', trigger: 'blur'}],
  major: [{required: true, message: 'Origin required', trigger: 'blur'}],
  interests: [{type: 'array', required: true, message: 'Select at least one target', trigger: 'change'}],
  bio: [{required: true, message: 'Manifesto required', trigger: 'blur'}],
});

const flagCorrect = computed(() => form.flag === REAL_FLAG);

const addLog = (text, color = 'text-gray-400') => {
  logs.value.push({text: `[${new Date().toLocaleTimeString()}] ${text}`, color});
  // Auto scroll would go here
};

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      submitting.value = true;
      logs.value = []; // clear logs

      // Simulation sequence
      addLog("Initializing handshake...", "text-white");

      setTimeout(() => {
        addLog("Encrypting payload with AES-256...", "text-yellow-500");
      }, 600);

      setTimeout(() => {
        if (flagCorrect.value) {
          addLog("ROOT FLAG DETECTED! Priority: CRITICAL", "text-hacker-green font-bold");
        } else {
          addLog("Standard user privileges assigned.", "text-gray-400");
        }
      }, 1200);

      setTimeout(() => {
        addLog("Payload delivered to server.", "text-blue-400");
        addLog("Connection terminated.", "text-red-400");

        submitting.value = false;
        ElMessage({
          message: flagCorrect.value
              ? 'ROOT ACCESS GRANTED: 欢迎加入核心组，请查收邮件。'
              : 'Application Sent: 申请已提交，请等待审核。',
          type: 'success',
          duration: 5000,
          showClose: true,
        });

        // Reset if needed
        // formEl.resetFields();
      }, 2500);

    } else {
      addLog("Error: Validation failed. Check input fields.", "text-red-500");
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
> Do not share this with non-members.
                `, "font-family:monospace;color:#00ff41;font-weight:bold;font-size:16px;", "color:#fff;background:#000;padding:5px;");
</script>

<template>
  <div id="app" class="relative min-h-screen flex flex-col">
    <div class="matrix-bg"></div>

    <!-- Main Content -->
    <div class="flex-grow pt-24 pb-12 px-4 relative z-10">
      <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">

        <!-- Left Panel: Info & Manifesto -->
        <div class="lg:col-span-2 space-y-8">
          <div>
            <h1 class="text-3xl font-bold text-white font-mono mb-2">
              RECRUITMENT_<br><span class="text-hacker-green">PROTOCOL_V2.0</span>
            </h1>
            <p class="text-gray-400 font-mono text-sm border-l-2 border-hacker-green pl-4 py-2 bg-green-900/10">
              "Talk is cheap. Show me the code."
            </p>
          </div>

          <!-- Benefits List -->
          <div class="bg-hacker-gray border border-gray-800 p-6 rounded relative overflow-hidden group">
            <div class="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
              <el-icon :size="60" color="#00ff41">
                <component :is="'Cpu'"/>
              </el-icon>
            </div>
            <h3 class="text-lg font-bold text-white font-mono mb-4">>> ACCESS_PRIVILEGES</h3>
            <ul class="space-y-3 text-sm text-gray-300 font-mono">
              <li class="flex items-start">
                <span class="text-hacker-green mr-2">[+]</span>
                <span>专属内网靶场访问权限 (VPN Access)</span>
              </li>
              <li class="flex items-start">
                <span class="text-hacker-green mr-2">[+]</span>
                <span>每周线下技术沙龙 (Tech Workshops)</span>
              </li>
              <li class="flex items-start">
                <span class="text-hacker-green mr-2">[+]</span>
                <span>CTF 战队选拔资格 (Team Selection)</span>
              </li>
              <li class="flex items-start">
                <span class="text-hacker-green mr-2">[+]</span>
                <span>前辈大厂内推机会 (Referrals)</span>
              </li>
            </ul>
          </div>

          <!-- CTF Hint -->
          <div class="border border-dashed border-gray-600 p-4 rounded text-center">
            <p class="text-xs text-gray-500 font-mono mb-2">HIDDEN_CHALLENGE_DETECTED</p>
            <p class="text-sm text-gray-300">
              <el-icon class="align-middle mr-1">
                <component :is="'WarnTriangleFilled'"/>
              </el-icon>
              想要快速通过审核？尝试在网页源代码或控制台中寻找 <span class="text-hacker-green">FLAG</span>。
            </p>
          </div>
        </div>

        <!-- Right Panel: The Form -->
        <div class="lg:col-span-3">
          <div class="bg-hacker-gray border border-gray-700 p-1 rounded relative shadow-2xl">
            <!-- Decorative Corners -->
            <div class="corner-border top-left"></div>
            <div class="corner-border bottom-right"></div>

            <!-- Terminal Header -->
            <div class="bg-hacker-dark px-4 py-2 border-b border-gray-700 flex justify-between items-center">
              <div class="text-xs font-mono text-gray-400">user@0xshield:~/applications/new</div>
              <div class="flex gap-2">
                <div class="w-3 h-3 rounded-full bg-gray-600"></div>
                <div class="w-3 h-3 rounded-full bg-gray-600"></div>
              </div>
            </div>

            <!-- Form Body -->
            <div class="p-6 md:p-8 relative overflow-hidden">
              <div v-if="submitting" class="scan-line"></div>

              <el-form
                  ref="ruleFormRef"
                  :model="form"
                  :rules="rules"
                  class="space-y-4"
                  label-position="top"
              >
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Nickname -->
                  <el-form-item label="ID / 代号" prop="nickname">
                    <el-input v-model="form.nickname" class="hacker-input" placeholder="Ghost_01">
                      <template #prefix><span class="input-prefix">$</span></template>
                    </el-input>
                  </el-form-item>

                  <!-- Contact -->
                  <el-form-item label="联系方式 (QQ/Email)" prop="contact">
                    <el-input v-model="form.contact" class="hacker-input" placeholder="encrypted_signal">
                      <template #prefix><span class="input-prefix">@</span></template>
                    </el-input>
                  </el-form-item>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Major -->
                  <el-form-item label="专业年级" prop="major">
                    <el-input v-model="form.major" class="hacker-input" placeholder="CS 2024">
                      <template #prefix><span class="input-prefix">#</span></template>
                    </el-input>
                  </el-form-item>

                  <!-- Flag Input (Optional) -->
                  <el-form-item label="CTF Flag (Optional)" prop="flag">
                    <el-input v-model="form.flag" class="hacker-input" placeholder="0xSHIELD{...}">
                      <template #prefix><span class="input-prefix text-yellow-500">?</span></template>
                    </el-input>
                  </el-form-item>
                </div>

                <!-- Interests -->
                <el-form-item label="感兴趣的方向 (Multi-Select)" prop="interests">
                  <div class="bg-hacker-dark p-3 border border-gray-700 w-full">
                    <el-checkbox-group v-model="form.interests">
                      <el-checkbox label="Web Security"/>
                      <el-checkbox label="Reverse Engineering"/>
                      <el-checkbox label="Crypto"/>
                      <el-checkbox label="Pwn / Binary"/>
                      <el-checkbox label="Mobile Security"/>
                      <el-checkbox label="IoT / Hardware"/>
                    </el-checkbox-group>
                  </div>
                </el-form-item>

                <!-- Bio / Manifesto -->
                <el-form-item label="投名状 / Personal Manifesto" prop="bio">
                  <el-input
                      v-model="form.bio"
                      :rows="4"
                      class="hacker-input"
                      placeholder="// Tell us about your skills, github link, or why you want to join..."
                      type="textarea"
                  />
                </el-form-item>

                <!-- Submit Area -->
                <div class="pt-4 flex items-center justify-between">
                                    <span :class="{'text-hacker-green': flagCorrect}"
                                          class="font-mono text-xs text-gray-500 hidden md:block">
                                        STATUS: {{ flagCorrect ? 'ROOT_ACCESS_GRANTED' : 'WAITING_FOR_INPUT' }}
                                    </span>
                  <el-button :loading="submitting" class="w-full md:w-auto" size="large" type="primary"
                             @click="submitForm(ruleFormRef)">
                    <span class="font-mono">> ./EXECUTE_PAYLOAD.sh</span>
                  </el-button>
                </div>
              </el-form>

              <!-- Fake Terminal Output (Visible on Submit) -->
              <div v-if="logs.length > 0"
                   class="mt-6 bg-black p-4 font-mono text-xs h-32 overflow-y-auto border-t border-gray-700">
                <div v-for="(log, i) in logs" :key="i" :class="log.color">
                  {{ log.text }}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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

/* 极客风格输入框覆盖 */
.hacker-input .el-input__wrapper,
.hacker-input .el-textarea__inner {
  background-color: #0d1117 !important;
  box-shadow: none !important;
  border: 1px solid #30363d !important;
  border-radius: 0 !important;
  color: #00ff41 !important;
  font-family: 'JetBrains Mono', monospace;
  padding-left: 10px;
}

.hacker-input .el-input__wrapper:hover,
.hacker-input .el-textarea__inner:hover {
  border-color: #2ea043 !important;
}

.hacker-input .el-input__wrapper.is-focus,
.hacker-input .el-textarea__inner:focus {
  border-color: #00ff41 !important;
  box-shadow: 0 0 5px rgba(0, 255, 65, 0.3) !important;
}

/* 前缀样式 */
.input-prefix {
  color: #484f58;
  margin-right: 8px;
  font-weight: bold;
}

.scan-line {
  width: 100%;
  height: 2px;
  background: rgba(0, 255, 65, 0.5);
  position: absolute;
  z-index: 10;
  top: 0;
  animation: scan 3s linear infinite;
  opacity: 0;
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

.corner-border {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid #00ff41;
  transition: all 0.3s ease;
}

.top-left {
  top: -2px;
  left: -2px;
  border-right: 0;
  border-bottom: 0;
}

.bottom-right {
  bottom: -2px;
  right: -2px;
  border-left: 0;
  border-top: 0;
}
</style>
