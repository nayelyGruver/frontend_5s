<template>
  <q-dialog v-model="abrirModalObservaciones">
    <q-card class="">
      <q-card-section class="bg-primary text-white row items-center q-pb-none">
        <h2 class="text-h4">Observaciones de evaluación 5'S</h2>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="guardarObservaciones">
          <div class="q-my-md" style="max-width: 300px">
            <label>Describe a detalle las observaciones pertinentes</label>
          </div>
          <q-input outlined v-model="text" label="Outlined" />
          <q-card-actions align="right">
            <q-btn
              icon-right="close"
              a
              flat
              label="Cancelar"
              text-color="dark"
              color="gris"
              v-close-popup
            />
            <q-btn
              icon-right="arrow_forward"
              type="submit"
              label="Iniciar Evaluación"
              color="primary"
              :loading="submitting"
            >
              <template v-slot:loading>
                <q-spinner-facebook />
              </template>
            </q-btn>
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { useEmpresasStore } from "../stores/empresas.js";
import { useReporteStore } from "../stores/reportes.js";
import { useEvaluacionStore } from "../stores/evaluacion.js";

import { ref, reactive, onMounted } from "vue";
import { storeToRefs } from "pinia";
import ModalEvaluacion from "../components/ModalEvaluacion.vue";
import { useDepartamentosStore } from "../stores/departamentos";

export default {
  setup() {
    const useEmpresa = useEmpresasStore();
    const { obtenerEmpresas } = useEmpresa;
    const { empresas } = storeToRefs(useEmpresa);

    const useReportes = useReporteStore();
    const { insertarReporte, insercionCriteriosEvaluacion } = useReportes;
    const { reporte } = storeToRefs(useReportes);
    const submitting = ref(false);
    const model = ref({ id_departamento: "", nombre: "" });
    const abrirModalObservaciones = ref(null);

    const useDepartamento = useDepartamentosStore();
    const { obtenerDepartamentos } = useDepartamento;
    const { departamentos } = storeToRefs(useDepartamento);

    const guardarObservaciones = () => {};

    const abrirModal = ref(false);
    const abrir = () => {
      abrirModalObservaciones.value = true;
    };
    onMounted(() => {
      obtenerEmpresas();
    });
    return {
      abrir,
      abrirModal,
      abrirModalObservaciones,
      empresas,
      reporteObj,
      guardarObservaciones,
      submitting,
    };
  },
};
</script>

<style>
</style>
