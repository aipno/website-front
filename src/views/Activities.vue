<template>
  <div class="activities">
    <section class="activities-hero">
      <div class="container">
        <h1>社团活动</h1>
      </div>
    </section>

    <section class="activities-content">
      <div class="container">
        <!-- 加载状态 -->
        <div v-if="loading" class="loading-container">
          <div class="skeleton" v-for="i in 6" :key="i"></div>
        </div>

        <!-- 错误状态 -->
        <div v-else-if="error" class="error-container">
          <div class="alert alert-error">
            <h3 class="alert-title">错误</h3>
            <p class="alert-description">{{ error }}</p>
            <button class="btn btn-primary btn-small" @click="fetchActivities">重试</button>
          </div>
        </div>

        <!-- 数据展示 -->
        <div v-else>
          <div class="tabs mb-4">
            <div class="tabs-nav">
              <button 
                :class="['tab-nav-item', activeTab === 'past' ? 'active' : '']"
                @click="activeTab = 'past'"
              >
                过往活动
              </button>
              <button 
                :class="['tab-nav-item', activeTab === 'upcoming' ? 'active' : '']"
                @click="activeTab = 'upcoming'"
              >
                即将举行
              </button>
            </div>
            <div class="tabs-content">
              <!-- 过往活动 -->
              <div v-if="activeTab === 'past'" class="tab-content">
                <div v-if="pastActivities.length > 0" class="activities-grid">
                  <div 
                    class="activity-card" 
                    v-for="activity in pastActivities" 
                    :key="activity.id"
                  >
                    <div class="activity-header">
                      <h3 class="activity-title">{{ item.title }}</h3>
                      <span class="activity-tag tag-past">已结束</span>
                    </div>
                    <p class="activity-date">{{ activity.date }}</p>
                    <p class="activity-description">{{ activity.description }}</p>
                  </div>
                </div>
                <div v-else class="empty-state">
                  <div class="empty-icon">📋</div>
                  <p class="empty-text">暂无过往活动记录</p>
                </div>
              </div>

              <!-- 即将举行 -->
              <div v-if="activeTab === 'upcoming'" class="tab-content">
                <div v-if="upcomingActivities.length > 0" class="activities-grid">
                  <div 
                    class="activity-card activity-card-upcoming" 
                    v-for="activity in upcomingActivities" 
                    :key="activity.id"
                  >
                    <div class="activity-header">
                      <h3 class="activity-title">{{ activity.title }}</h3>
                      <span class="activity-tag tag-upcoming">即将开始</span>
                    </div>
                    <p class="activity-date">{{ activity.date }}</p>
                    <p class="activity-description">{{ activity.description }}</p>
                  </div>
                </div>
                <div v-else class="empty-state">
                  <div class="empty-icon">📋</div>
                  <p class="empty-text">暂无即将举行的活动</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue'
import {getActivities} from '@/api/activity.js'

const loading = ref(true)
const error = ref(null)
const activities = ref([{
  id: 1,
  title: '零壹网络安全社团',
  description: '守护网络安全，共建美好未来',
  location: '',
  status: '',
  date: '',
  createdAt: '',
}])
const activeTab = ref('past')

// 过滤过往活动
const pastActivities = computed(() => {
  return activities.value.filter(activity => activity.status === '1')
})

// 过滤即将举行的活动
const upcomingActivities = computed(() => {
  return activities.value.filter(activity => activity.status === '0')
})

const fetchActivities = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await getActivities()
    activities.value = response.data
    console.log('Activities:', activities.value)
  } catch (err) {
    error.value = '获取活动数据失败，请稍后重试'
    console.error('Error fetching activities:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchActivities()
})
</script>

<style scoped>
/* 英雄区域样式 */
.activities-hero {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  padding: var(--spacing-64) 0;
  text-align: center;
  border-bottom: 1px solid var(--border-color);
}

.activities-hero h1 {
  font-size: var(--font-size-4xl);
  margin: 0;
  font-weight: 600;
}

/* 内容区域样式 */
.activities-content {
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

/* 标签页样式 */
.tabs {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
}

.tabs-nav {
  display: flex;
  border-bottom: 1px solid var(--border-color);
}

.tab-nav-item {
  padding: var(--spacing-16) var(--spacing-24);
  background: none;
  border: none;
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
  position: relative;
}

.tab-nav-item:hover {
  color: var(--primary-color);
}

.tab-nav-item.active {
  color: var(--primary-color);
  font-weight: 600;
}

.tab-nav-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: var(--primary-color);
}

.tabs-content {
  padding: var(--spacing-24);
}

.tab-content {
  display: block;
}

/* 活动网格 */
.activities-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-24);
}

/* 活动卡片 */
.activity-card {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-24);
  transition: all var(--transition-base);
}

.activity-card:hover {
  box-shadow: var(--shadow-base);
  transform: translateY(-2px);
}

.activity-card-upcoming {
  border-left: 4px solid var(--success-color);
}

.activity-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-16);
}

.activity-title {
  color: var(--text-primary);
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: 0;
  flex: 1;
  margin-right: var(--spacing-12);
}

.activity-tag {
  display: inline-block;
  padding: var(--spacing-4) var(--spacing-12);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-xs);
  font-weight: 600;
  text-transform: uppercase;
}

.tag-upcoming {
  background-color: rgba(76, 217, 100, 0.1);
  color: var(--success-color);
}

.tag-past {
  background-color: rgba(90, 200, 250, 0.1);
  color: var(--info-color);
}

.activity-date {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  font-weight: 500;
  margin-bottom: var(--spacing-12);
  display: block;
}

.activity-description {
  color: var(--text-secondary);
  line-height: var(--line-height-base);
  font-size: var(--font-size-sm);
  margin: 0;
}

/* 空状态样式 */
.empty-state {
  text-align: center;
  padding: var(--spacing-64) 0;
  color: var(--text-tertiary);
}

.empty-icon {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--spacing-16);
}

.empty-text {
  font-size: var(--font-size-base);
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .activities-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .activities-hero {
    padding: var(--spacing-32) 0;
  }
  
  .activities-content {
    padding: var(--spacing-32) 0;
  }
  
  .activities-grid {
    grid-template-columns: 1fr;
  }
  
  .tabs-content {
    padding: var(--spacing-16);
  }
  
  .tab-nav-item {
    padding: var(--spacing-12) var(--spacing-16);
    font-size: var(--font-size-sm);
  }
}
</style>