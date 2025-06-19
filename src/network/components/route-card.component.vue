<script>
import Button from 'primevue/button'
import editStopPopUp from "@/network/components/stop-popUps/edit-stop-popup.component.vue";
import deleteStopPopUp from "@/network/components/stop-popUps/delete-stop-popup.component.vue";

export default {
  name: 'RutaCard',
  props: {
    route: {
      type: Object,
      required: true
    }
  },
  components: {
    deleteStopPopUp,
    editStopPopUp,
    Button
  },
  emits: ['updated', 'deleted'],
}
</script>

<template>
  <div class="route-card">
    <div class="route-stops">
      <div class="stop">
        <div class="stop-image" />
        <div class="stop-name">{{route.stopStart.name}}</div>
        <div class="stop-address">{{route.stopStart.address}}</div>
      </div>

      <div class="swap-icon">
        <i class="pi pi-arrows-h" />
      </div>

      <div class="stop">
        <div class="stop-image" />
        <div class="stop-name">{{route.stopEnd.name}}</div>
        <div class="stop-address">{{route.stopEnd.address}}</div>
      </div>
    </div>

    <div class="route-info">
      <div class="info-block">
        <i class="pi pi-clock info-icon blue" />
        <div class="info-label">Duración</div>
        <div class="info-value">{{ route.duration }}min</div>
      </div>
      <div class="info-block">
        <i class="pi pi-car info-icon green" />
        <div class="info-label">Frencuencia de salida</div>
        <div class="info-value">{{ route.frequency }}min</div>
      </div>
      <div class="info-block">
        <i class="pi pi-dollar info-icon green" />
        <div class="info-label">Tarifa</div>
        <div class="info-value">{{ route.price }}</div>
      </div>
    </div>

    <section class="route-buttons">
      <Button label="Editar" :route="route" @updated="$emit('updated', $event)" icon="pi pi-pencil" class="edit-btn" />
      <Button label="Borrar" :route-id="route.id" @deleted="$emit('deleted', $event)" icon="pi pi-trash" class="delete-btn" />
    </section>
  </div>
</template>

<style scoped>

.route-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.route-stops {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}

.stop {
  flex: 1;
}

.stop-image {
  width: 60px;
  height: 60px;
  background: var(--color-slate-100);
  border-radius: 8px;
  margin: 0 auto 0.5rem;
}

.stop-name {
  font-weight: bold;
}

.stop-address {
  font-size: 0.85rem;
  color: #6b7280;
}

.swap-icon {
  font-size: 3rem;
  color: var(--color-slate-500);
  margin: 0 1rem;
  align-self: center;
}

.route-info {
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
}

.info-block {
  flex: 1;
  text-align: center;
}

.info-icon {
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
  display: block;
}

.info-icon.blue {
  color: var(--color-info);
}

.info-icon.green {
  color: var(--color-success);
}

.info-label {
  font-size: 0.85rem;
  color: var(--color-slate-500);
}

.info-value {
  font-weight: 600;
  margin-top: 0.25rem;
}

.route-buttons{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.4rem;
}

.edit-btn {
  border: 1px solid var(--color-info) !important;
  color: var(--color-info);
  background-color: var(--color-white);
  font-weight: 500;
  border-radius: 6px;
  width: 100%;
}

.edit-btn:hover{
  background-color: var(--color-info) !important;
  color: var(--color-white);
}

.delete-btn {
  border: 1px solid var(--color-danger) !important;
  color: var(--color-danger);
  background-color: var(--color-white);
  font-weight: 500;
  border-radius: 6px;
  width: 100%;
}
.delete-btn:hover {
  color: var(--color-white) !important;
  background-color: var(--color-danger) !important;
}
@media (min-width: 600px) {
  .edit-btn,
  .delete-btn {
    flex: 1;
  }
}

</style>