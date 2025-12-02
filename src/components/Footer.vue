<template>
  <footer class="footer">
    <div class="footer-top">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-column">
            <h3 class="footer-title">零壹网络安全社团</h3>
            <p class="footer-description">守护网络安全，共建美好未来</p>
          </div>
          <div class="footer-column">
            <h4 class="footer-subtitle">快速链接</h4>
            <ul class="footer-links">
              <li class="footer-link-item"><a href="/" class="footer-link">首页</a></li>
              <li class="footer-link-item"><a href="/about" class="footer-link">关于我们</a></li>
              <li class="footer-link-item"><a href="/activities" class="footer-link">社团活动</a></li>
              <li class="footer-link-item"><a href="/members" class="footer-link">社团成员</a></li>
              <li class="footer-link-item"><a href="/contact" class="footer-link">联系我们</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4 class="footer-subtitle">联系方式</h4>
            <div class="footer-contact">
              <p class="footer-contact-item">邮箱：contact@lingyi-sec.com</p>
              <p class="footer-contact-item">QQ群：123456789</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        <div class="footer-copyright">
          <p>&copy; 2025 零壹网络安全社团. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// 可以在这里添加脚本逻辑
</script>

<style scoped>
.footer {
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  transition: all var(--transition-base);
}

.footer-top {
  padding: var(--spacing-48) 0;
}

.footer-bottom {
  padding: var(--spacing-24) 0;
  border-top: 1px solid var(--border-color);
  background-color: var(--bg-primary);
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-40);
  align-items: start;
}

.footer-column {
  display: flex;
  flex-direction: column;
}

.footer-title {
  color: var(--text-primary);
  font-size: var(--font-size-2xl);
  font-weight: 700;
  margin-bottom: var(--spacing-16);
  line-height: var(--line-height-lg);
}

.footer-subtitle {
  color: var(--text-primary);
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: var(--spacing-16);
  line-height: var(--line-height-base);
}

.footer-description {
  color: var(--text-secondary);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  margin-bottom: 0;
  max-width: 300px;
}

.footer-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-12);
}

.footer-link-item {
  margin: 0;
}

.footer-link {
  color: var(--text-secondary);
  font-size: var(--font-size-base);
  text-decoration: none;
  transition: all var(--transition-base);
  padding: var(--spacing-4) 0;
  display: inline-block;
}

.footer-link:hover {
  color: var(--primary-color);
  transform: translateX(4px);
}

.footer-contact {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-16);
}

.footer-contact-item {
  color: var(--text-secondary);
  font-size: var(--font-size-base);
  margin: 0;
  line-height: var(--line-height-base);
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
}

.footer-copyright {
  text-align: center;
  color: var(--text-tertiary);
  font-size: var(--font-size-sm);
}

.footer-copyright p {
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .footer-grid {
    gap: var(--spacing-32);
  }
}

@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-24);
  }
  
  .footer-column:first-child {
    grid-column: 1 / -1;
    text-align: center;
  }
  
  .footer-description {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-24);
    text-align: center;
  }
  
  .footer-top {
    padding: var(--spacing-32) 0;
  }
  
  .footer-bottom {
    padding: var(--spacing-16) 0;
  }
  
  .footer-title {
    font-size: var(--font-size-xl);
  }
  
  .footer-subtitle {
    font-size: var(--font-size-base);
  }
  
  .footer-links {
    align-items: center;
  }
  
  .footer-link:hover {
    transform: none;
  }
  
  .footer-contact {
    align-items: center;
  }
  
  .footer-contact-item {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .footer-top {
    padding: var(--spacing-24) 0;
  }
  
  .footer-grid {
    gap: var(--spacing-20);
  }
  
  .footer-title {
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-12);
  }
  
  .footer-subtitle {
    margin-bottom: var(--spacing-12);
  }
}
</style>