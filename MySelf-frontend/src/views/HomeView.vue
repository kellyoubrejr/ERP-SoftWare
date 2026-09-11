<template>
  <div class="home-view">
    <HeroSection />
    <PainPoints />
    <FeaturesSection />
    <StatsSection />
    <TestimonialsSection />
    <CTASection />
  </div>
</template>

<script setup>
import HeroSection from '@/components/HeroSection.vue'
import PainPoints from '@/components/PainPoints.vue'
import FeaturesSection from '@/components/FeaturesSection.vue'
import StatsSection from '@/components/StatsSection.vue'
import TestimonialsSection from '@/components/TestimonialsSection.vue'
import CTASection from '@/components/CTASection.vue'
</script>

<style lang="scss" scoped>
.home-view {
  min-height: 100vh;
}
</style>