<template>
  <div>
    <q-dialog v-model="abrirModalEvaluacion" full-width>
      <q-page-container class="bg-white text-dark">
        <div class="q-px-lg">
          <div class="row items-baseline justify-between">
            <h2 class="text-dark">
              Proceso de Evaluación 5'S - {{ reporte.empresa }} -
              {{ formatearFecha(reporte.fecha) }}
            </h2>
          </div>

          <div class="justify-end">
            <q-select
              filled
              v-model="model"
              :options="departamentos"
              option-label="nombre"
              label="Departamento"
              @update:model-value="
                obtenerEvaluacion(reporte.id_reporte, model.id_departamento)
              "
            >
              <template v-slot:selected>
                <q-chip color="white" text-color="primary" class="q-ma-none">
                  {{ model?.nombre }}
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
            ><template v-slot:body-cell-cumple="props">
              <q-td class="space-around justify-evenly aling-items-center">
                <q-btn
                  @click="puntuarNoCumple(props.row.id_evaluacion, props.class)"
                  icon="close"
                  round
                  label=""
                  color="negative"
                >
                  <q-tooltip> Agregar Observación </q-tooltip>
                </q-btn>
                <q-btn
                  @click="puntuarCumple(props.row.id_evaluacion, props.class)"
                  icon="done"
                  round
                  label=""
                  color="positive"
                />
              </q-td>
            </template>
            <template v-slot:body-cell-acciones="props">
              <q-td class="">
                <q-btn
                  @click="agregarObservaciones(props.row.id_evaluacion)"
                  flat
                  color="dark"
                  icon="sms"
                >
                  <q-tooltip> Agregar Observación </q-tooltip>
                </q-btn>
              </q-td>
            </template>
            <template v-slot:header>
              <q-tr class="table-header">
                <q-th colspan="2">{{ index + 1 }}S.{{ nombre }} </q-th>
                <q-th colspan="1">Cumple</q-th>
                <q-th colspan="1">Observaciones</q-th>
              </q-tr>
            </template>
          </q-table>
        </div>
        <q-card>
          <q-card-actions align="right">
            <q-btn
              flat
              label="SUBIR EVIDENCIAS"
              color="primary"
              @click="subirEvidencias()"
            />
          </q-card-actions>
        </q-card>
      </q-page-container>
      <ModalObservaciones ref="abrirModalObservacionesRef"></ModalObservaciones>
      <ModalEvidencias ref="abrirModalEvidenciasRef"></ModalEvidencias>
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
import ModalObservaciones from "src/components/ModalObservaciones.vue";
import ModalEvidencias from "../components/ModalEvidencias.vue";

export default {
  components: {
    ModalObservaciones,
    ModalEvidencias,
  },
  setup() {
    const useEvaluacion = useEvaluacionStore();
    const {
      obtenerEvaluacion,
      puntuarNoCumpleCriterio,
      obtenerCriterioEvaluacion,
    } = useEvaluacion;
    const { evaluacion } = storeToRefs(useEvaluacion);

    const useReporte = useReporteStore();
    const { obtenerReporteId } = useReporte;
    const { reporte } = storeToRefs(useReporte);
    const abrirModalEvidenciasRef = ref(null);

    const useDepartamento = useDepartamentosStore();

    const { departamentos } = storeToRefs(useDepartamento);
    const model = ref({});
    const abrirModalEvaluacion = ref(false);
    const abrirModalObservacionesRef = ref(null);

    const abrir = () => {
      console.log("DESDE EL MODAL EVALUACION");
      model.value = departamentos.value[0];
      abrirModalEvaluacion.value = true;
    };

    onMounted(() => {});

    const filtrarEvaluacion = (nombre) =>
      evaluacion.value.filter((criterio) => criterio.nombre_s === nombre);

    const agregarObservaciones = (id_evaluacion) => {
      console.log("Agregar Observaciones", id_evaluacion);
      obtenerCriterioEvaluacion(id_evaluacion);
      abrirModalObservacionesRef.value.abrir(true);
    };

    const puntuarCumple = (id_evaluacion) => {
      console.log("Puntuar", id_evaluacion);
    };
    const puntuarNoCumple = (id_evaluacion) => {
      puntuarNoCumpleCriterio({
        id_evaluacion: id_evaluacion,
        puntos: 0,
      });
      console.log("Puntuar No Cumple", id_evaluacion);
    };

    const subirEvidencias = () => {
      console.log("en subir evidencias");
      abrirModalEvidenciasRef.value.abrir(true);
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
        style: "white-space: unset !important; width: 55%",
      },
      {
        name: "cumple",
        label: "Cumple",
        align: "center",
        field: "cumple",
        sortable: true,
      },
      {
        name: "acciones",
        label: "Acciones",
        align: "center",
        field: "acciones",
        sortable: true,
      },
    ];

    return {
      abrir,
      abrirModalEvaluacion,
      obtenerEvaluacion,
      evaluacion,
      columns,
      lista_s,
      filtrarEvaluacion,
      departamentos,
      reporte,
      formatearFecha,
      model,
      cumpleModel: ref(null),
      agregarObservaciones,
      puntuarCumple,
      puntuarNoCumple,
      subirEvidencias,
      abrirModalObservacionesRef,
      abrirModalEvidenciasRef,
    };
  },
};
</script>

<style >
</style>
