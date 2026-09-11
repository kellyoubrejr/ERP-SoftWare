<template>
  <section class="hero" id="hero">
    <div class="parallax-bg" ref="parallaxBg"></div>
    <div class="hero-content">
      <div class="hero-badge">🚀 货 通 天 下</div>
      <h1><span class="typed-text" ref="typedText"></span><span class="cursor"></span></h1>
      <p>货通天下 释放你的经营效率。让每一笔生意都自然顺畅、高效精准。</p>
      <div class="hero-cta-group">
        <a class="hero-cta hero-cta-primary" @click="handleCTA">开始使用 →</a>
        <a class="hero-cta hero-cta-secondary" @click="handleDemo">敬请期待</a>
      </div>
    </div>
    <div class="hero-scroll-hint">
      <span>向下滚动探索</span>
      <div class="arrow"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'

const openLogin = inject('openLogin')

const parallaxBg = ref(null)
const typedText = ref(null)

const phrases = ["|货通天下|", "|智联万物|", "|生意如流|"]
let phraseIdx = 0
let charIdx = 0
let isDeleting = false
let typeTimeout = null

const typeEffect = () => {
  if (!typedText.value) return
  
  const currentPhrase = phrases[phraseIdx]
  
  if (!isDeleting) {
    typedText.value.textContent = currentPhrase.substring(0, charIdx + 1)
    charIdx++
    
    if (charIdx === currentPhrase.length) {
      isDeleting = true
      typeTimeout = setTimeout(typeEffect, 2000)
      return
    }
    typeTimeout = setTimeout(typeEffect, 100)
  } else {
    typedText.value.textContent = currentPhrase.substring(0, charIdx - 1)
    charIdx--
    
    if (charIdx === 0) {
      isDeleting = false
      phraseIdx = (phraseIdx + 1) % phrases.length
      typeTimeout = setTimeout(typeEffect, 400)
      return
    }
    typeTimeout = setTimeout(typeEffect, 50)
  }
}

const createParallax = () => {
  if (!parallaxBg.value) return
  
  for (let i = 0; i < 15; i++) {
    const circle = document.createElement("div")
    circle.className = "parallax-circle"
    const size = Math.random() * 300 + 100
    circle.style.width = size + "px"
    circle.style.height = size + "px"
    circle.style.left = Math.random() * 100 + "%"
    circle.style.top = Math.random() * 100 + "%"
    circle.style.opacity = Math.random() * 0.1 + 0.05
    circle.dataset.speed = (Math.random() * 0.3 + 0.1).toFixed(2)
    parallaxBg.value.appendChild(circle)
  }
}

const handleScroll = () => {
  if (!parallaxBg.value) return
  const circles = parallaxBg.value.querySelectorAll('.parallax-circle')
  const scrollY = window.scrollY
  circles.forEach(circle => {
    const speed = parseFloat(circle.dataset.speed)
    circle.style.transform = "translateY(" + (-scrollY * speed) + "px)"
  })
}

const handleCTA = () => {
  openLogin()
}

const handleDemo = () => {
  console.log('用户点击演示按钮')
  alert('演示视频即将推出！')
}

onMounted(() => {
  typeEffect()
  createParallax()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  if (typeTimeout) clearTimeout(typeTimeout)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  padding: 2rem;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 30% 50%, rgba(99, 102, 241, 0.2), transparent 60%),
                radial-gradient(ellipse at 70% 50%, rgba(236, 72, 153, 0.2), transparent 60%),
                radial-gradient(ellipse at 50% 80%, rgba(139, 92, 246, 0.15), transparent 60%);
  }
}

.parallax-bg {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
}

.parallax-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 900px;
}

.hero-badge {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 2rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
  50% { box-shadow: 0 0 0 12px rgba(255, 255, 255, 0); }
}

.hero h1 {
  font-size: 4rem;
  font-weight: 800;
  color: var(--white);
  margin-bottom: 1.5rem;
  line-height: 1.1;
}

.hero h1 .gradient-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero h1 .typed-text {
  display: inline;
}

.hero h1 .cursor {
  display: inline-block;
  width: 4px;
  height: 1em;
  background: var(--secondary);
  margin-left: 4px;
  animation: blink 1s infinite;
  vertical-align: text-bottom;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.hero p {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-cta-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.0625rem;
  font-weight: 600;
  text-decoration: none;
  transition: var(--transition-all);
  cursor: pointer;
}

.hero-cta-primary {
  background: var(--white);
  color: var(--primary);
  box-shadow: 0 4px 14px 0 rgba(255, 255, 255, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px 0 rgba(255, 255, 255, 0.4);
  }
}

.hero-cta-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: var(--white);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-3px);
  }
}

.hero-scroll-hint {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;

  .arrow {
    width: 24px;
    height: 24px;
    border-right: 2px solid rgba(255, 255, 255, 0.6);
    border-bottom: 2px solid rgba(255, 255, 255, 0.6);
    transform: rotate(45deg);
    animation: bounce-arrow 1.5s infinite;
  }
}

@keyframes bounce-arrow {
  0%, 100% { transform: rotate(45deg) translateY(0); }
  50% { transform: rotate(45deg) translateY(8px); }
}

@media (max-width: 768px) {
  .hero h1 { font-size: 2.75rem; }
  .hero-cta-group { flex-direction: column; align-items: center; }
  .hero-cta { width: 100%; max-width: 300px; justify-content: center; }
}

@media (prefers-reduced-motion: reduce) {
  .hero-badge { animation: none; }
  .hero h1 .cursor { animation: none; }
  .hero-scroll-hint .arrow { animation: none; }
}
</style>