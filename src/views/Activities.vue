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
          <div v-for="i in 6" :key="i" class="skeleton"></div>
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
          <!-- 过滤组件 -->
          <div class="filters mb-4">
            <div class="filter-row">
              <div class="filter-item">
                <input
                    type="text"
                    placeholder="搜索活动名称..."
                    class="input input-base"
                    v-model="searchQuery"
                >
              </div>
              <div class="filter-item">
                <select class="select select-base" v-model="selectedType">
                  <option value="">所有类型</option>
                  <option value="academic">学术活动</option>
                  <option value="cultural">文化活动</option>
                  <option value="sports">体育活动</option>
                  <option value="social">社交活动</option>
                </select>
              </div>
              <div class="filter-item filter-date">
                <input
                    type="date"
                    class="input input-base"
                    v-model="dateRange.start"
                    placeholder="开始日期"
                >
                <span class="date-separator">至</span>
                <input
                    type="date"
                    class="input input-base"
                    v-model="dateRange.end"
                    placeholder="结束日期"
                >
              </div>
              <div class="filter-item">
                <button class="btn btn-secondary btn-small" @click="resetFilters">
                  清除过滤
                </button>
              </div>
            </div>
            <!-- 应用的过滤条件 -->
            <div v-if="appliedFilters.length > 0" class="applied-filters">
              <div class="applied-filter" v-for="(filter, index) in appliedFilters" :key="index">
                <span class="filter-label">{{ filter.label }}:</span>
                <span class="filter-value">{{ filter.value }}</span>
                <button class="filter-remove" @click="removeFilter(filter.type)">
                  &times;
                </button>
              </div>
            </div>
            <!-- 过滤结果统计 -->
            <div class="filter-stats">
              共 {{ filteredActivities[activeTab].length }} 个活动
            </div>
          </div>
          
          <div class="tabs mb-4">
            <div class="tabs-nav">
              <button
                  v-for="tab in activityTabs"
                  :key="tab.id"
                  :class="['tab-nav-item', activeTab === tab.id ? 'active' : '']"
                  @click="activeTab = tab.id; resetPage()"
              >
                {{ tab.label }}
              </button>
            </div>
            <div class="tabs-content">
              <div
                  v-for="tab in activityTabs"
                  v-show="activeTab === tab.id"
                  :key="tab.id"
                  class="tab-content"
              >
                <div v-if="filteredActivities[tab.id].length > 0" class="activities-grid">
                    <div
                        v-for="activity in currentActivities[tab.id]"
                        :key="activity.id"
                        :class="{'activity-card-upcoming': tab.id === 'upcoming'}"
                        class="activity-card"
                    >
                      <div class="activity-header">
                        <h3 class="activity-title">{{ activity.title }}</h3>
                        <span
                            :class="tab.id === 'upcoming' ? 'tag-upcoming' : 'tag-past'"
                            class="activity-tag"
                        >
                          {{ tab.id === 'upcoming' ? '即将开始' : '已结束' }}
                        </span>
                      </div>
                      <p class="activity-date">{{ formatDate(activity.date) }}</p>
                      <p class="activity-description">{{ activity.description }}</p>
                    </div>
                    
                    <!-- 加载更多 -->
                    <div class="load-more-container">
                      <div v-if="loadingMore" class="loading-more">
                        <div class="loading-spinner"></div>
                        <span>加载中...</span>
                      </div>
                      <button
                          v-else-if="hasMore && filteredActivities[tab.id].length > currentActivities[tab.id].length"
                          class="btn btn-primary btn-small"
                          @click="loadMore"
                      >
                        加载更多
                      </button>
                      <div v-else-if="!hasMore" class="no-more">
                        没有更多活动了
                      </div>
                    </div>
                  </div>
                  <div v-else class="empty-state">
                    <div class="empty-icon">📋</div>
                    <p class="empty-text">{{ tab.emptyText }}</p>
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
import {onMounted, ref, computed, watch} from 'vue'
import {getActivities} from '@/api/activity.js'

const loading = ref(true)
const error = ref(null)
const activities = ref([])
const activeTab = ref('past')
const loadingMore = ref(false)
const hasMore = ref(true)
const pageSize = ref(12)
const currentPage = ref(1)

// 过滤相关变量
const searchQuery = ref('')
const selectedType = ref('')
const dateRange = ref({
  start: '',
  end: ''
})

// 活动标签页配置
const activityTabs = ref([
  {
    id: 'past',
    label: '过往活动',
    emptyText: '暂无过往活动记录'
  },
  {
    id: 'upcoming',
    label: '即将举行',
    emptyText: '暂无即将举行的活动'
  }
])

// 重置页码
const resetPage = () => {
  currentPage.value = 1
  hasMore.value = true
}

// 监听过滤条件变化，重置页码
watch([searchQuery, selectedType, dateRange], () => {
  resetPage()
}, { deep: true })

// 重置过滤条件
const resetFilters = () => {
  searchQuery.value = ''
  selectedType.value = ''
  dateRange.value = {
    start: '',
    end: ''
  }
  resetPage()
}

// 过滤活动
const filteredActivities = computed(() => {
  const filterByTab = (tabId) => {
    return activities.value.filter(activity => {
      // 状态过滤
      if ((tabId === 'past' && activity.status !== 1) ||
          (tabId === 'upcoming' && activity.status !== 0)) {
        return false
      }
      
      // 搜索过滤
      if (searchQuery.value && !activity.title.toLowerCase().includes(searchQuery.value.toLowerCase())) {
        return false
      }
      
      // 类型过滤 - 暂时移除，因为后端数据中没有type字段
      // if (selectedType.value && activity.type !== selectedType.value) {
      //   return false
      // }
      
      // 日期范围过滤
      if (dateRange.value.start || dateRange.value.end) {
        const activityDate = new Date(activity.date)
        const startDate = dateRange.value.start ? new Date(dateRange.value.start) : null
        const endDate = dateRange.value.end ? new Date(dateRange.value.end) : null
        
        if (startDate && activityDate < startDate) {
          return false
        }
        
        if (endDate && activityDate > endDate) {
          return false
        }
      }
      
      return true
    })
  }
  
  return {
    past: filterByTab('past'),
    upcoming: filterByTab('upcoming')
  }
})

