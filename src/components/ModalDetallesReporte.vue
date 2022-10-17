<template>
  <q-dialog v-model="abrirModal" full-width>
    <q-page-container class="bg-white text-dark">
      <div class="q-px-lg">
        <div class="row items-baseline justify-between">
          <h2 class="text-dark">
            Detalles Reporte de Evaluación 5'S - {{ reporte.empresa }} -
            {{ formatearFecha(reporte.fecha) }}
          </h2>
        </div>
        <div class="justify-end">
          <div class="">
            <p>Calificación: {{ calificacionDepartamento.calificacion }}/100</p>
            <q-select
              outlined
              v-model="modelDepartamento"
              :options="departamentos"
              option-label="nombre"
              label="Departamento"
              @update:model-value="
                cambiarDepartamento(
                  reporte.id_reporte,
                  modelDepartamento.id_departamento
                )
              "
            >
              <template v-slot:selected>
                <q-chip color="white" text-color="primary" class="q-ma-none">
                  {{ modelDepartamento?.nombre }}
                </q-chip>
              </template>
            </q-select>
          </div>
        </div>
      </div>
      <q-separator color="primary" class="" inset />
      <div class="q-pa-md">
        <q-table
          id="tabla"
          class="q-my-sm"
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
          <q-btn
            @click="descargarReporte(departamentos)"
            flat
            label="Descargar Reporte"
            color="dark"
            icon="file_download"
          >
            <q-tooltip> Descargar Reporte </q-tooltip>
          </q-btn>
          <q-btn
            flat
            icon-right="visibility"
            label="Ver evidencias"
            color="primary"
            @click="verEvidencias()"
          />
          <q-btn
            flat
            icon-right="close"
            label="Cerrar"
            color="negative"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-page-container>
    <ModalDetalleEvidencia
      ref="abrirModalDetalleEvidenciaRef"
    ></ModalDetalleEvidencia>
  </q-dialog>
</template>

<script>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { formatearFecha } from "../helpers/formatearFecha";

import { useEvaluacionStore } from "../stores/evaluacion";
import { useReporteStore } from "../stores/reportes";

import { generarPDF } from "../helpers/generarPDF";

import { useDepartamentosStore } from "../stores/departamentos";
import { useEvidenciasStore } from "../stores/evidencias";
import ModalDetalleEvidencia from "../components/ModalDetalleEvidencias.vue";

export default {
  components: {
    ModalDetalleEvidencia,
  },
  setup() {
    const abrirModal = ref(false);

    const useEvaluacion = useEvaluacionStore();
    const { obtenerEvaluacion } = useEvaluacion;
    const { evaluacion } = storeToRefs(useEvaluacion);

    const useReporte = useReporteStore();
    const { obtenerCalificacionDepartamento } = useReporte;
    const { reporte, calificacionDepartamento } = storeToRefs(useReporte);

    const useDepartamento = useDepartamentosStore();
    const { departamentos } = storeToRefs(useDepartamento);

    const useEvidencias = useEvidenciasStore();
    const { cargarEvidencias } = useEvidencias;
    const { evidencias } = storeToRefs(useEvidencias);
    const modelDepartamento = ref({});

    const abrirModalDetalleEvidenciaRef = ref(null);

    onMounted(() => {});

    const cambiarDepartamento = (id_reporte, id_departamento) => {
      //TODO:TRABAJANDO AQUI
      obtenerCalificacionDepartamento(id_reporte, id_departamento);
      obtenerEvaluacion(id_reporte, id_departamento);
      cargarEvidencias(id_reporte, id_departamento);
    };

    const descargarReporte = (departamentos) => {
      console.log("DESCARGAR REPORTE");
      generarPDF(
        reporte.value.empresa,
        modelDepartamento.value.nombre,
        formatearFecha(reporte.value.fecha),
        calificacionDepartamento.value.calificacion,
        lista_s,
        evaluacion.value,
        evidencias.value
      );
    };

    const abrir = () => {
      modelDepartamento.value = departamentos.value[0];
      abrirModal.value = true;
      //TODO:TRABAJANDO AQUI
      obtenerCalificacionDepartamento(
        reporte.value.id_reporte,
        departamentos.value[0].id_departamento
      );

      cargarEvidencias(
        reporte.value.id_reporte,
        departamentos.value[0].id_departamento
      );
    };

    const filtrarEvaluacion = (nombre) =>
      evaluacion.value.filter((criterio) => criterio.nombre_s === nombre);

    const verEvidencias = () => {
      console.log(evaluacion.value);
      console.log("ESTAS EN EL METODO VER EVIDENCIAS");
      cargarEvidencias(
        reporte.value.id_reporte,
        departamentos.value[0].id_departamento
      ).then(() => {
        console.log(evidencias.value[0]?.path_foto);
        abrirModalDetalleEvidenciaRef.value.abrir(true);
      });
    };
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
          "text-transform: uppercase; white-space: unset !important; width: 10%;  font-weight: bold",
      },
      {
        name: "descripcion",
        label: "Descripción",
        align: "left",
        sortable: true,
        field: "descripcion",
        style: "white-space: unset !important; width: 60%",
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
        style: "white-space: unset !important; width: 20%",
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
      modelDepartamento,
      verEvidencias,
      abrirModalDetalleEvidenciaRef,
      calificacionDepartamento,
      cambiarDepartamento,
      descargarReporte,
    };
  },
};
</script>

<style >
</style>
