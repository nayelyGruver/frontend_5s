<template>
  <div>
    <q-dialog v-model="abrirModal" full-width>
      <q-page-container class="bg-white text-dark">
        <div class="q-px-lg">
          <div class="row items-baseline justify-between">
            <h2 class="text-dark">
              Detalles Reporte de Evaluación 5'S - {{ reporte.empresa }} -
              {{ formatearFecha(reporte.fecha) }}
            </h2>
            <p>Calificación: {{ reporte.calificacion }}/100</p>
          </div>
          <div class="justify-end">
            <q-select
              filled
              v-model="model"
              :options="departamentos"
              option-label="nombre"
              label="Departamento"
            >
              <template v-slot:selected>
                <q-chip color="white" text-color="primary" class="q-ma-none">
                  {{ model.nombre }}
                </q-chip>
              </template>
            </q-select>
          </div>
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
import { storeToRefs } from "pinia";
import { formatearFecha } from "../helpers/formatearFecha";

import { useEvaluacionStore } from "../stores/evaluacion";
import { useReporteStore } from "../stores/reportes";
import { useDepartamentosStore } from "../stores/departamentos";

export default {
  setup() {
    const abrirModal = ref(false);

    const useEvaluacion = useEvaluacionStore();
    const { obtenerEvaluacion } = useEvaluacion;
    const { evaluacion } = storeToRefs(useEvaluacion);

    const useReporte = useReporteStore();
    const { reporte } = storeToRefs(useReporte);

    const useDepartamento = useDepartamentosStore();
    const { departamentos } = storeToRefs(useDepartamento);

    const model = ref([]);

    onMounted(() => {});

    const abrir = () => {
      //TODO:
      obtenerEvaluacion(
        reporte.value.id_reporte,
        //TODO:
        departamentos.value[0].id_departamento //<------------NO CARGA LA PRIMERA VEZ
      );
      // model.value = departamentos.value[0];
      abrirModal.value = true;
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
      departamentos,
      reporte,
      formatearFecha,
      model: ref({}),
      watch: {
        model(nuevoValor, viejoValor) {
          console.log("Nuevo valor", nuevoValor);
          console.log("Viejo valor", viejoValor);
          console.log(nuevoValor.id_departamento);
          obtenerEvaluacion(
            reporte.value.id_reporte,
            nuevoValor.id_departamento
          );
        },
      },
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