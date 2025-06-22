<script setup>
import { onMounted, ref } from "vue"
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast' // Import explícito
import { RouteService } from '@/network/services/route.service.js'
import RoutesHeaderTitle from "@/network/components/routes-header-title.component.vue"
import RoutesList from "@/network/components/routes-list.component.vue"
import {RouteAppService} from "@/network/services/route-app-service.js";


const toast = useToast()
const routes = ref([])
const isLoading = ref(true)
const error = ref(null)


const loadRoutes = async () => {
  isLoading.value = true
  error.value = null

  try {
    const routeAppService = new RouteAppService();
    routes.value = await routeAppService.loadRoutesByCompany("comp-1")
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