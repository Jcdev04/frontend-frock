<template>
  <div class="lang-switcher">
    <button @click="setLang('es')" :class="{ active: locale === 'es' }">ES</button>
    <button @click="setLang('en')" :class="{ active: locale === 'en' }">EN</button>
  </div>

  <div class="auth-container">
    <div class="auth-card animate__animated animate__fadeInUp">
      <div class="icon-wrapper">
        <img src="@/assets/logo-chapaturuta.png" alt="Logo" class="icon" />
      </div>
      <h1>{{ t('register.title') }}</h1>

      <form @submit.prevent="handleSubmit" novalidate>
        <div class="form-group" :class="{ 'has-error': touched.firstName && !firstName }">
          <input
              type="text"
              v-model.trim="firstName"
              :placeholder="t('register.firstNamePlaceholder')"
              @blur="touched.firstName = true"
              required
          />
          <small v-if="touched.firstName && !firstName">{{ t('register.required') }}</small>
        </div>

        <div class="form-group" :class="{ 'has-error': touched.lastName && !lastName }">
          <input
              type="text"
              v-model.trim="lastName"
              :placeholder="t('register.lastNamePlaceholder')"
              @blur="touched.lastName = true"
              required
          />
          <small v-if="touched.lastName && !lastName">{{ t('register.required') }}</small>
        </div>

        <div class="form-group" :class="{ 'has-error': touched.email && !isEmailValid }">
          <input
              type="email"
              v-model.trim="email"
              :placeholder="t('register.emailPlaceholder')"
              @blur="touched.email = true"
              required
          />
          <small v-if="touched.email && !isEmailValid">{{ t('register.invalidEmail') }}</small>
        </div>

        <div class="form-group" :class="{ 'has-error': touched.password && !password }">
          <input
              type="password"
              v-model.trim="password"
              :placeholder="t('register.passwordPlaceholder')"
              @blur="touched.password = true"
              required
          />
          <small v-if="touched.password && !password">{{ t('register.required') }}</small>
        </div>

        <div class="form-group" :class="{ 'has-error': touched.role && !role }">
          <select v-model="role" @blur="touched.role = true" required>
            <option disabled value="">{{ t('register.selectRole') }}</option>
            <option value="0">{{ t('register.driver') }}</option>
            <option value="1">{{ t('register.manager') }}</option>
          </select>
          <small v-if="touched.role && !role">{{ t('register.selectRequired') }}</small>
        </div>

        <button type="submit" class="btn-submit" :disabled="!canSubmit || isLoading">
          <span v-if="isLoading" class="spinner"></span>
          {{ isLoading ? t('register.processing') : t('register.button') }}
        </button>

        <transition name="fade">
          <div v-if="message" class="message">{{ message }}</div>
        </transition>
      </form>

      <div class="switch-link">
        {{ t('register.hasAccount') }}
        <router-link :to="APP_ROUTES.AUTH.LOGIN">{{ t('register.loginLink') }}</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { APP_ROUTES } from '@/shared/services/routes.js'
import { AuthService } from '@/access-and-identity/services/auth.service.js'

const { t, locale } = useI18n()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const role = ref('')
const isLoading = ref(false)
const message = ref(null)

const touched = reactive({
  firstName: false,
  lastName: false,
  email: false,
  password: false,
  role: false
})

const isEmailValid = computed(() =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
)

const canSubmit = computed(() =>
    firstName.value &&
    lastName.value &&
    isEmailValid.value &&
    password.value &&
    role.value !== ''
)

function setLang(lang) {
  locale.value = lang
}

async function handleSubmit() {
  isLoading.value = true
  message.value = null

  try {
    const credentials = {
      username: `${firstName.value} ${lastName.value}`.trim(),
      email: email.value,
      password: password.value,
      role: role.value
    }

    const authService = new AuthService()
    await authService.register(credentials)

    message.value = t('register.success')

    localStorage.setItem('registeredUser', JSON.stringify({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      role: role.value
    }))

    setTimeout(() => {
      window.location.href = APP_ROUTES.AUTH.LOGIN
    }, 1000)
  } catch (err) {
    console.error('Error en registro:', err)
    message.value = t('register.error')
  } finally {
    isLoading.value = false
  }
}
</script>
<style scoped>
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';

.auth-container {
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

.auth-card {
  background: #fff;
  border-radius: 16px;
  padding: 2.5rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease;
}

.icon-wrapper {
  margin-bottom: 1.5rem;
}

.icon {
  width: 72px;
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

input,
select {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

input:focus,
select:focus {
  border-color: #6c5ce7;
  box-shadow: 0 0 0 2px rgba(108, 92, 231, 0.1);
  outline: none;
}

.has-error input,
.has-error select {
  border-color: #e17055;
}

small {
  color: #e17055;
  font-size: 12px;
  margin-top: 4px;
  display: block;
}

.btn-submit {
  width: 100%;
  padding: 12px;
  margin-top: 1rem;
  background-color: #6c5ce7;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-submit:hover {
  background-color: #5945d1;
}

.btn-submit:disabled {
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

.message {
  margin-top: 1rem;
  font-size: 14px;
  color: #28a745;
  background-color: #eafae5;
  padding: 10px;
  border-radius: 6px;
}

.switch-link {
  margin-top: 1.5rem;
  font-size: 14px;
  color: #555;
}

.switch-link a {
  color: #6c5ce7;
  text-decoration: none;
  margin-left: 4px;
  font-weight: 500;
}

.switch-link a:hover {
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


</style>
