<template>
  <div class="about">
    <section class="about-hero">
      <div class="container">
        <h1 class="text-4xl md:text-5xl font-bold text-center text-primary">关于我们</h1>
      </div>
    </section>

    <section class="about-content py-16 md:py-24">
      <div class="container">
        <!-- 加载状态 -->
        <div v-if="loading" class="loading-container">
          <div v-for="i in 6" :key="i" class="skeleton"></div>
        </div>

        <!-- 错误状态 -->
        <div v-else-if="error" class="error-container">
          <div class="alert alert-error">
            <h3 class="alert-title">错误</h3>
            <p class="alert-description">{{ error }}</p>
            <button class="btn btn-primary btn-small" @click="fetchAboutInfo">重试</button>
          </div>
        </div>

        <!-- 数据展示 -->
        <div v-else>
          <!-- 社团背景 -->
          <div class="section mb-16">
            <div class="section-header mb-12 text-center">
              <h2 class="section-title">社团背景</h2>
              <div class="section-divider mx-auto w-20 h-1 bg-primary mt-4"></div>
            </div>
            <div class="card">
              <p class="text-lg leading-relaxed">{{ aboutInfo.background }}</p>
            </div>
          </div>

          <!-- 社团宗旨 -->
          <div class="section mb-16">
            <div class="section-header mb-12 text-center">
              <h2 class="section-title">社团宗旨</h2>
              <div class="section-divider mx-auto w-20 h-1 bg-primary mt-4"></div>
            </div>
            <div class="card">
              <div class="description-list">
                <div class="description-item">
                  <div class="description-label">我们的宗旨是：</div>
                  <div class="description-content">{{ aboutInfo.missionsJson }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 发展历程 -->
          <div class="section mb-16">
            <div class="section-header mb-12 text-center">
              <h2 class="section-title">发展历程</h2>
              <div class="section-divider mx-auto w-20 h-1 bg-primary mt-4"></div>
            </div>
            <div class="card">
              <div class="timeline">
                <div v-for="(item, index) in aboutInfo.history" :key="index" class="timeline-item">
                  <div class="timeline-node"></div>
                  <div class="timeline-content">
                    <div class="timeline-timestamp">{{ item.year }}</div>
                    <div class="timeline-description">{{ item.description }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 组织结构 -->
          <div class="section mb-16">
            <div class="section-header mb-12 text-center">
              <h2 class="section-title">组织结构</h2>
              <div class="section-divider mx-auto w-20 h-1 bg-primary mt-4"></div>
            </div>
            <div class="organization-grid">
              <div v-for="(dept, index) in aboutInfo.organization" :key="index" class="dept-card">
                <h3 class="dept-name">{{ dept.name }}</h3>
                <p class="dept-description">{{ dept.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {getAboutInfo} from '@/api/about.js'

const loading = ref(true)
const error = ref(null)
const aboutInfo = ref({
  background: '',
  missionsJson: '',
  history: [],
  organization: []
})

const fetchAboutInfo = async () => {
  loading.value = true
  error.value = null
  try {
    // 调用API获取社团信息
    const response = await getAboutInfo()
    aboutInfo.value = response.data
  } catch (err) {
    error.value = '获取社团信息失败，请稍后重试'
    console.error('Error fetching about info:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchAboutInfo()
})
</script>

<style scoped>
/* 英雄区域样式 */
.about-hero {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  padding: var(--spacing-64) 0;
  text-align: center;
  border-bottom: 1px solid var(--border-color);
}

.about-hero h1 {
  font-size: var(--font-size-4xl);
  margin: 0;
  font-weight: 600;
}

/* 内容区域样式 */
.about-content {
  padding: var(--spacing-64) 0;
}

/* 加载状态样式 */
.loading-container {
  margin: var(--spacing-32) 0;
}

.skeleton {
  height: 20px;
  background-color: var(--bg-tertiary);
  border-radius: var(--border-radius-base);
  margin-bottom: var(--spacing-16);
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* 错误状态样式 */
.error-container {
  margin: var(--spacing-32) 0;
}

.alert {
  padding: var(--spacing-16);
  border-radius: var(--border-radius-lg);
  border-left: 4px solid;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-12);
}

.alert-error {
  background-color: rgba(255, 59, 48, 0.1);
  border-left-color: var(--error-color);
  color: var(--error-color);
}

.alert-title {
  font-size: var(--font-size-base);
  font-weight: 600;
  margin: 0;
}

.alert-description {
  font-size: var(--font-size-sm);
  margin: 0;
  color: var(--text-secondary);
}

/* 卡片间距 */
.mb-4 {
  margin-bottom: var(--spacing-32);
}

/* 标题样式 */
.section-title {
  color: var(--text-primary);
  font-size: var(--font-size-3xl);
  font-weight: 600;
  margin-bottom: var(--spacing-32);
  text-align: center;
}

/* 卡片样式 */
.card {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-24);
  transition: box-shadow var(--transition-base);
}

.card:hover {
  box-shadow: var(--shadow-base);
}

/* 文本样式 */
p {
  line-height: var(--line-height-base);
  color: var(--text-secondary);
  font-size: var(--font-size-base);
}

/* 描述列表样式 */
.description-list {
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius-base);
  overflow: hidden;
}

.description-item {
  display: flex;
  border-bottom: 1px solid var(--border-color);
}

.description-item:last-child {
  border-bottom: none;
}

.description-label {
  flex: 0 0 120px;
  padding: var(--spacing-12);
  background-color: var(--bg-tertiary);
  font-weight: 600;
  color: var(--text-primary);
}

.description-content {
  flex: 1;
  padding: var(--spacing-12);
  color: var(--text-secondary);
  line-height: var(--line-height-base);
}

/* 时间线样式 */
.timeline {
  position: relative;
  padding-left: var(--spacing-24);
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: var(--border-color);
}

.timeline-item {
  position: relative;
  margin-bottom: var(--spacing-32);
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-node {
  position: absolute;
  left: calc(var(--spacing-24) * -1);
  top: 0;
  width: 12px;
  height: 12px;
  background-color: var(--primary-color);
  border-radius: 50%;
  transform: translateX(-50%);
  border: 2px solid var(--bg-primary);
  box-shadow: 0 0 0 2px var(--primary-color);
}

.timeline-content {
  padding-left: var(--spacing-16);
}

.timeline-timestamp {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-8);
}

.timeline-description {
  font-size: var(--font-size-base);
  color: var(--text-secondary);
  line-height: var(--line-height-base);
}

/* 组织结构样式 */
.organization-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-24);
}

.dept-card {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-24);
  transition: all var(--transition-base);
}

.dept-card:hover {
  box-shadow: var(--shadow-base);
  transform: translateY(-2px);
}

.dept-name {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-12);
}

.dept-description {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: var(--line-height-base);
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .organization-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .about-hero {
    padding: var(--spacing-32) 0;
  }

  .about-content {
    padding: var(--spacing-32) 0;
  }

  .section-title {
    font-size: var(--font-size-2xl);
  }

  .organization-grid {
    grid-template-columns: 1fr;
  }

  .description-item {
    flex-direction: column;
  }

  .description-label {
    flex: none;
    width: 100%;
  }
}
</style>