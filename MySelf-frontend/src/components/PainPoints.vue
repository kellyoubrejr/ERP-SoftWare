<template>
  <section class="pain-section" id="pain">
    <div class="section-header">
      <div class="section-label reveal" ref="label1">问题</div>
      <h2 class="section-title reveal" ref="title1">一体化，不该这么难</h2>
      <p class="section-subtitle reveal" ref="subtitle1">无论是批发零售、商贸流通、生产制造还是电商仓储，你可能都遇到过这些困境</p>
    </div>
    <div class="pain-grid">
      <div class="pain-card reveal" style="transition-delay: 0.1s" ref="card1">
        <div class="pain-icon">😫</div>
        <h3>库存不准</h3>
        <p>系统里的数和仓库里的货永远对不上，盘点靠 Excel 和纸笔，月底对账像破案，错发漏发天天有。</p>
      </div>
      <div class="pain-card reveal" style="transition-delay: 0.25s" ref="card2">
        <div class="pain-icon">⏳</div>
        <h3>效率低下</h3>
        <p>开单靠手写、查库存靠喊、做报表靠加班。一单生意跑三个软件，数据不互通，人累得要死还容易出错。</p>
      </div>
      <div class="pain-card reveal" style="transition-delay: 0.4s" ref="card3">
        <div class="pain-icon">🌐</div>
        <h3>业财脱节</h3>
        <p>进销存和财务各记各的账，月底结转全靠人工核对。老板想看利润，得等财务算三天，决策永远慢半拍。</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

const label1 = ref(null)
const title1 = ref(null)
const subtitle1 = ref(null)
const card1 = ref(null)
const card2 = ref(null)
const card3 = ref(null)

useRevealAnimation([label1, title1, subtitle1, card1, card2, card3])
</script>

<style lang="scss" scoped>
.pain-section {
  background: var(--gray-100);
  padding: 8rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-label {
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 1rem;
  display: inline-block;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--gray-900);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--gray-600);
  max-width: 600px;
  margin: 0 auto;
}

.pain-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.pain-card {
  background: var(--white);
  border-radius: 20px;
  padding: 2.5rem;
  border: 1px solid var(--gray-200);
  transition: var(--transition-all);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: var(--gradient-primary);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-xl);

    &::before {
      transform: scaleX(1);
    }
  }
}

.pain-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1));
}

.pain-card:nth-child(1) .pain-icon { background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(245, 158, 11, 0.1)); }
.pain-card:nth-child(2) .pain-icon { background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(239, 68, 68, 0.1)); }
.pain-card:nth-child(3) .pain-icon { background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1)); }

.pain-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 0.75rem;
}

.pain-card p {
  font-size: 1rem;
  color: var(--gray-600);
  line-height: 1.7;
}

@media (max-width: 768px) {
  .section-title { font-size: 2rem; }
  .pain-grid { grid-template-columns: 1fr; }
}
</style>