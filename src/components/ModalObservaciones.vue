<template>
  <q-dialog v-model="abrirModalObservaciones">
    <q-card class="">
      <q-card-section class="bg-primary text-white row items-center q-pb-none">
        <h2 class="text-h4">Observaciones</h2>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="guardarObservaciones(modelText)">
          <div class="q-my-md" style="max-width: 300px">
            <label
              >Describe a detalle las observaciones pertinentes a el criterio
              evaluado.</label
            >
          </div>
          <q-input outlined v-model="modelText" label="Observaciones" />
          <q-card-actions align="right">
            <q-btn
              icon-right="close"
              a
              flat
              label="Salir"
              text-color="dark"
              color="gris"
              v-close-popup
            />
            <q-btn
              icon-right="save"
              type="submit"
              label="Guardar"
              color="primary"
              :loading="submitting"
              :disabled="isDisabled"
            >
              <!-- TODO: QUE EL BOTON SE VUELVA A HABILIAR CUANDO SE ABRA OTRA VEZ -->
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
import { useEvaluacionStore } from "../stores/evaluacion.js";

import { ref, reactive, onMounted } from "vue";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const useEmpresa = useEmpresasStore();
    const { obtenerEmpresas } = useEmpresa;
    const { empresas } = storeToRefs(useEmpresa);

    const useEvaluacion = useEvaluacionStore();
    const { agregarObservacionCriterio } = useEvaluacion;
    const { criterioEvaluacion } = storeToRefs(useEvaluacion);

    const abrirModal = ref(false);
    const abrirModalObservaciones = ref(null);

    const isDisabled = ref(false);
    const submitting = ref(false);
    const modelText = ref("");

    const guardarObservaciones = (observaciones) => {
      submitting.value = true;
      isDisabled.value = true;
      criterioEvaluacion.value.observaciones = observaciones;
      agregarObservacionCriterio(criterioEvaluacion).then(() => {
        submitting.value = false;
        //TODO: MENSAJE QUE AVISE QUE YA SE INSERTO LA OBSERVACION CORRECTAMENTE
      });
    };

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
      guardarObservaciones,
      submitting,
      modelText,
      isDisabled,
    };
  },
};
</script>

<style>
</style>
