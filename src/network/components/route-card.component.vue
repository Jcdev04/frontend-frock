<script>
import Button from 'primevue/button'
import editStopPopUp from "@/network/components/stop-popUps/edit-stop-popup.component.vue";
import deleteStopPopUp from "@/network/components/stop-popUps/delete-stop-popup.component.vue";
import DeleteRoutePopUp from "@/network/components/routes-popUps/delete-route-popup.component.vue";

export default {
  name: 'RutaCard',
  props: {
    route: {
      type: Object,
      required: true
    }
  },
  components: {
    DeleteRoutePopUp,
    deleteStopPopUp,
    editStopPopUp,
    Button
  },
  emits: ['updated', 'deleted'],
}
</script>

<template>
  <div class="route-card-horizontal">
    <!-- Imágenes grandes, al inicio y al final -->
    <div class="stop-image-large">
      <img :src="route.stops[0].image_url" alt="Origen" />
    </div>
    <div class="route-info-section">
      <div class="route-stops-names">
        <div>
          <div class="stop-name">{{ route.stops[0].name }}</div>
          <div class="stop-address">{{ route.stops[0].address }}</div>
        </div>
        <div class="swap-icon-center">
          <i class="pi pi-arrows-h" />
        </div>
        <div>
          <div class="stop-name">{{ route.stops[1].name }}</div>
          <div class="stop-address">{{ route.stops[1].address }}</div>
        </div>
      </div>
      <div class="route-info-row">
        <div class="info-block">
          <i class="pi pi-clock info-icon" />
          <div>
            <span class="info-label">Duración</span>
            <span class="info-value">{{ route.duration }} min</span>
          </div>
        </div>
        <div class="info-block">
          <i class="pi pi-car info-icon" />
          <div>
            <span class="info-label">Frecuencia</span>
            <span class="info-value">{{ route.frequency }} min</span>
          </div>
        </div>
        <div class="info-block">
          <i class="pi pi-dollar info-icon" />
          <div>
            <span class="info-label">Tarifa</span>
            <span class="info-value">S/ {{ route.price }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="stop-image-large">
      <img :src="route.stops[1].image_url" alt="Destino" />
    </div>
    <section class="route-buttons-horizontal">
      <delete-route-pop-up
          label="Borrar"
          :route-id="route.id"
          @deleted="$emit('deleted', $event)"
          icon="pi pi-trash"
          class="delete-btn"
      />
    </section>
  </div>
</template>

<style scoped>
.route-card-horizontal {
  width: 100%;
  margin: 16px auto;
  background: #fff;
  border-radius: 22px;
  box-shadow: 0 8px 32px rgba(80, 89, 168, 0.09), 0 1.5px 4px #e5e5f7;
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1.5rem 2rem;
  transition: box-shadow 0.2s;
}

.route-card-horizontal:hover {
  box-shadow: 0 16px 48px rgba(80, 89, 168, 0.16), 0 3px 10px #e5e5f7;
}

.stop-image-large {
  width: 110px;
  height: 110px;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(80,89,168,0.10);
  background: #f5f6fa;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stop-image-large img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.route-info-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.route-stops-names {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 8px;
}

.swap-icon-center {
  color: #8b8bbe;
  margin: 0 14px;
  *{
    font-size: 34px;

  }
}


.stop-name {
  font-weight: 700;
  font-size: 1.18rem;
  color: #28287b;
  margin-bottom: 3px;
}

.stop-address {
  font-size: 0.98rem;
  color: #7878a3;
  font-weight: 400;
}

.route-info-row {
  display: flex;
  gap: 26px;
}

.info-block {
  background: #f5f6fa;
  border-radius: 12px;
  padding: 0.9rem 1.2rem;
  flex: 1 1 0;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  min-width: 110px;
}

.info-icon {
  font-size: 25px;
  color: #6058ea;
}

.info-label {
  display: block;
  font-size: 0.93rem;
  color: #8a8aad;
}

.info-value {
  display: block;
  font-weight: 600;
  font-size: 1.10rem;
  color: #232360;
  margin-top: -2px;
}

.route-buttons-horizontal {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  margin-left: 24px;
}

.delete-btn {
  border: 1.5px solid #fa5656 !important;
  background: #fff !important;
  color: #fa5656 !important;
  font-weight: 600;
  border-radius: 10px;
  min-width: 110px;
  padding: 10px 0;
  transition: background 0.15s, color 0.15s;
}
.delete-btn:hover {
  background: #fa5656 !important;
  color: #fff !important;
}


</style>