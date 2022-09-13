<template>
  <div>
    <q-dialog v-model="abrirModal" full-width>
      <q-page-container class="bg-white text-dark">
        <div class="q-pa-md">
          <h2 class="text-dark">Detalles Reporte de Evaluación 5'S</h2>
        </div>

        <q-separator color="primary" class="" inset />
        <div class="q-pa-md">
          <q-table
            v-for="({ nombre }, index) in lista_s"
            v-bind:key="index"
            :columns="columns"
            hide-bottom
            :rows-per-page-options="[0]"
          >
            <template v-slot:header="">
              <q-tr>
                <q-th colspan="2">{{ index + 1 }}S.{{ nombre }} </q-th>
                <q-th colspan="1">Puntos</q-th>
                <q-th colspan="1">Puntos Obtenidos</q-th>
                <q-th colspan="1">Observaciones</q-th>
              </q-tr>
            </template>
            <div :v-for="row in evaluacion">
              <q-tr> {{ row }} </q-tr>
            </div>
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
import { storeToRefs } from "pinia";

//import myJson from "./data.json";

//console.log(JSON.parse(myJson));

export default {
  setup() {
    const abrirModal = ref(false);

    const useEvaluacion = useEvaluacionStore();
    const { obtenerEvaluacion } = useEvaluacion;
    const { evaluacion } = storeToRefs(useEvaluacion);

    // const arrayClasificar = JSON.parse(json_data);
    // console.log(arrayClasificar);

    onMounted(() => {
      obtenerEvaluacion(3, 21);
    });

    const lista_s = [
      { nombre: "clasificar" },
      { nombre: "ordenar" },
      { nombre: "limpiar" },
      { nombre: "estadarizar" },
      { nombre: "mantener" },
    ];

    const columns = [
      {
        name: "criterio",
        label: "Criterio",
        align: "center",
        field: "criterio",
        sortable: false,
        style: "white-space: unset !important",
      },
      {
        name: "descripcion",
        label: "Descripción",
        align: "left",
        sortable: true,
        field: "descripcion",
        style: "white-space: unset !important",
      },
      {
        name: "puntos",
        label: "Puntos",
        align: "center",
        field: "puntos",
        sortable: false,
        style: "white-space: unset !important",
      },
      {
        name: "puntos_obtenidos",
        label: "Puntos obtenidos",
        align: "center",
        field: "puntos_obtenidos",
        sortable: false,
        style: "white-space: unset !important",
      },
      {
        name: "observaciones",
        label: "Observaciones",
        align: "left",
        field: "observaciones",
        sortable: false,
        style: "white-space: unset !important",
      },
    ];

    const clasificar = [
      {
        criterio: "area de trabajo",
        descripcion:
          "Los elementos/objetos que se encuentran sobre mi escritorio, mesa de trabajo y en\r\nel area de trabajo, son los que necesito para trabajar. (Se debe descartar los\r\nelementos que no se utilicen, documentos, equipo obsoleto o dañado, etc.)",
        puntos: 5,
        puntos_obtenidos: 5,
        observaciones: "OK",
      },
      {
        criterio: "cajones",
        descripcion:
          "En mis cajones solo hay objetos, materiales o elementos que necesito para realizar\r\nmi trabajo.",
        puntos: 5,
        puntos_obtenidos: 5,
        observaciones: "OK",
      },
      {
        criterio: "objetos personales",
        descripcion:
          "Mis objetos personales (bolsos, sueteres, etc) están guardados en un área\r\ndeterminada o cajon, donde no obstruya o quite espacio a mi área de trabajo.",
        puntos: 5,
        puntos_obtenidos: 5,
        observaciones: "OK",
      },
    ];

    return {
      abrirModal,
      obtenerEvaluacion,
      evaluacion,
      columns,
      lista_s,
      clasificar,
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