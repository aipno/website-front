<template>
  <div class="contact">
    <section class="contact-hero">
      <div class="container">
        <h1>联系我们</h1>
      </div>
    </section>

    <section class="contact-content">
      <div class="container">
        <!-- 加载状态 -->
        <div v-if="loading" class="loading-container">
          <div class="skeleton" v-for="i in 6" :key="i"></div>
        </div>

        <!-- 错误状态 -->
        <div v-else-if="error" class="error-container">
          <div class="alert error">
            <div class="alert-content">
              <h3>错误</h3>
              <p>{{ error }}</p>
            </div>
            <button class="btn btn-primary btn-small" @click="fetchContactInfo">重试</button>
          </div>
        </div>

        <!-- 数据展示 -->
        <div v-else>
          <div class="contact-info">
            <h2>联系方式</h2>
            <div class="card mb-6">
              <div class="contact-details-grid">
                <div v-for="(item, index) in contactInfo.details" :key="index" class="contact-item">
                  <h3>{{ item.type }}</h3>
                  <p>{{ item.value }}</p>
                </div>
              </div>
            </div>

            <h2>社交媒体</h2>
            <div class="card mb-6">
              <div class="social-links">
                <a
                  :href="link.url"
                  v-for="(link, index) in contactInfo.socialLinks"
                  :key="index"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="social-link"
                >
                  {{ link.name }}
                </a>
              </div>
            </div>
          </div>

          <div class="join-us">
            <h2>加入我们</h2>
            <div class="card">
              <p class="join-description">{{ contactInfo.joinUs.description }}</p>
              <h3>加入条件</h3>
              <ul class="contact-list">
                <li v-for="(condition, index) in contactInfo.joinUs.conditions" :key="index" class="contact-list-item">
                  {{ condition }}
                </li>
              </ul>
              <h3>加入方式</h3>
              <ol class="contact-list">
                <li v-for="(step, index) in contactInfo.joinUs.steps" :key="index" class="contact-list-item">
                  {{ step }}
                </li>
              </ol>
              <div class="join-action">
                <button class="btn btn-primary" @click="downloadApplication">下载申请表</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getContactInfo } from '@/api/contact.js'

const loading = ref(true)
const error = ref(null)
const contactInfo = ref({
  details: [],
  socialLinks: [],
  joinUs: {
    description: '',
    conditions: [],
    steps: [],
    applicationUrl: '#'
  }
})

const fetchContactInfo = async () => {
  loading.value = true
  error.value = null
  try {
    // 调用API获取联系信息
    const data = await getContactInfo()
    contactInfo.value = data
  } catch (err) {
    error.value = '获取联系信息失败，请稍后重试'
    console.error('Error fetching contact info:', err)
  } finally {
    loading.value = false
  }
}

const downloadApplication = () => {
  // 模拟下载申请表
  window.open(contactInfo.value.joinUs.applicationUrl, '_blank')
}

onMounted(() => {
  fetchContactInfo()
})
</script>

<style scoped>
/* 英雄区域样式 */
.contact-hero {
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: var(--spacing-8) 0;
  text-align: center;
  margin-bottom: var(--spacing-8);
  box-shadow: var(--shadow-sm);
}

.contact-hero h1 {
  font-size: var(--font-size-3xl);
  margin: 0;
  font-weight: var(--font-weight-semibold);
  opacity: 0.95;
}

/* 内容区域样式 */
.contact-content {
  margin-bottom: var(--spacing-8);
}

/* 加载状态样式 */
.loading-container {
  margin: var(--spacing-6) 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.skeleton {
  height: 120px;
  background: linear-gradient(90deg, var(--color-gray-100) 25%, var(--color-gray-200) 50%, var(--color-gray-100) 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: var(--radius-md);
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* 错误状态样式 */
.error-container {
  margin: var(--spacing-6) 0;
}

.alert {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
  background-color: var(--color-red-50);
  border-left: 4px solid var(--color-red-500);
}

.alert.error {
  background-color: var(--color-red-50);
  border-left-color: var(--color-red-500);
}

.alert-content h3 {
  margin: 0 0 var(--spacing-1) 0;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-red-700);
}

.alert-content p {
  margin: 0;
  color: var(--color-red-600);
}

/* 卡片样式 */
.card {
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-6);
  transition: all 0.3s ease;
  border: 1px solid var(--color-gray-100);
}

.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.mb-6 {
  margin-bottom: var(--spacing-6);
}

/* 标题样式 */
h2 {
  color: var(--color-gray-800);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-6);
  text-align: center;
}

/* 联系信息网格 */
.contact-details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-6);
}

/* 联系信息项 */
.contact-item {
  text-align: center;
  padding: var(--spacing-5);
  transition: all 0.3s ease;
  border-radius: var(--radius-md);
  background-color: var(--color-gray-50);
}

.contact-item:hover {
  background-color: var(--color-gray-100);
  transform: translateY(-2px);
}

.contact-item h3 {
  margin: 0 0 var(--spacing-2) 0;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-800);
}

.contact-item p {
  margin: 0;
  color: var(--color-gray-600);
  line-height: 1.6;
  font-size: var(--font-size-sm);
}

/* 社交媒体链接 */
.social-links {
  display: flex;
  gap: var(--spacing-6);
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-4) 0;
}

.social-link {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--color-primary);
  text-decoration: none;
  transition: all 0.3s ease;
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-sm);
}

.social-link:hover {
  color: var(--color-primary-dark);
  background-color: var(--color-primary-light);
  opacity: 0.9;
}

/* 加入我们区域 */
.join-us h3 {
  color: var(--color-gray-800);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  margin: var(--spacing-6) 0 var(--spacing-3) 0;
}

.join-description {
  color: var(--color-gray-700);
  line-height: 1.7;
  font-size: var(--font-size-base);
  margin-bottom: var(--spacing-4);
}

/* 列表样式 */
.contact-list {
  margin-bottom: var(--spacing-6);
  padding-left: var(--spacing-6);
}

.contact-list-item {
  margin-bottom: var(--spacing-2);
  line-height: 1.7;
  color: var(--color-gray-600);
  font-size: var(--font-size-sm);
}

/* 加入行动区域 */
.join-action {
  margin-top: var(--spacing-6);
  display: flex;
  justify-content: center;
}

/* 按钮样式 */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  text-decoration: none;
}

.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.btn-primary:hover {
  background-color: var(--color-primary-dark);
  box-shadow: var(--shadow-md);
}

.btn-small {
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-size-sm);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .contact-details-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
  }
  
  .social-links {
    gap: var(--spacing-4);
    flex-direction: column;
    align-items: stretch;
  }
  
  .social-link {
    justify-content: center;
  }
  
  .alert {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-3);
  }
}
</style>