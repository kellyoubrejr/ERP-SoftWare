<template>
  <section class="features-section" id="features">
    <div class="section-header">
      <div class="section-label reveal" ref="label1">解决方案</div>
      <h2 class="section-title reveal" ref="title1">货通天下 如何帮你管得更好</h2>
      <p class="section-subtitle reveal" ref="subtitle1">四大核心能力，覆盖从采购到出货的完整业务链路。</p>
    </div>

    <div class="feature-row">
      <div class="feature-visual reveal-left" ref="visual1">
        <div class="icon-box">🛒</div>
      </div>
      <div class="feature-text reveal-right" ref="text1">
        <span class="badge">供应链引擎</span>
        <h3>智能采购预测</h3>
        <p>输入历史销量与库存周转，帮你生成精准的采购计划、补货预警和供应商建议，让缺货与积压不再是难题。</p>
        <ul>
          <li>一键生成多维度采购建议</li>
          <li>智能补货与安全库存预警</li>
          <li>支持多供应商比价与择优</li>
        </ul>
      </div>
    </div>

    <div class="feature-row">
      <div class="feature-visual reveal-right" ref="visual2">
        <div class="icon-box">📦</div>
      </div>
      <div class="feature-text reveal-left" ref="text2">
        <span class="badge">实时同步</span>
        <h3>全渠道库存实时同步</h3>
        <p>出入库、调拨、盘点数据实时更新，多仓库、多门店库存一目了然。就像一位永远在线的仓库主管。</p>
        <ul>
          <li>多仓多店库存实时联动</li>
          <li>出入库单据自动生成</li>
          <li>库存流水与批次全程追溯</li>
        </ul>
      </div>
    </div>

    <div class="feature-row">
      <div class="feature-visual reveal-left" ref="visual3">
        <div class="icon-box">🤝</div>
      </div>
      <div class="feature-text reveal-right" ref="text3">
        <span class="badge">销售赋能</span>
        <h3>销售开单与客户管理</h3>
        <p>从报价、订单到收款，全流程线上化。客户档案、历史交易、欠款情况随手可查，让每一次成交都清晰可控。</p>
        <ul>
          <li>一键报价与快速开单</li>
          <li>客户信用与欠款预警</li>
          <li>销售业绩与提成自动统计</li>
        </ul>
      </div>
    </div>

    <div class="feature-row">
      <div class="feature-visual reveal-right" ref="visual4">
        <div class="icon-box">💰</div>
      </div>
      <div class="feature-text reveal-left" ref="text4">
        <span class="badge">经营决策</span>
        <h3>业财一体与智能报表</h3>
        <p>进销存数据自动生成财务凭证，利润、成本、应收应付实时呈现。老板要的经营数据，一屏就能看完。</p>
        <ul>
          <li>自动生成凭证与财务报表</li>
          <li>毛利、成本、利润实时核算</li>
          <li>多维度经营看板与导出</li>
        </ul>
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
const visual1 = ref(null)
const text1 = ref(null)
const visual2 = ref(null)
const text2 = ref(null)
const visual3 = ref(null)
const text3 = ref(null)
const visual4 = ref(null)
const text4 = ref(null)

useRevealAnimation([label1, title1, subtitle1, visual1, text1, visual2, text2, visual3, text3, visual4, text4])
</script>

<style lang="scss" scoped>
.features-section {
  background: var(--white);
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

.feature-row {
  display: flex;
  align-items: center;
  gap: 4rem;
  margin-bottom: 6rem;

  &:nth-child(even) {
    flex-direction: row-reverse;
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.feature-visual {
  flex: 1;
  min-width: 0;
  aspect-ratio: 4/3;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  position: relative;
  overflow: hidden;
  background: var(--gray-100);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 24px;
    opacity: 0.1;
  }

  .icon-box {
    width: 100px;
    height: 100px;
    border-radius: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    background: var(--white);
    box-shadow: var(--shadow-xl);
    position: relative;
    z-index: 1;
  }
}

.feature-row:nth-child(2) .feature-visual::before { background: linear-gradient(135deg, #c4b5fd, #93c5fd); }
.feature-row:nth-child(3) .feature-visual::before { background: linear-gradient(135deg, #6ee7b7, #34d399); }
.feature-row:nth-child(4) .feature-visual::before { background: linear-gradient(135deg, #fed7aa, #fef08a); }
.feature-row:nth-child(5) .feature-visual::before { background: linear-gradient(135deg, #fbcfe8, #e5e7eb); }

.feature-text {
  flex: 1;
  min-width: 0;

  .badge {
    display: inline-block;
    padding: 0.375rem 1rem;
    border-radius: 9999px;
    font-size: 0.8125rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--gray-900);
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.0625rem;
    color: var(--gray-600);
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    li {
      font-size: 1rem;
      color: var(--gray-700);
      display: flex;
      align-items: center;
      gap: 0.75rem;

      &::before {
        content: "✓";
        color: var(--primary);
        font-weight: 700;
        font-size: 1rem;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: rgba(99, 102, 241, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}

.feature-row:nth-child(2) .badge { background: rgba(139, 92, 246, 0.1); color: #8b5cf6; }
.feature-row:nth-child(3) .badge { background: rgba(16, 185, 129, 0.1); color: #10b981; }
.feature-row:nth-child(4) .badge { background: rgba(251, 146, 60, 0.1); color: #fb923c; }
.feature-row:nth-child(5) .badge { background: rgba(236, 72, 153, 0.1); color: #ec4899; }

@media (max-width: 1024px) {
  .feature-row, .feature-row:nth-child(even) {
    flex-direction: column;
    gap: 2rem;
  }
  .feature-visual {
    width: 100%;
    aspect-ratio: 16/9;
  }
}
</style>