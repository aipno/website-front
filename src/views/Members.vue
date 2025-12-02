<template>
  <div class="members">
    <section class="members-hero">
      <div class="container">
        <h1>社团成员</h1>
      </div>
    </section>

    <section class="members-content">
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
            <button class="btn btn-primary btn-small" @click="fetchMembers">重试</button>
          </div>
        </div>

        <!-- 数据展示 -->
        <div v-else>
          <!-- 标签页 -->
          <div class="tabs">
            <div class="tabs-nav">
              <button 
                v-for="tab in tabs" 
                :key="tab.name" 
                :class="['tab-item', { active: activeTab === tab.name }]"
                @click="activeTab = tab.name"
              >
                {{ tab.label }}
              </button>
            </div>
            <div class="tabs-content">
              <!-- 核心成员 -->
              <div v-if="activeTab === 'core'" class="tab-panel">
                <div v-if="coreMembers.length > 0" class="members-grid">
                  <div v-for="member in coreMembers" :key="member.id" class="member-card">
                    <div class="member-avatar-container">
                      <div class="member-avatar" :style="{ backgroundImage: member.avatar ? `url(${member.avatar})` : 'none' }">
                        {{ !member.avatar ? member.name.charAt(0) : '' }}
                      </div>
                    </div>
                    <div class="member-info">
                      <h3>{{ member.name }}</h3>
                      <p class="position">{{ member.position }}</p>
                      <p v-if="member.description">{{ member.description }}</p>
                    </div>
                  </div>
                </div>
                <div v-else class="empty-state">
                  <p>暂无核心成员记录</p>
                </div>
              </div>

              <!-- 成员风采 -->
              <div v-if="activeTab === 'general'" class="tab-panel">
                <div v-if="generalMembers.length > 0" class="members-grid">
                  <div v-for="member in generalMembers" :key="member.id" class="member-card">
                    <div class="member-avatar-container">
                      <div class="member-avatar" :style="{ backgroundImage: member.avatar ? `url(${member.avatar})` : 'none' }">
                        {{ !member.avatar ? member.name.charAt(0) : '' }}
                      </div>
                    </div>
                    <div class="member-info">
                      <h3>{{ member.name }}</h3>
                      <p class="position">{{ member.position }}</p>
                    </div>
                  </div>
                </div>
                <div v-else class="empty-state">
                  <p>暂无普通成员记录</p>
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
import { ref, computed, onMounted } from 'vue'
import { getMembers } from '@/api/member.js'

const loading = ref(true)
const error = ref(null)
const members = ref([])
const activeTab = ref('core')

// 标签页数据
const tabs = ref([
  { name: 'core', label: '核心成员' },
  { name: 'general', label: '成员风采' }
])

// 过滤核心成员
const coreMembers = computed(() => {
  return members.value.filter(member => member.type === 'core')
})

// 过滤普通成员
const generalMembers = computed(() => {
  return members.value.filter(member => member.type === 'general')
})

const fetchMembers = async () => {
  loading.value = true
  error.value = null
  try {
    // 调用API获取所有成员
    const data = await getMembers()
    members.value = data
  } catch (err) {
    error.value = '获取成员数据失败，请稍后重试'
    console.error('Error fetching members:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchMembers()
})
</script>

<style scoped>
/* 英雄区域样式 */
.members-hero {
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: var(--spacing-8) 0;
  text-align: center;
  margin-bottom: var(--spacing-8);
  box-shadow: var(--shadow-sm);
}

.members-hero h1 {
  font-size: var(--font-size-3xl);
  margin: 0;
  font-weight: var(--font-weight-semibold);
  opacity: 0.95;
}

/* 内容区域样式 */
.members-content {
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

/* 标签页样式 */
.tabs {
  margin-bottom: var(--spacing-6);
}

.tabs-nav {
  display: flex;
  border-bottom: 1px solid var(--color-gray-200);
  margin-bottom: var(--spacing-6);
}

.tab-item {
  padding: var(--spacing-3) var(--spacing-6);
  background: none;
  border: none;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-600);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  margin-right: var(--spacing-2);
}

.tab-item:hover {
  color: var(--color-primary);
}

.tab-item.active {
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: var(--color-primary);
  border-radius: var(--radius-sm);
}

/* 成员网格 */
.members-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-6);
  margin-top: var(--spacing-6);
}

/* 成员卡片样式 */
.member-card {
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
  text-align: center;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  border: 1px solid var(--color-gray-100);
}

.member-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

/* 成员头像容器 */
.member-avatar-container {
  margin-bottom: var(--spacing-4);
  display: flex;
  justify-content: center;
}

/* 成员头像 */
.member-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: var(--color-gray-200);
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-white);
  border: 3px solid var(--color-gray-100);
  transition: all 0.3s ease;
}

.member-card:hover .member-avatar {
  transform: scale(1.05);
  box-shadow: var(--shadow-md);
}

/* 成员信息 */
.member-info h3 {
  margin: 0 0 var(--spacing-2) 0;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-800);
}

/* 成员职位 */
.position {
  margin: 0 0 var(--spacing-3) 0;
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-600);
  font-size: var(--font-size-sm);
}

/* 成员描述 */
.member-info p:not(.position) {
  color: var(--color-gray-700);
  line-height: 1.6;
  font-size: var(--font-size-sm);
  margin: 0;
}

/* 空状态样式 */
.empty-state {
  text-align: center;
  padding: var(--spacing-12) 0;
  color: var(--color-gray-500);
  font-size: var(--font-size-base);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .members-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: var(--spacing-4);
  }
  
  .member-card {
    padding: var(--spacing-4);
  }
  
  .member-avatar {
    width: 80px;
    height: 80px;
    font-size: var(--font-size-xl);
  }
  
  .tabs-nav {
    overflow-x: auto;
    white-space: nowrap;
  }
  
  .tab-item {
    padding: var(--spacing-2) var(--spacing-4);
    font-size: var(--font-size-sm);
  }
}
</style>