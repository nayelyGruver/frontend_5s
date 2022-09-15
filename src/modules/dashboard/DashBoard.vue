<template>
  <div class="contenedor">
    <h2>Inicio</h2>
    <q-separator color="primary" class="q-my-md" inset />
    <div class="cards-dashboard">
      <q-card class="card">
        <q-card-section class="contenido-card">
          <span class="material-icons text-primary">description</span>
          <h3>Evaluaciones Realizadas</h3>
          <p class="text-primary">{{ reportes.length }}</p>
        </q-card-section>
      </q-card>
      <q-card class="card">
        <q-card-section class="contenido-card">
          <span class="material-icons text-primary">apartment</span>
          <h3>Sucursales Evaluadas</h3>
          <p class="text-primary">{{ empresas.length }}</p>
        </q-card-section>
      </q-card>
      <q-card class="card">
        <q-card-section class="contenido-card">
          <span class="material-icons text-primary">fact_check</span>
          <h3>Calificación Promedio Mes Anterior</h3>
          <p class="text-primary">{{ Math.round(calificacionMes[0]) }}</p>
        </q-card-section>
      </q-card>
      <q-card class="card">
        <q-card-section class="contenido-card">
          <span class="material-icons text-primary">fact_check</span>
          <h3>Calificación Promedio Año Actual</h3>
          <p class="text-primary">{{ Math.round(calificacionAnio[0]) }}</p>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { useReporteStore } from "../../stores/reportes";
import { useEmpresasStore } from "../../stores/empresas";
import { useMetricasStore } from "../../stores/metricas";

import { onMounted } from "vue";
import { storeToRefs } from "pinia";
export default {
  setup() {
    const useReporte = useReporteStore();
    const { obtenerReportes } = useReporte; // se extrae el metodo
    const { reportes } = storeToRefs(useReporte);

    const useEmpresas = useEmpresasStore();
    const { obtenerEmpresas } = useEmpresas;
    const { empresas } = storeToRefs(useEmpresas);

    const useMetricas = useMetricasStore();
    const { obtenerCalificacionMes, obtenerCalificacionAnio } = useMetricas;
    const { calificacionMes, calificacionAnio } = storeToRefs(useMetricas);

    onMounted(() => {
      obtenerReportes();
      obtenerEmpresas();
      obtenerCalificacionMes();
      obtenerCalificacionAnio();
    });

    return {
      obtenerReportes,
      reportes,
      empresas,
      calificacionMes,
      calificacionAnio,
    };
  },
};
</script>

<style scoped>
.link-tablero {
  text-decoration: none;
  color: black;
  cursor: pointer;
  user-select: none;
}
</style>