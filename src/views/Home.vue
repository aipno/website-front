<template>
  <div class="home">
    <!-- 轮播图 -->
    <section class="carousel">
      <div ref="carouselWrapper" class="carousel-wrapper">
        <div
            v-for="item in carouselItems"
            :key="item.id"
            :style="{ backgroundImage: `url(${item.image})` }"
            class="carousel-item"
        >
          <div class="carousel-content">
            <h1 class="text-4xl md:text-5xl font-bold mb-8 text-white leading-tight">
              {{ item.title }}
            </h1>
            <p class="text-lg md:text-xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed">
              {{ item.description }}
            </p>
            <div class="flex justify-center">
              <button class="btn btn-primary btn-large w-24 h-8">{{ item.buttonText }}</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 轮播图指示器 -->
      <div class="carousel-indicators">
        <button
            v-for="(item, index) in carouselItems"
            :key="item.id"
            :class="{ active: currentSlide === index }"
            class="carousel-indicator"
            @click="goToSlide(index)"
        ></button>
      </div>
    </section>

    <!-- 社团简介 -->
    <section class="intro py-16 md:py-24">
      <div class="container">
        <div class="section-header mb-12 text-center">
          <h2 class="section-title">社团简介</h2>
          <div class="section-divider mx-auto w-20 h-1 bg-primary mt-4"></div>
        </div>
        <div class="card">
          <p class="card-content text-lg leading-relaxed text-center max-w-3xl mx-auto">
            {{ aboutInfo }}
          </p>
        </div>
      </div>
    </section>

    <!-- 社团特色 -->
    <section class="features py-16 md:py-24 bg-secondary-light/10">
      <div class="container">
        <div class="section-header mb-16 text-center">
          <h2 class="section-title">社团特色</h2>
          <div class="section-divider mx-auto w-20 h-1 bg-primary mt-4"></div>
        </div>
        <div class="features-grid">
          <div v-for="feature in features" :key="feature.id" class="feature-card">
            <div class="feature-icon mb-8 text-primary">{{ feature.iconText }}</div>
            <h3 class="feature-title text-xl font-bold mb-4 text-primary">{{ feature.title }}</h3>
            <p class="feature-description text-base leading-relaxed text-center">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 最新活动 -->
    <section class="latest-activities py-16 md:py-24">
      <div class="container">
        <div class="section-header mb-16 text-center">
          <h2 class="section-title">最新活动</h2>
          <div class="section-divider mx-auto w-20 h-1 bg-primary mt-4"></div>
        </div>
        <div class="activities-grid">
          <div v-for="activity in latestActivities" :key="activity.id" class="activity-card">
            <div
                class="activity-header flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <h3 class="activity-title text-xl font-bold text-primary flex-1">{{ activity.title }}</h3>
              <span :class="['activity-tag', activity.status === 'upcoming' ? 'tag-upcoming' : 'tag-past']">
                {{ activity.status === 'upcoming' ? '即将开始' : '已结束' }}
              </span>
            </div>
            <div class="activity-meta flex flex-wrap gap-6 mb-6 pb-6 border-b border-gray-200">
              <span class="meta-item flex items-center gap-2 text-gray-600">
                <span class="icon">📅</span>
                {{ activity.date }}
              </span>
              <span class="meta-item flex items-center gap-2 text-gray-600">
                <span class="icon">📍</span>
                {{ activity.location }}
              </span>
            </div>
            <p class="activity-description text-gray-700 mb-8 flex-1 leading-relaxed">
              {{ activity.description }}
            </p>
            <div class="flex justify-start">
              <button class="btn btn-primary btn-small">查看详情</button>
            </div>
          </div>
        </div>
        <div class="text-center mt-16">
          <button class="btn btn-primary w-28 h-8">查看所有活动</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from 'vue'
import {useRouter} from 'vue-router'

const router = useRouter()

// 轮播图状态管理
const currentSlide = ref(0)
const carouselWrapper = ref(null)
const autoplayInterval = ref(null)
const AUTOPLAY_DELAY = 5000 // 自动播放间隔（毫秒）

