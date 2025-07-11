<script>
import { TransportCompanyService } from '@/transport-company/services/transport-company.service.js'
import RouteAlphaCard from "./route-alpha-card.component.vue";

export default {
  name: "routes-alpha-list",
  components: {
    RouteAlphaCard
  },

  data(){
    return {
      routesWithCompanyNames: []
      //basicamente ahora tienen el dato extra del nombre de la empresa
    }
  },

  props: {
    routes: {
      type: Array,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: null
    }
  },

  watch: {
    routes: {
      immediate: true,
      async handler(newRoutes) {
        if (newRoutes && newRoutes.length > 0) {
          await this.processRoutes(newRoutes);
        } else {
          this.routesWithCompanyNames = [];
        }
      }
    }
  },

  methods: {
    async processRoutes(routes) {
      const transportCompanyService = new TransportCompanyService();
      const companyPromises = routes.map(async (route) => {
        try {
          const company = await transportCompanyService.getCompanyById(route.stops[0].fk_company_id);
          return {
            ...route,
            companyName: company.name
          };
        } catch (err) {
          console.error(`Error al cargar el nombre de la empresa para la ruta ${route.id}: ${err.message}`);
          return {
            ...route,
            companyName: 'Nombre no disponible'
          };
        }
      });
      this.routesWithCompanyNames = await Promise.all(companyPromises);
    }
  }
}
</script>

<template>
  <pb-Toast/>
  <pb-ProgressSpinner v-if="isLoading" />
  <pb-Message v-else-if="error" severity="error" :closable="false">
    {{ error }}
  </pb-Message>

  <template v-else-if="routesWithCompanyNames.length>0">
    <section class="container-rutas">
      <route-alpha-card
          v-for="route in routesWithCompanyNames"
          :key="route.id"
          :route="route"
          :companyName="route.companyName"
      />
    </section>
  </template>
  <template v-else>
    <pb-Message severity="info" :closable="false">
      <template #icon>
        <i class="pi pi-info-circle"></i>
      </template>
      No hay paraderos disponibles
    </pb-Message>
  </template>

</template>

<style scoped>
.container-rutas {
  /**/
  width: 2000px;

  /**/
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  /**/
  gap: 20px;

  /*border: #2d3748 1px solid;*/
}

</style>