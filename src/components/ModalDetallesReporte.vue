<template>
  <div>
    <q-dialog v-model="abrirModal" full-width>
      <q-page-container class="bg-white text-dark">
        <div class="q-px-lg">
          <h2 class="text-dark">Detalles Reporte de Evaluación 5'S</h2>
          <p>Calificación: {{ calificacion }}</p>
        </div>
        <q-separator color="primary" class="" inset />
        <div class="q-pa-md">
          <q-table
            v-for="({ nombre }, index) in lista_s"
            v-bind:key="index"
            :columns="columns"
            :rows="filtrarEvaluacion(nombre)"
            hide-bottom
            :rows-per-page-options="[0]"
          >
            <template v-slot:header>
              <q-tr class="table-header">
                <q-th colspan="2">{{ index + 1 }}S.{{ nombre }} </q-th>
                <q-th colspan="1">Puntos</q-th>
                <q-th colspan="1">Puntos Obtenidos</q-th>
                <q-th colspan="1">Observaciones</q-th>
              </q-tr>
            </template>
          </q-table>
        </div>
        <q-card>
          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-page-container>
    </q-dialog>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useEvaluacionStore } from "../stores/evaluacion";
import { useReporteStore } from "../stores/reportes";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const abrirModal = ref(false);

    const useEvaluacion = useEvaluacionStore();
    const { obtenerEvaluacion } = useEvaluacion;
    const { evaluacion } = storeToRefs(useEvaluacion);

    const useReporte = useReporteStore();
    const { obtenerReportes } = useReporte;
    const { reportes } = storeToRefs(useReporte);

    const fecha = ref(0);
    const empresa = ref(0);
    const calificacion = ref(0);
    const departamentos = ref([]);

    onMounted(() => {
      obtenerEvaluacion(3, 21);
    });
    const abrir = () => {
      abrirModal.value = true;
      obtenerReportes();
      reportes.value = reportes.value.find.id_reporte;
      // obtenerReporte(evaluacion.value[0].id_reporte);
      calificacion.value = reportes.value[0].calificacion;
      fecha.value = reportes.value[0].fecha;
      empresa.value = reportes.value[0].id_empresa;
      departamentos.value = [reportes.value.departamentos];
    };

    const filtrarEvaluacion = (nombre) =>
      evaluacion.value.filter((criterio) => criterio.nombre_s === nombre);

    const lista_s = [
      { nombre: "clasificar" },
      { nombre: "ordenar" },
      { nombre: "limpiar" },
      { nombre: "estandarizar" },
      { nombre: "mantener" },
    ];

    const columns = [
      {
        name: "criterio",
        label: "Criterio",
        align: "center",
        field: "criterio",
        sortable: false,
        style:
          "text-transform: uppercase; white-space: unset !important; width: 10%",
      },
      {
        name: "descripcion",
        label: "Descripción",
        align: "left",
        sortable: true,
        field: "descripcion",
        style: "white-space: unset !important; width: 55%",
      },
      {
        name: "puntos",
        label: "Puntos",
        align: "center",
        field: "puntos",
        sortable: false,
        style: "width: 5%",
      },
      {
        name: "puntos_obtenidos",
        label: "Puntos obtenidos",
        align: "center",
        field: "puntos_obtenidos",
        sortable: false,
        style: "width: 5%",
      },
      {
        name: "observaciones",
        label: "Observaciones",
        align: "left",
        field: "observaciones",
        sortable: false,
        style: "white-space: unset !important; width: 25%",
      },
    ];

    return {
      abrir,
      abrirModal,
      obtenerEvaluacion,
      evaluacion,
      columns,
      lista_s,
      filtrarEvaluacion,
      calificacion,
    };
  },
};
</script>

<style scoped>
/* .descripcion-reporte {
  border: 1px solid blue;
  max-width: 50px !important;
} */
</style>