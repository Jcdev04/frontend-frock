<script>
//imports
import StopsHeaderTitle from "@/company-management/components/stops-page-components/stops-header-title.component.vue";
import stopsList from "../components/stops-page-components/stops-list.component.vue";

//rest of the script
export default {
  components: {
    StopsHeaderTitle,
    stopsList,
  }
}
</script>

<template>
  <stops-header-title/>
  <stops-list/>
</template>
