import { onMounted, onUnmounted } from 'vue'

export function useCounterAnimation(ref, target, duration = 2000, decimals = 0) {
  let observer = null

  const formatNumber = (n, decimals) => {
    if (n >= 1000000) {
      return (n / 1000000).toFixed(n >= 10000000 ? 0 : 1).replace(/\.0$/, "") + "00万"
    }
    if (decimals > 0) return n.toFixed(decimals)
    return Math.floor(n).toLocaleString()
  }

  const animateCounter = (element) => {
    const startTime = performance.now()

    const step = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * target
      element.textContent = formatNumber(current, decimals)
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }

  onMounted(() => {
    if (!ref.value) return

    if (!('IntersectionObserver' in window)) {
      animateCounter(ref.value)
      return
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.5 })

    observer.observe(ref.value)
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })
}