<script setup>
import { ClockIcon } from "@heroicons/vue/24/solid/index.js";
</script>

<template>
  <router-link to="/config/attention" class="attention-schedule-link">
    <div class="attention-schedule-card">
      <div class="attention-schedule-content">
        <ClockIcon class="schedule-icon" />
        <div class="schedule-details">
          <h3>Horarios de atención</h3>
          <p>Configura los horarios de atención de tu empresa</p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.attention-schedule-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.attention-schedule-card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.2s ease;
}

.attention-schedule-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.attention-schedule-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.schedule-icon {
  width: 3rem;
  height: 3rem;
  color: #2a3849;
  flex-shrink: 0;
}

.schedule-details h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

.schedule-details p {
  color: #666;
  font-size: 0.9rem;
}
</style>