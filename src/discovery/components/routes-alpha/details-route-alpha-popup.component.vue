<script>

import {ref} from "vue";

export default {
  name: "DetailsRouteAlphaPopup",

  props: ['route'],

  setup() {
    const visiblePop = ref(false);

    return {
      visiblePop
    };
  },

  mounted() {
    //console log de route
    console.log("Route details:", this.route);
  }

}
</script>

<template>
  <pb-Button class="mostrar-detalles-button" icon="pi pi-zoom" label="Mostrar detalles" @click="visiblePop = true"/>

  <pb-Dialog v-model:visible="visiblePop" modal :style="{ width: '42rem', borderRadius: '2rem' }">
    <div class="route-details-container">
      <!-- Encabezado: precio y duración -->
      <div class="header">
        <div class="price">
          <span class="label">Precio:</span> <span class="value">S/ {{ route.price }}</span>
        </div>
        <div class="duration">
          <span class="label">Duración:</span> <span class="value">{{ route.duration }} min</span>
        </div>
        <div class="frequency">
          <span class="label">Frecuencia:</span> <span class="value">{{ route.frequency }} min</span>
        </div>
      </div>

      <!-- Paradas principales -->
      <div class="stops">
        <div
            v-for="(stop, idx) in route.stops"
            :key="stop.id"
            class="stop-card"
        >
          <img :src="stop.image_url" class="stop-image" alt="Imagen de parada"/>
          <div class="stop-info">
            <div class="stop-name">{{ stop.name }}</div>
            <div class="stop-address">{{ stop.address }}</div>
          </div>
          <template v-if="idx === 0 && route.stops.length === 2">
            <div class="arrow">
              <i class="pi pi-arrow-right" />
            </div>
          </template>
        </div>
      </div>

      <!-- Horarios -->
      <!-- Horarios -->
      <div class="schedule-section" v-if="route.schedules && route.schedules.length">
        <div class="section-title">Horarios</div>
        <div class="schedules-list">
          <div
              v-for="(sch, i) in route.schedules"
              :key="i"
              class="schedule-row-modern"
              :class="{ disabled: !sch.enabled }"
          >
            <span class="chip-day">{{ sch.dayOfWeek }}</span>
            <span class="chip-time">
        <i class="pi pi-clock" style="font-size:1.1em;vertical-align:middle;margin-right:0.3em;"/>
        {{ sch.startTime }} - {{ sch.endTime }}
      </span>
            <span v-if="!sch.enabled" class="chip-disabled">(No habilitado)</span>
          </div>
        </div>
      </div>
    </div>
  </pb-Dialog>
</template>

<style scoped>

.mostrar-detalles-button {
  --p-button-primary-hover-background: #6362e9;
  --p-button-primary-hover-border-color: transparent;


  --p-button-primary-active-background: #7A78FF;
  --p-button-primary-active-border-color: transparent;

  background-color: #7A78FF;
  border: transparent; border-radius: 8px;

  height: 2.2rem;
}

.route-details-container {
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  padding: 1.6rem 1.1rem 1.3rem 1.1rem;
  background: #fafbfc;
}

.header {
  display: flex;
  justify-content: space-between;
  background: #f4f4f5;
  border-radius: 1.2rem;
  box-shadow: 0 2px 10px 0 rgba(80,120,50,0.03);
  padding: 1.25rem 1.5rem;
  font-size: 1.18rem;
  font-weight: 500;
  gap: 1.8rem;
}

.header .label {
  color: #64748b;
  font-weight: 400;
  margin-right: 0.2em;
  font-size: 1.04rem;
}

.header .value {
  font-weight: 700;
  color: #16a34a;
  font-size: 1.08rem;
}

.stops {
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 2.6rem;
  margin: 0.3rem 0;
}

.stop-card {
  background: #fff;
  border-radius: 1.3rem;
  box-shadow: 0 2px 16px 0 rgba(45,55,85,0.06);
  padding: 1.1rem 1.3rem 0.95rem 1.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 148px;
  max-width: 220px;
  flex: 1 1 0;
  transition: box-shadow 0.2s;
}

.stop-card:hover {
  box-shadow: 0 4px 18px 0 rgba(22,163,74,0.13);
}

.stop-image {
  width: 84px;
  height: 84px;
  object-fit: cover;
  border-radius: 1.2rem;
  border: 2.5px solid #e5e7eb;
  background: #f4f4f5;
  box-shadow: 0 1px 5px rgba(80,120,50,0.05);
  margin-bottom: 0.85rem;
}

.stop-info {
  text-align: center;
  width: 100%;
}

.stop-name {
  font-size: 1.09rem;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: 0.01em;
  margin-bottom: 0.19rem;
}

.stop-address {
  font-size: 0.97rem;
  color: #7c7f87;
  word-break: break-word;
  line-height: 1.25;
}

.arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.4rem;
  color: #b6bbc8;
  margin: 0 0.6rem;
  height: 100%;
}

.schedule-section {
  margin-top: 0.5rem;
}

.section-title {
  font-size: 1.12rem;
  font-weight: 700;
  color: #22223b;
  margin-bottom: 0.7rem;
  letter-spacing: 0.01em;
}

.schedules-list {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin-bottom: 0.3rem;
}

.schedule-row-modern {
  display: flex;
  align-items: center;
  gap: 1.1rem;
  background: #f5f7fa;
  border-radius: 0.9rem;
  padding: 0.68rem 1.1rem;
  box-shadow: 0 2px 6px 0 rgba(80,120,50,0.04);
  transition: background 0.15s;
  font-size: 1.05rem;
}

.chip-day {
  background: #16a34a22;
  color: #16a34a;
  font-weight: 700;
  font-size: 1.03rem;
  padding: 0.33em 1.05em;
  border-radius: 1.2em;
  letter-spacing: 0.04em;
  margin-right: 0.5em;
}

.chip-time {
  color: #374151;
  font-weight: 500;
  background: #f1f5f9;
  padding: 0.33em 1.1em;
  border-radius: 1em;
  font-size: 0.99rem;
}

.chip-disabled {
  color: #e11d48;
  font-weight: 600;
  font-size: 0.98rem;
  margin-left: 1.2em;
  background: #fdf2f8;
  padding: 0.21em 0.85em;
  border-radius: 1em;
}

.schedule-row-modern.disabled {
  opacity: 0.65;
  background: #fbe9eb;
  border: 1px dashed #e11d48;
}


.schedule-row .disabled {
  color: #e11d48;
  font-size: 0.98rem;
  font-weight: 600;
  margin-left: 1rem;
}

/* Responsive */
@media (max-width: 820px) {
  .route-details-container {
    padding: 1.1rem 0.3rem 0.7rem 0.3rem;
    gap: 1.1rem;
  }
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.6rem;
    font-size: 1rem;
    padding: 1rem 0.8rem;
  }
  .stops {
    flex-direction: column;
    gap: 1.5rem;
  }
  .stop-card {
    max-width: 99vw;
    width: 100%;
    min-width: 0;
  }
}

</style>


