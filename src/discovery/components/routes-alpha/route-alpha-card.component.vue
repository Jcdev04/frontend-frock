<script>
export default {
  name: "route-alpha-card",

  //objeto ruta que fetchearemos desde la API
  props: ['route', 'companyName']
}
</script>

<template>
  <pb-Card class="route-alpha-card">
    <template #header>
      <div class="image-container">
        <img src="https://picsum.photos/300/360" alt="test-image">
      </div>
    </template>

    <template #content>
      <div class="card-content-inner">
        <div class = "stops-name-container">
          <p>{{ route.stops[0].name }} - {{ route.stops[1].name }}</p>
        </div>

        <div class="company-container">
          <p>{{ companyName }}</p>
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
      </div>
    </template>

  </pb-Card>
</template>

<style scoped>

.route-alpha-card {
  width: 300px;
  height: 360px;

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

.image-container img{
  width: 100%;
  height: auto;
  transform: scale(1.1);
}

.card-content-inner {
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
  gap: 5px;
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