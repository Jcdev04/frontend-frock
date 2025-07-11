<script>

import DetailsRouteAlphaPopupComponent from "@/discovery/components/routes-alpha/details-route-alpha-popup.component.vue";


export default {
  name: "route-alpha-card",

  components: {
    DetailsRouteAlphaPopupComponent
  },

  //objeto ruta que fetchearemos desde la API
  props: ['route', 'companyName']

}
</script>

<template>
  <pb-Card class="route-alpha-card">
    <template #header>
      <div class="image-container">
        <pb-ImageCompare class="shadow-lg rounded-2xl">
          <template #left>
            <img :src="route.stops[0]?.image_url || 'https://picsum.photos/300/360'" alt="Punto de partida" class="compare-image" />
          </template>
          <template #right>
            <img :src="route.stops[1]?.image_url || 'https://picsum.photos/300/361'" alt="Punto de llegada" class="compare-image" />
          </template>
        </pb-ImageCompare>
      </div>
    </template>

    <template #content>
      <div class="card-content-inner">
        <div class = "stops-name-container">
          <p>{{ route.stops[0].name }} <-> {{ route.stops[1].name }}</p>
        </div>

        <div class="company-container">
          <p><strong>Empresa:</strong> {{ companyName }}</p>
        </div>

        <div class="route-details-container">
          <div class="duration-container">
            <div class="icon-label-row">
              <i class="pi pi-clock" style="font-size: 1rem"></i>
              <span class="label">Duración</span>
            </div>
            <p>{{ route.duration }} min</p>
          </div>

          <div class="fee-container">
            <div class="icon-label-row">
              <i class="pi pi-money-bill" style="font-size: 1rem"></i>
              <span class="label">Tarifa</span>
            </div>
            <p>S/{{route.price}}</p>
          </div>
        </div>
        <DetailsRouteAlphaPopupComponent :route="route"/>

      </div>

    </template>

    <template #footer>
    </template>

  </pb-Card>
</template>

<style scoped>

.route-alpha-card {
  width: 400px;
  height: 410px;

  display: flex;
  flex-direction: column;

  border: #CCCCFF 1px solid;

  overflow: hidden;

  filter: drop-shadow(1px 4px 1px rgba(0, 0, 0, 0.1));

  /*Reajustamos para un valor mas fiel al figma*/
  --p-card-body-padding: 0px;
  --p-card-body-gap: 0px;
}

.image-container {
  width: 100%;
  height: 220px;
  object-fit: cover;
  overflow: hidden;

}

/* Se elimina el estilo anterior para la imagen */

.image-container :deep(.p-image-compare) {
  height: 100%;
}

.image-container :deep(.compare-image) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content-inner {
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
  gap: 10px;
}

.stops-name-container{
  color: var(--color-primary);
  font-weight: bold;
  font-size: 17px;
}

.company-container {
  color: #484848;
  font-size: 16px;

}

.route-details-container {
  display: flex;
  justify-content: center;
  align-items: center;

  color: #484848;
  font-size: 14px;
}

.route-details-container p {
  font-weight: bold;
}

.route-details-container i{
  font-weight: bold;
}

.duration-container,
.fee-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  width: 100%;
}

.icon-label-row {
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: center;
  margin-bottom: 4px;
}

</style>