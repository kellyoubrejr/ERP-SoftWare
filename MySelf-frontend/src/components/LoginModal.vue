<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="modal-overlay" @click.self="$emit('close')">
        <div class="modal-container">
          <!-- 左侧装饰区 -->
          <div class="modal-left">
            <div class="modal-left-content">
              <div class="brand-icon">📦</div>
              <h2>货通天下</h2>
              <p>智能进销存管理系统</p>
              <div class="feature-tags">
                <span>🛒 智能采购</span>
                <span>📦 库存同步</span>
                <span>🤝 销售赋能</span>
                <span>💰 经营决策</span>
              </div>
            </div>
            <div class="modal-left-bg">
              <div class="bg-circle bg-circle-1"></div>
              <div class="bg-circle bg-circle-2"></div>
              <div class="bg-circle bg-circle-3"></div>
            </div>
          </div>

          <!-- 右侧登录区 -->
          <div class="modal-right">
            <button class="modal-close" @click="$emit('close')" title="关闭">✕</button>

            <div class="login-header">
              <h3>欢迎回来</h3>
              <p>登录你的账户，开始高效工作</p>
            </div>

            <form class="login-form" @submit.prevent="handleLogin">
              <div class="input-group" :class="{ focused: focusUser, error: errorMsg && !form.username }">
                <label for="username">用户名</label>
                <div class="input-wrapper">
                  <span class="input-icon">👤</span>
                  <input
                    id="username"
                    v-model="form.username"
                    type="text"
                    placeholder="请输入用户名"
                    autocomplete="username"
                    @focus="focusUser = true"
                    @blur="focusUser = false"
                  />
                </div>
              </div>

              <div class="input-group" :class="{ focused: focusPass, error: errorMsg && !form.password }">
                <label for="password">密码</label>
                <div class="input-wrapper">
                  <span class="input-icon">🔒</span>
                  <input
                    id="password"
                    v-model="form.password"
                    :type="showPass ? 'text' : 'password'"
                    placeholder="请输入密码"
                    autocomplete="current-password"
                    @focus="focusPass = true"
                    @blur="focusPass = false"
                  />
                  <button type="button" class="toggle-pass" @click="showPass = !showPass">
                    {{ showPass ? '🙈' : '👁️' }}
                  </button>
                </div>
              </div>

              <Transition name="shake">
                <div v-if="errorMsg" class="error-msg">{{ errorMsg }}</div>
              </Transition>

              <button type="submit" class="login-btn" :class="{ loading: isLoading }" :disabled="isLoading">
                <span v-if="!isLoading">登 录</span>
                <span v-else class="spinner"></span>
              </button>
            </form>

            <div class="login-footer">
              <p>账号由管理员创建，请联系管理员获取</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, reactive } from 'vue'

defineProps({
  visible: { type: Boolean, default: false }
})

const emit = defineEmits(['close', 'login-success'])

const form = reactive({ username: '', password: '' })
const showPass = ref(false)
const focusUser = ref(false)
const focusPass = ref(false)
const errorMsg = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  errorMsg.value = ''

  if (!form.username.trim()) {
    errorMsg.value = '请输入用户名'
    return
  }
  if (!form.password) {
    errorMsg.value = '请输入密码'
    return
  }

  isLoading.value = true

  // 模拟登录请求（后续对接后端 API）
  try {
    // TODO: 替换为真实 API 调用
    // const res = await fetch('/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ username: form.username, password: form.password })
    // })
    // const data = await res.json()

    await new Promise(resolve => setTimeout(resolve, 800))

    // 模拟：admin/admin123 通过
    if (form.username === 'admin' && form.password === 'admin123') {
      localStorage.setItem('token', 'mock-token-' + Date.now())
      localStorage.setItem('user', JSON.stringify({ username: form.username }))
      emit('login-success', { username: form.username })
      emit('close')
    } else {
      errorMsg.value = '用户名或密码错误'
    }
  } catch (e) {
    errorMsg.value = '网络异常，请稍后重试'
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
/* 遮罩层 */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

/* 弹窗容器 */
.modal-container {
  display: flex;
  width: 100%;
  max-width: 860px;
  min-height: 520px;
  background: var(--white);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 32px 64px rgba(0, 0, 0, 0.25);
  position: relative;
}

/* 左侧装饰区 */
.modal-left {
  flex: 1;
  background: linear-gradient(135deg, #4f46e5, #7c3aed, #a855f7);
  padding: 3rem 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  .modal-left-content {
    position: relative;
    z-index: 2;
    text-align: center;
    color: var(--white);

    .brand-icon {
      font-size: 4rem;
      margin-bottom: 1.5rem;
      filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2));
    }

    h2 {
      font-size: 2rem;
      font-weight: 800;
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 1rem;
      opacity: 0.85;
      margin-bottom: 2rem;
    }

    .feature-tags {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;

      span {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(4px);
        border-radius: 12px;
        font-size: 0.875rem;
        font-weight: 500;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
    }
  }

  .modal-left-bg {
    position: absolute;
    inset: 0;
    overflow: hidden;

    .bg-circle {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.08);

      &.bg-circle-1 { width: 300px; height: 300px; top: -80px; right: -60px; }
      &.bg-circle-2 { width: 200px; height: 200px; bottom: -40px; left: -40px; }
      &.bg-circle-3 { width: 120px; height: 120px; bottom: 30%; right: 10%; background: rgba(255, 255, 255, 0.05); }
    }
  }
}

