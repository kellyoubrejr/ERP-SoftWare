<template>
  <div id="app">
    <AppHeader />
    <main>
      <RouterView />
    </main>
    <AppFooter />
    <LoginModal :visible="showLogin" @close="showLogin = false" @login-success="onLoginSuccess" />
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import LoginModal from './components/LoginModal.vue'
import { RouterView } from 'vue-router'

const showLogin = ref(false)

// 提供给子组件打开登录弹窗的方法
const openLogin = () => { showLogin.value = true }
provide('openLogin', openLogin)

const onLoginSuccess = (user) => {
  console.log('登录成功:', user)
  // TODO: 后续可跳转到管理后台
}
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
