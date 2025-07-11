<template>
  <div class="login-container">
    <div class="lang-switcher">
      <button @click="setLang('es')" :class="{ active: locale === 'es' }">ES</button>
      <button @click="setLang('en')" :class="{ active: locale === 'en' }">EN</button>
    </div>

    <div class="login-card animate__animated animate__fadeInDown">
      <div class="logo-container">
        <img src="@/assets/logo-chapaturuta.png" alt="Logo" class="logo" />
      </div>

      <h1>{{ t('login.title') }}</h1>

      <form @submit.prevent="handleLogin" novalidate>
        <div class="form-group" :class="{ 'has-error': emailTouched && !isEmailValid }">
          <label for="email">{{ t('login.email') }}</label>
          <input
              type="email"
              id="email"
              v-model.trim="email"
              @blur="emailTouched = true"
              :class="{ 'invalid': emailTouched && !isEmailValid }"
              :placeholder="t('login.emailPlaceholder')"
              required
          />
          <small v-if="emailTouched && !isEmailValid">{{ t('login.invalidEmail') }}</small>
        </div>

        <div class="form-group" :class="{ 'has-error': passwordTouched && !password }">
          <label for="password">{{ t('login.password') }}</label>
          <input
              type="password"
              id="password"
              v-model.trim="password"
              @blur="passwordTouched = true"
              :class="{ 'invalid': passwordTouched && !password }"
              :placeholder="t('login.passwordPlaceholder')"
              required
          />
          <small v-if="passwordTouched && !password">{{ t('login.requiredPassword') }}</small>
        </div>

        <transition name="fade">
          <div v-if="error" class="error-message">
            {{ t(error) }}
          </div>
        </transition>

        <button type="submit" class="btn-login" :disabled="isLoading || !canSubmit">
          <span v-if="isLoading" class="spinner"></span>
          {{ isLoading ? t('login.loading') : t('login.button') }}
        </button>
      </form>

      <div class="register-link">
        {{ t('login.noAccount') }}
        <router-link :to="APP_ROUTES.AUTH.REGISTER">
          {{ t('login.register') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { APP_ROUTES } from '@/shared/services/routes.js'
import { AuthService } from '@/access-and-identity/services/auth.service.js'
import { TransportCompanyService } from "@/transport-company/services/transport-company.service.js"

const { t, locale } = useI18n()

const email = ref('')
const password = ref('')
const error = ref(null)
const isLoading = ref(false)
const emailTouched = ref(false)
const passwordTouched = ref(false)

const isEmailValid = computed(() =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
)

const canSubmit = computed(() =>
    email.value && isEmailValid.value && password.value
)

function setLang(lang) {
  locale.value = lang
}

async function handleLogin() {
  isLoading.value = true
  error.value = null

  try {
    const authService = new AuthService()
    const response = await authService.login({ email: email.value, password: password.value })

    localStorage.setItem('token', response.token)
    localStorage.setItem('user', JSON.stringify({
      id: response.id,
      username: response.username,
      role: response.role
    }))

    if (response.role === 0) {
      window.location.href = '/'
    }

    if (response.role === 1) {
      const transportCompanyService = new TransportCompanyService()
      try {
        const companyData = await transportCompanyService.getCompanyByFkUserId(response.id)
        localStorage.setItem('user', JSON.stringify({
          id: response.id,
          username: response.username,
          role: response.role,
          companyId: companyData.id,
          companyName: companyData.name,
          companyImgUrl: companyData.logoUrl
        }))

        //console log
        console.log('User (company role) data:', companyData)

        window.location.href = '/company/home'
      } catch {
        window.location.href = '/company/onboarding'
      }
    }

  } catch (err) {
    console.error('Login error:', err)
    error.value = 'login.error'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';

.login-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem 1.5rem;
  background: linear-gradient(135deg, #f0f0f0, #dfe6e9);
}

.lang-switcher {
  align-self: flex-end;
  margin-bottom: 1rem;
  margin-right: 1rem;
}

.lang-switcher button {
  background: none;
  border: none;
  margin-left: 10px;
  font-weight: bold;
  cursor: pointer;
  color: #6c5ce7;
  font-size: 14px;
}

.lang-switcher .active {
  text-decoration: underline;
}

.login-card {
  background: #fff;
  border-radius: 16px;
  padding: 2.5rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  text-align: center;
}

.logo-container {
  margin-bottom: 1.5rem;
}

.logo {
  height: 72px;
  object-fit: contain;
}

h1 {
  margin-bottom: 1.5rem;
  font-weight: 600;
  font-size: 24px;
  color: #2d3436;
}

.form-group {
  margin-bottom: 1.2rem;
  text-align: left;
}

input {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #6c5ce7;
  box-shadow: 0 0 0 2px rgba(108, 92, 231, 0.1);
}

.invalid {
  border-color: #e17055;
}

small {
  color: #e17055;
  font-size: 12px;
  margin-top: 4px;
  display: block;
}

.error-message {
  color: #d63031;
  background: #ffeaea;
  padding: 10px 14px;
  border-radius: 6px;
  margin-bottom: 10px;
  font-size: 14px;
  text-align: center;
}

.btn-login {
  width: 100%;
  padding: 12px;
  background-color: #6c5ce7;
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-login:hover {
  background-color: #5945d1;
}

.btn-login:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.spinner {
  border: 3px solid #fff;
  border-top: 3px solid #6c5ce7;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
  margin-right: 8px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.register-link {
  margin-top: 1.5rem;
  font-size: 14px;
  color: #555;
}

.register-link a {
  color: #6c5ce7;
  text-decoration: none;
  font-weight: 500;
  margin-left: 4px;
}

.register-link a:hover {
  text-decoration: underline;
}
.lang-switcher {
  position: absolute;
  top: 20px;
  right: 20px;
  background: #ecf0f1;
  border-radius: 8px;
  padding: 6px 12px;
  display: flex;
  gap: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.lang-switcher button {
  background-color: transparent;
  border: none;
  font-weight: bold;
  cursor: pointer;
  color: #2c3e50;
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.3s ease, color 0.3s ease;
}

.lang-switcher button:hover {
  background-color: #dfe6e9;
}

.lang-switcher .active {
  background-color: #6c5ce7;
  color: white;
}


.has-error input {
  border-color: #e17055;
}
</style>