// 模拟数据
const carouselItems = ref([
  {
    id: 1,
    image: 'https://picsum.photos/id/1/1920/800',
    title: '零壹网络安全社团',
    description: '守护网络安全，共建美好未来',
    buttonText: '了解更多'
  },
  {
    id: 2,
    image: 'https://picsum.photos/id/2/1920/800',
    title: '网络安全技术交流',
    description: '定期举办技术分享和交流活动',
    buttonText: '查看活动'
  },
  {
    id: 3,
    image: 'https://picsum.photos/id/3/1920/800',
    title: 'CTF竞赛培训',
    description: '专业的CTF竞赛培训和指导',
    buttonText: '加入我们'
  }
])

const aboutInfo = ref('零壹网络安全社团是一个专注于网络安全技术研究与普及的学生组织，致力于提高学生的网络安全意识和技术水平，为网络安全事业培养优秀人才。')

const features = ref([
  {
    id: 1,
    iconText: '🔬',
    title: '技术研究',
    description: '深入研究网络安全前沿技术，包括渗透测试、漏洞挖掘、加密算法等。'
  },
  {
    id: 2,
    iconText: '💻',
    title: '实践活动',
    description: '定期举办CTF比赛、安全培训、技术分享等实践活动，提升成员实战能力。'
  },
  {
    id: 3,
    iconText: '🤝',
    title: '校企合作',
    description: '与知名企业建立合作关系，为成员提供实习和就业机会。'
  }
])

const latestActivities = ref([
  {
    id: 1,
    title: '网络安全知识讲座',
    date: '2025-12-15',
    location: '教学楼A101',
    description: '邀请业内专家讲解网络安全最新趋势和防护技巧',
    status: 'upcoming',
    icon: '🏆'
  },
  {
    id: 2,
    title: 'CTF竞赛培训',
    date: '2025-12-10',
    location: '实验楼B203',
    description: 'CTF竞赛基础知识和解题技巧培训',
    status: 'upcoming',
    icon: '💻'
  },
  {
    id: 3,
    title: '校园网络安全演练',
    date: '2025-11-25',
    location: '全校范围',
    description: '模拟网络攻击和防御演练',
    status: 'past',
    icon: '🔒'
  }
])

const goToActivities = () => {
  router.push('/activities')
}

// 轮播图控制方法
const updateCarouselPosition = () => {
  if (carouselWrapper.value) {
    const slideWidth = 100 // 百分比
    carouselWrapper.value.style.transform = `translateX(-${currentSlide.value * slideWidth}%)`
  }
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % carouselItems.value.length
  updateCarouselPosition()
  resetAutoplay()
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + carouselItems.value.length) % carouselItems.value.length
  updateCarouselPosition()
  resetAutoplay()
}

const goToSlide = (index) => {
  currentSlide.value = index
  updateCarouselPosition()
  resetAutoplay()
}

// 自动播放功能
const startAutoplay = () => {
  autoplayInterval.value = setInterval(nextSlide, AUTOPLAY_DELAY)
}

const stopAutoplay = () => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value)
    autoplayInterval.value = null
  }
}

const resetAutoplay = () => {
  stopAutoplay()
  startAutoplay()
}

// 生命周期钩子
onMounted(() => {
  updateCarouselPosition()
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<style scoped>
/* 轮播图样式 */
.carousel {
  height: 600px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-tertiary);
}

.carousel-wrapper {
  display: flex;
  height: 100%;
  transition: transform var(--transition-slow);
  width: 100%;
  position: relative;
}

.carousel-item {
  flex: 0 0 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: opacity var(--transition-slow);
}

/* 轮播图遮罩 */
.carousel-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 100%);
  z-index: 1;
}

.carousel-content {
  color: white;
  text-align: center;
  max-width: 100%;
  padding: 0 var(--spacing-24);
  position: relative;
  z-index: 2;
  animation: fadeInUp 0.8s ease-out;
  max-width: 800px;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.carousel-content h1 {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--spacing-24);
  font-weight: 700;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
  line-height: var(--line-height-xl);
  color: white;
}

.carousel-content p {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-32);
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  line-height: var(--line-height-lg);
  color: white;
  opacity: 0.95;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* 轮播图指示器 */
.carousel-indicators {
  position: absolute;
  bottom: var(--spacing-32);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: var(--spacing-12);
  z-index: 3;
}

.carousel-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all var(--transition-base);
  border: 2px solid transparent;
}

.carousel-indicator.active {
  background-color: white;
  width: 32px;
  border-radius: 6px;
}

.carousel-indicator:hover {
  background-color: rgba(255, 255, 255, 0.8);
  transform: scale(1.2);
}

