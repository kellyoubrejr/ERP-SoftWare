<template>
  <section class="cta-section" id="cta">
    <div class="cta-bg"></div>
    <div class="cta-content">
      <h2 class="reveal" ref="title1">开始你的高效工作之旅</h2>
      <p class="reveal" style="transition-delay: 0.15s" ref="subtitle1">免费注册，体验新的方式，即刻开始。</p>
      <a class="cta-btn reveal" style="transition-delay: 0.3s" ref="btn1" @click="handleCTA">开始登录  →</a>
      <div class="cta-note reveal" style="transition-delay: 0.4s" ref="note1">已有超过 1,000 万用户信赖 </div>
    </div>
  </section>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

const openLogin = inject('openLogin')

const title1 = ref(null)
const subtitle1 = ref(null)
const btn1 = ref(null)
const note1 = ref(null)

useRevealAnimation([title1, subtitle1, btn1, note1])

const handleCTA = () => {
  openLogin()
}
</script>

<style lang="scss" scoped>
.cta-section {
  max-width: none;
  padding: 8rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%);
}

.cta-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--primary), var(--secondary), var(--accent));
  background-size: 300% 300%;
  animation: gradient-shift 8s ease infinite;
  opacity: 0.8;
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.cta-content {
  position: relative;
  z-index: 1;
  max-width: 700px;
  margin: 0 auto;
}

.cta-content h2 {
  font-size: 3rem;
  font-weight: 800;
  color: var(--white);
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.cta-content p {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 2.5rem;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 3rem;
  border-radius: 12px;
  background: var(--white);
  color: var(--primary);
  font-size: 1.125rem;
  font-weight: 600;
  text-decoration: none;
  transition: var(--transition-all);
  box-shadow: 0 4px 14px 0 rgba(255, 255, 255, 0.3);
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px 0 rgba(255, 255, 255, 0.4);
  }
}

.cta-note {
  margin-top: 1.5rem;
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.6);
}

@media (prefers-reduced-motion: reduce) {
  .cta-bg { animation: none; }
}
</style>