<script setup>
import { BuildingOfficeIcon } from "@heroicons/vue/24/solid/index.js";

import companyInformation from "@/transport-company/pages/CompanyInformation.vue";


</script>

<template>
  <router-link to="information" class="company-info-link">
    <div class="company-info-card">
      <div class="company-info-content">
        <BuildingOfficeIcon class="company-icon" />
        <div class="company-details">
          <h3>Editar información de Empresa</h3>
          <p>Mantén actualizada la información de tu empresa de transporte</p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.company-info-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.company-info-card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.2s ease;
}

.company-info-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.company-info-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.company-icon {
  width: 3rem;
  height: 3rem;
  color: #2a3849;
  flex-shrink: 0;
}

.company-details h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

.company-details p {
  color: #666;
  font-size: 0.9rem;
}
</style>