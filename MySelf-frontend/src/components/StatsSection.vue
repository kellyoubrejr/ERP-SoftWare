<template>
  <section class="stats-section" id="stats">
    <div class="stats-inner">
      <div class="section-label reveal" ref="label1">值得信赖</div>
      <h2 class="section-title reveal" ref="title1">数据说明一切</h2>
      <p class="section-subtitle reveal" ref="subtitle1">全球用户的共同选择</p>
      <div class="stats-grid">
        <div class="stat-card reveal" style="transition-delay: 0.1s" ref="card1">
          <div class="stat-number"><span ref="counter1">0</span>+</div>
          <div class="stat-label">全球用户</div>
        </div>
        <div class="stat-card reveal" style="transition-delay: 0.2s" ref="card2">
          <div class="stat-number"><span ref="counter2">0</span>+</div>
          <div class="stat-label">支持语言</div>
        </div>
        <div class="stat-card reveal" style="transition-delay: 0.3s" ref="card3">
          <div class="stat-number"><span ref="counter3">0</span>%</div>
          <div class="stat-label">服务可用性</div>
        </div>
        <div class="stat-card reveal" style="transition-delay: 0.4s" ref="card4">
          <div class="stat-number"><span ref="counter4">0</span>x</div>
          <div class="stat-label">效率提升</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRevealAnimation } from '@/composables/useRevealAnimation'
import { useCounterAnimation } from '@/composables/useCounterAnimation'

const label1 = ref(null)
const title1 = ref(null)
const subtitle1 = ref(null)
const card1 = ref(null)
const card2 = ref(null)
const card3 = ref(null)
const card4 = ref(null)

const counter1 = ref(null)
const counter2 = ref(null)
const counter3 = ref(null)
const counter4 = ref(null)

useRevealAnimation([label1, title1, subtitle1, card1, card2, card3, card4])

useCounterAnimation(counter1, 10000000, 2000)
useCounterAnimation(counter2, 50, 2000)
useCounterAnimation(counter3, 99.9, 2000, 1)
useCounterAnimation(counter4, 3, 2000)
</script>

<style lang="scss" scoped>
.stats-section {
  background: var(--gradient-dark);
  color: var(--white);
  padding: 8rem 2rem;
  max-width: none;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 30% 50%, rgba(99, 102, 241, 0.15), transparent 60%),
                radial-gradient(ellipse at 70% 50%, rgba(236, 72, 153, 0.15), transparent 60%);
  }
}

.stats-inner {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
}

.section-label {
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: inline-block;
}

.section-title {
  color: var(--white);
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.section-subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.125rem;
  max-width: 600px;
  margin: 0 auto;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.stat-card {
  padding: 2.5rem 1.5rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: var(--transition-all);

  &:hover {
    transform: translateY(-8px) scale(1.02);
    background: rgba(255, 255, 255, 0.1);
  }
}

.stat-number {
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary-light), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

@media (max-width: 768px) {
  .stat-number { font-size: 2.5rem; }
}
</style>