/* 轮播图控制按钮 */
.carousel-controls {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 var(--spacing-24);
  z-index: 3;
}

.carousel-control {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-base);
  border: 2px solid rgba(255, 255, 255, 0.3);
  font-size: var(--font-size-xl);
}

.carousel-control:hover {
  background-color: rgba(255, 255, 255, 0.3);
  border-color: white;
  transform: scale(1.1);
}

.carousel-control:active {
  background-color: rgba(255, 255, 255, 0.4);
  transform: scale(1);
}

/* 标题样式 */
.section-title {
  color: var(--text-primary);
  font-size: var(--font-size-3xl);
  font-weight: 700;
  margin-bottom: var(--spacing-8);
  text-align: center;
  line-height: var(--line-height-xl);
}

.section-header {
  margin-bottom: var(--spacing-16);
  text-align: center;
}

/* 分割线样式 */
.section-divider {
  background-color: var(--color-primary);
  border-radius: var(--radius-sm);
  transition: all 0.3s ease;
}

/* 社团特色 */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-32);
}

.feature-icon {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--spacing-16);
  display: block;
  transition: all 0.3s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.1);
}

.feature-title {
  color: var(--text-primary);
  font-size: var(--font-size-xl);
  font-weight: 600;
  margin-bottom: var(--spacing-12);
  transition: all 0.3s ease;
}

.feature-description {
  color: var(--text-secondary);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  margin: 0;
  flex: 1;
  display: flex;
  align-items: center;
  text-align: center;
}

/* 最新活动 */
.activities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--spacing-32);
}

.activity-header {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-8);
}

.activity-title {
  color: var(--text-primary);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-2);
  line-height: var(--line-height-lg);
  transition: all 0.3s ease;
}

.activity-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-4) var(--spacing-12);
  border-radius: var(--border-radius-base);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  white-space: nowrap;
}

.tag-upcoming {
  background-color: var(--success-light);
  color: var(--success-color);
}

.tag-past {
  background-color: var(--info-light);
  color: var(--info-color);
}

.activity-meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-6);
  margin-bottom: var(--spacing-16);
  padding-bottom: var(--spacing-16);
  border-bottom: 1px solid var(--border-color);
}

.meta-item {
  color: var(--text-tertiary);
  font-size: var(--font-size-sm);
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  transition: all 0.3s ease;
}

.meta-item:hover {
  color: var(--primary-color);
}

.meta-item .icon {
  font-size: var(--font-size-base);
}

.activity-description {
  color: var(--text-secondary);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  margin-bottom: var(--spacing-20);
  flex: 1;
}

/* 间距辅助类 */
.py-16 {
  padding-top: var(--spacing-16);
  padding-bottom: var(--spacing-16);
}

.py-24 {
  padding-top: var(--spacing-24);
  padding-bottom: var(--spacing-24);
}

.md\:py-24 {
  padding-top: var(--spacing-24);
  padding-bottom: var(--spacing-24);
}

.mb-12 {
  margin-bottom: var(--spacing-12);
}

.mb-16 {
  margin-bottom: var(--spacing-16);
}

.mt-4 {
  margin-top: var(--spacing-4);
}

.mt-16 {
  margin-top: var(--spacing-16);
}

/* 背景色辅助类 */
.bg-secondary-light\/10 {
  background-color: var(--bg-tertiary);
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .features-grid,
  .activities-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--spacing-24);
  }
}

@media (max-width: 768px) {
  .carousel {
    height: 500px;
  }

  .carousel-content h1 {
    font-size: var(--font-size-3xl);
  }

  .carousel-content p {
    font-size: var(--font-size-base);
  }

  .features-grid,
  .activities-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-20);
  }

  .feature-card,
  .activity-card {
    padding: var(--spacing-24);
  }

  .section-title {
    font-size: var(--font-size-2xl);
  }

  .py-16 {
    padding-top: var(--spacing-16);
    padding-bottom: var(--spacing-16);
  }

  .py-24 {
    padding-top: var(--spacing-24);
    padding-bottom: var(--spacing-24);
  }
}

@media (max-width: 480px) {
  .carousel {
    height: 450px;
  }

  .carousel-content h1 {
    font-size: var(--font-size-2xl);
  }

  .features-grid,
  .activities-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-16);
  }
}
</style>