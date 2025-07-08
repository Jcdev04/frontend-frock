<script setup>
import { onMounted, ref } from "vue"
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast' // Import explícito
import RoutesHeaderTitle from "@/network/components/routes-header-title.component.vue"
import RoutesList from "@/network/components/routes-list.component.vue"
import {RouteService} from "@/network/services/route.service.js";


const toast = useToast()
const routes = ref([])
const isLoading = ref(true)
const error = ref(null)


const loadRoutes = async () => {
  isLoading.value = true
  error.value = null

  try {
    const json = JSON.parse(localStorage.getItem('user'));
    const routeAppService = new RouteService();
    routes.value = await routeAppService.loadRoutesByCompany(json.companyId);
  } catch (err) {
    console.error("Error capturado:", err) // Debug 7
    error.value = `Error al cargar rutas: ${err.message}`
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.value,
      life: 3000
    })
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadRoutes()
})
</script>

<template>
  <Toast />
  <routes-header-title @created="loadRoutes"/>
  <routes-list
      :routes="routes"
      :isLoading="isLoading"
      :error="error"
      @updated="loadRoutes"
      @deleted="loadRoutes"
  />
</template>