// 当前显示的活动（分页）
const currentActivities = computed(() => {
  const result = {
    past: [],
    upcoming: []
  }
  
  for (const tabId of ['past', 'upcoming']) {
    const filtered = filteredActivities.value[tabId]
    const endIndex = currentPage.value * pageSize.value
    result[tabId] = filtered.slice(0, endIndex)
  }
  
  return result
})

// 加载更多活动
const loadMore = () => {
  if (loadingMore.value || !hasMore.value) return
  
  loadingMore.value = true
  
  // 模拟异步加载
  setTimeout(() => {
    currentPage.value++
    
    // 检查是否还有更多数据
    const totalFiltered = filteredActivities.value[activeTab.value].length
    const totalLoaded = currentActivities.value[activeTab.value].length
    
    hasMore.value = totalLoaded < totalFiltered
    loadingMore.value = false
  }, 1000)
}

// 应用的过滤条件
const appliedFilters = computed(() => {
  const filters = []
  
  if (searchQuery.value) {
    filters.push({
      type: 'search',
      label: '搜索',
      value: searchQuery.value
    })
  }
  
  if (selectedType.value) {
    const typeMap = {
      academic: '学术活动',
      cultural: '文化活动',
      sports: '体育活动',
      social: '社交活动'
    }
    filters.push({
      type: 'type',
      label: '类型',
      value: typeMap[selectedType.value] || selectedType.value
    })
  }
  
  if (dateRange.value.start || dateRange.value.end) {
    const start = dateRange.value.start || '不限'
    const end = dateRange.value.end || '不限'
    filters.push({
      type: 'date',
      label: '日期范围',
      value: `${start} 至 ${end}`
    })
  }
  
  return filters
})

// 移除特定过滤条件
const removeFilter = (type) => {
  switch (type) {
    case 'search':
      searchQuery.value = ''
      break
    case 'type':
      selectedType.value = ''
      break
    case 'date':
      dateRange.value = {
        start: '',
        end: ''
      }
      break
  }
  currentPage.value = 1
  hasMore.value = true
}

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return isNaN(date.getTime()) ? dateString : date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

const fetchActivities = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await getActivities()
    activities.value = response.success ? response.data : []
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

/* 过滤组件样式 */
.filters {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-24);
  margin-bottom: var(--spacing-24);
}

.filter-row {
  display: flex;
  gap: var(--spacing-16);
  flex-wrap: wrap;
  margin-bottom: var(--spacing-16);
}

.filter-item {
  display: flex;
  align-items: center;
}

.filter-date {
  display: flex;
  align-items: center;
  gap: var(--spacing-12);
}

.date-separator {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.filter-stats {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  text-align: right;
}

/* 输入框和选择框样式 */
.input {
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-base);
  padding: var(--spacing-12) var(--spacing-16);
  font-size: var(--font-size-base);
  color: var(--text-primary);
  background-color: var(--bg-primary);
  transition: all var(--transition-fast);
}

.input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.select {
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-base);
  padding: var(--spacing-12) var(--spacing-16);
  font-size: var(--font-size-base);
  color: var(--text-primary);
  background-color: var(--bg-primary);
  transition: all var(--transition-fast);
  cursor: pointer;
}

.select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

/* 按钮样式 */
.btn {
  border: none;
  border-radius: var(--border-radius-base);
  padding: var(--spacing-12) var(--spacing-24);
  font-size: var(--font-size-base);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: var(--primary-color-hover);
}

.btn-secondary {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background-color: var(--bg-tertiary);
}

.btn-small {
  padding: var(--spacing-8) var(--spacing-16);
  font-size: var(--font-size-sm);
}

/* 应用的过滤条件样式 */
.applied-filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-12);
  margin-top: var(--spacing-16);
  margin-bottom: var(--spacing-8);
}

.applied-filter {
  display: inline-flex;
  align-items: center;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-full);
  padding: var(--spacing-8) var(--spacing-12);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  gap: var(--spacing-8);
}

.filter-label {
  font-weight: 500;
  color: var(--text-primary);
}

.filter-value {
  color: var(--text-secondary);
}

.filter-remove {
  background: none;
  border: none;
  color: var(--text-tertiary);
  font-size: var(--font-size-base);
  cursor: pointer;
  padding: 0;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-full);
  transition: all var(--transition-fast);
}

.filter-remove:hover {
  background-color: var(--bg-tertiary);
  color: var(--text-secondary);
}

/* 加载更多样式 */
.load-more-container {
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-24) 0;
}

.loading-more {
  display: flex;
  align-items: center;
  gap: var(--spacing-12);
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid var(--border-color);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.no-more {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
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
  
  /* 过滤组件响应式 */
  .filters {
    padding: var(--spacing-16);
  }
  
  .filter-row {
    flex-direction: column;
    align-items: stretch;
    gap: var(--spacing-12);
  }
  
  .filter-item {
    width: 100%;
  }
  
  .filter-date {
    flex-direction: column;
    align-items: stretch;
    gap: var(--spacing-8);
  }
  
  .date-separator {
    display: none;
  }
  
  .input, .select {
    width: 100%;
  }
  
  /* 应用的过滤条件响应式 */
  .applied-filters {
    justify-content: center;
  }
  
  .filter-stats {
    text-align: center;
  }
}
</style>