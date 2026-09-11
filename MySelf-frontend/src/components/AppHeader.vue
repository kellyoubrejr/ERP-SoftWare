<template>
  <div class="scroll-progress" :style="{ width: scrollProgress + '%' }"></div>
  <nav id="mainNav" :class="{ scrolled: isScrolled }">
    <div class="nav-logo">小凯利</div>
    <ul class="nav-links">
      <li><a href="#pain" @click.prevent="scrollTo('pain')">痛点</a></li>
      <li><a href="#features" @click.prevent="scrollTo('features')">功能</a></li>
      <li><a href="#stats" @click.prevent="scrollTo('stats')">数据</a></li>
      <li><a href="#testimonials" @click.prevent="scrollTo('testimonials')">关于</a></li>
      <li><a href="#" class="nav-cta" @click.prevent="openLogin()">开始使用</a></li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'

const openLogin = inject('openLogin')

const isScrolled = ref(false)
const scrollProgress = ref(0)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 60
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0
}

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  background: var(--gradient-primary);
  z-index: 1000;
  transition: width 0.1s linear;
}

nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: var(--transition-all);
  background: transparent;

  &.scrolled {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: var(--shadow-md);
    padding: 0.75rem 2rem;
  }
}

.nav-logo {
  font-size: 1.5rem;
  font-weight: 800;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;

  a {
    text-decoration: none;
    color: var(--gray-600);
    font-size: 0.9375rem;
    font-weight: 500;
    transition: var(--transition-all);
    position: relative;
    padding: 0.5rem 0;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--gradient-primary);
      transition: width 0.3s ease;
    }

    &:hover {
      color: var(--primary);

      &::after {
        width: 100%;
      }
    }
  }

  .nav-cta {
    background: var(--gradient-primary);
    color: var(--white) !important;
    padding: 0.625rem 1.5rem !important;
    border-radius: 8px;
    font-weight: 600 !important;
    -webkit-text-fill-color: var(--white) !important;

    &::after {
      display: none !important;
    }
  }
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
}
</style>