/* 右侧登录区 */
.modal-right {
  flex: 1;
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  .modal-close {
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
    width: 36px;
    height: 36px;
    border: none;
    background: var(--gray-100);
    border-radius: 50%;
    font-size: 1rem;
    color: var(--gray-500);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;

    &:hover {
      background: var(--gray-200);
      color: var(--gray-800);
    }
  }
}

/* 登录头部 */
.login-header {
  margin-bottom: 2rem;

  h3 {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--gray-800);
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.9375rem;
    color: var(--gray-500);
  }
}

/* 表单 */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;

  label {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--gray-700);
    transition: color 0.2s;
  }

  &.focused label {
    color: var(--primary);
  }

  &.error label {
    color: #ef4444;
  }
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0 1rem;
  height: 48px;
  background: var(--gray-100);
  border: 2px solid transparent;
  border-radius: 12px;
  transition: all 0.25s;

  .input-icon {
    font-size: 1.125rem;
    flex-shrink: 0;
  }

  input {
    flex: 1;
    border: none;
    background: transparent;
    font-size: 0.9375rem;
    color: var(--gray-800);
    outline: none;

    &::placeholder {
      color: var(--gray-400);
    }
  }

  .toggle-pass {
    border: none;
    background: transparent;
    font-size: 1.125rem;
    cursor: pointer;
    padding: 0;
    flex-shrink: 0;
    opacity: 0.6;
    transition: opacity 0.2s;

    &:hover { opacity: 1; }
  }
}

.input-group.focused .input-wrapper {
  border-color: var(--primary);
  background: var(--white);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

.input-group.error .input-wrapper {
  border-color: #ef4444;
  background: #fef2f2;
}

/* 错误信息 */
.error-msg {
  font-size: 0.8125rem;
  color: #ef4444;
  padding: 0.5rem 0.75rem;
  background: #fef2f2;
  border-radius: 8px;
  border: 1px solid #fecaca;
}

/* 登录按钮 */
.login-btn {
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: var(--white);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 0.5rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    opacity: 0;
    transition: opacity 0.3s;
  }

  span {
    position: relative;
    z-index: 1;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(99, 102, 241, 0.35);

    &::before { opacity: 1; }
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &.loading {
    cursor: not-allowed;
    opacity: 0.85;
  }
}

/* 加载动画 */
.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2.5px solid rgba(255, 255, 255, 0.3);
  border-top-color: var(--white);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 底部提示 */
.login-footer {
  margin-top: 2rem;
  text-align: center;

  p {
    font-size: 0.8125rem;
    color: var(--gray-400);
  }
}

/* 弹窗过渡动画 */
.modal-enter-active {
  .modal-container {
    animation: modal-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
}

.modal-leave-active {
  .modal-container {
    animation: modal-out 0.25s ease-in forwards;
  }
}

@keyframes modal-in {
  from { opacity: 0; transform: scale(0.9) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

@keyframes modal-out {
  from { opacity: 1; transform: scale(1) translateY(0); }
  to { opacity: 0; transform: scale(0.9) translateY(20px); }
}

.modal-enter-active .modal-overlay,
.modal-leave-active .modal-overlay {
  transition: opacity 0.3s;
}

/* 错误抖动动画 */
.shake-enter-active { animation: shake 0.4s; }
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(6px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
}

/* 响应式 */
@media (max-width: 700px) {
  .modal-container {
    flex-direction: column;
    max-width: 420px;
    min-height: auto;
  }

  .modal-left {
    padding: 2rem 1.5rem;

    .modal-left-content {
      .brand-icon { font-size: 2.5rem; margin-bottom: 1rem; }
      h2 { font-size: 1.5rem; }
      p { margin-bottom: 1rem; }
      .feature-tags { flex-direction: row; flex-wrap: wrap; justify-content: center; gap: 0.5rem; }
      .feature-tags span { font-size: 0.75rem; padding: 0.375rem 0.75rem; }
    }
  }

  .modal-right {
    padding: 2rem 1.5rem;
  }
}
</style>
