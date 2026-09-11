<template>
  <section class="testimonials-section" id="testimonials">
    <div class="section-header">
      <div class="section-label reveal" ref="label1">&copy关于</div>
      <h2 class="section-title reveal" ref="title1">他们都在用 </h2>
      <p class="section-subtitle reveal" ref="subtitle1">来自各行各业创的真实反馈</p>
    </div>
    <div class="testimonials-grid">
      <div class="testimonial-card reveal" style="transition-delay: 0.1s" ref="card1">
        <div class="testimonial-stars">★★★★★</div>
        <blockquote>"费城76人：东部老牌劲旅，队名纪念1776年《独立宣言》在费城签署，队史3次夺冠。"</blockquote>
        <div class="testimonial-author">
          <div class="testimonial-avatar">詹</div>
          <div>
            <div class="testimonial-name">勒布朗·詹姆斯</div>
            <div class="testimonial-role">NBA 费城76人</div>
          </div>
        </div>
      </div>
      <div class="testimonial-card reveal" style="transition-delay: 0.25s" ref="card2">
        <div class="testimonial-stars">★★★★★</div>
        <blockquote>"金州勇士：西部太平洋赛区球队，队史7次夺得NBA总冠军，曾创73胜历史纪录。"</blockquote>
        <div class="testimonial-author">
          <div class="testimonial-avatar">库</div>
          <div>
            <div class="testimonial-name">斯蒂芬·库里</div>
            <div class="testimonial-role">NBA 金州勇士</div>
          </div>
        </div>
      </div>
      <div class="testimonial-card reveal" style="transition-delay: 0.4s" ref="card3">
        <div class="testimonial-stars">★★★★★</div>
        <blockquote>"休斯顿火箭：西部西南区球队，因圣地亚哥造火箭得名，队史2次夺冠。"</blockquote>
        <div class="testimonial-author">
          <div class="testimonial-avatar">杜</div>
          <div>
            <div class="testimonial-name">凯文·杜兰特</div>
            <div class="testimonial-role">NBA 休斯顿火箭</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
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
.testimonials-section {
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

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 2rem;
}

.testimonial-card {
  background: var(--white);
  border-radius: 20px;
  padding: 2.5rem;
  border: 1px solid var(--gray-200);
  transition: var(--transition-all);
  position: relative;

  &::before {
    content: '"';
    position: absolute;
    top: 1.5rem;
    left: 2rem;
    font-size: 5rem;
    font-family: Georgia, serif;
    color: var(--gray-200);
    line-height: 1;
    z-index: 0;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-xl);
  }
}

.testimonial-stars {
  color: #f59e0b;
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
  letter-spacing: 2px;
  position: relative;
  z-index: 1;
}

.testimonial-card blockquote {
  font-size: 1.0625rem;
  color: var(--gray-700);
  line-height: 1.8;
  margin-bottom: 2rem;
  font-style: italic;
  position: relative;
  z-index: 1;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  z-index: 1;
}

.testimonial-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--white);
  flex-shrink: 0;
}

.testimonial-card:nth-child(1) .testimonial-avatar { background: var(--gradient-primary); }
.testimonial-card:nth-child(2) .testimonial-avatar { background: var(--gradient-secondary); }
.testimonial-card:nth-child(3) .testimonial-avatar { background: linear-gradient(135deg, #06b6d4, #3b82f6); }

.testimonial-name {
  font-weight: 600;
  font-size: 1rem;
  color: var(--gray-900);
}

.testimonial-role {
  font-size: 0.875rem;
  color: var(--gray-500);
}

@media (max-width: 768px) {
  .section-title { font-size: 2rem; }
  .testimonials-grid { grid-template-columns: 1fr; }
}
</style>