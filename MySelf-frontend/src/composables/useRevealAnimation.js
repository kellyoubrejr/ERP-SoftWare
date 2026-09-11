import { onMounted, onUnmounted } from 'vue'

export function useRevealAnimation(refs) {
  let observer = null

  const initObserver = () => {
    if (!('IntersectionObserver' in window)) {
      // 如果不支持IntersectionObserver，直接显示
      refs.forEach(ref => {
        if (ref.value) {
          ref.value.classList.add('visible')
        }
      })
      return
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, { 
      threshold: 0.15, 
      rootMargin: "0px 0px -60px 0px" 
    })

    refs.forEach(ref => {
      if (ref.value) {
        observer.observe(ref.value)
      }
    })
  }

  onMounted(() => {
    initObserver()
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })
}