<template>
  <div>
    <q-dialog v-model="abrirModalEvidencias">
      <q-card class="">
        <q-card-section
          class="bg-primary text-white row items-center q-pb-none"
        >
          <h2 class="">
            Captura de Evidencias 5'S - {{ reporte.empresa }} -
            {{ formatearFecha(reporte.fecha) }}
          </h2>
          <q-space />
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="enviarEvidencia(modelArchivo)">
            <div class="q-my-md in">
              <label>Departamento</label>
              <q-select
                outlined
                v-model="modelDepartamento"
                :options="departamentos"
                option-label="nombre"
                label="Departamento"
              >
                <template v-slot:selected>
                  <q-chip color="white" text-color="primary" class="q-ma-none">
                    {{ modelDepartamento?.nombre }}
                  </q-chip>
                </template>
              </q-select>
            </div>

            <div class="q-my-md" style="">
              <label>Evidencia Fotográfica</label>
              <q-file
                color="grey-3"
                outlined
                label-color="primary"
                lazy-rules
                v-model="modelArchivo"
                label="Selecciona una imagen"
                accept=".jpg, image/*"
              >
                <template v-slot:append>
                  <q-icon name="attachment" color="primary" />
                </template>
              </q-file>
            </div>
            <div class="q-my-md">
              <div class="q-my-md" style="">
                <label>Área de Clasificación</label>
                <q-select
                  outlined
                  v-model="modelArea"
                  :options="areas"
                  option-label="nombre"
                  label="Area"
                >
                  <template v-slot:selected>
                    <q-chip
                      color="white"
                      text-color="primary"
                      class="q-ma-none"
                    >
                      {{ modelArea?.nombre }}
                    </q-chip>
                  </template>
                </q-select>
              </div>
            </div>
            <div class="q-pa-md q-gutter-sm row justify-start">
              <q-img
                v-if="evidenciaCargada"
                :src="evidenciaCargada?.url"
                loading="lazy"
                spinner-color="white"
                height="140px"
                style="max-width: 150px"
              />
            </div>
            <q-card-actions align="left">
              <q-btn
                v-if="
                  modelArchivo != null &&
                  modelArea != null &&
                  modelDepartamento != null
                "
                icon-right="save"
                type="submit"
                label="Guardar imagen"
                color="primary"
                :loading="submitting"
              >
                <template v-slot:loading>
                  <q-spinner-facebook />
                </template>
              </q-btn>
            </q-card-actions>

            <q-separator color="" class="" inset />
            <q-card-actions align="right">
              <q-btn
                flat
                label="Terminar captura de evidencias"
                color="primary"
                v-close-popup
                @click="finalizarEvaluacion()"
              />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { formatearFecha } from "../helpers/formatearFecha";

import { useReporteStore } from "../stores/reportes";
import { useEvidenciasStore } from "../stores/evidencias";
import { useDepartamentosStore } from "../stores/departamentos";
import { useAreasStore } from "../stores/areas";

export default {
  setup() {
    const useReporte = useReporteStore();
    const { reporte } = storeToRefs(useReporte);

    const useDepartamento = useDepartamentosStore();
    const { departamentos } = storeToRefs(useDepartamento);

    const useEvidencia = useEvidenciasStore();
    const { guardarImagen, guardarReferenciaImagen } = useEvidencia;
    const { evidenciaCargada } = storeToRefs(useEvidencia);

    const useAreas = useAreasStore();
    const { obtenerAreas } = useAreas;
    const { areas } = storeToRefs(useAreas);

    const modelArchivo = ref(null);
    const modelDepartamento = ref(departamentos.value[0]);
    const modelArea = ref({ id_area: 1, nombre: "AREA EN BUENAS CONDICIONES" });
    const abrirModalEvidencias = ref(false);
    const submitting = ref(false);

    const abrir = () => {
      console.log("DESDE EL MODAL EVIDENCIAS");
      abrirModalEvidencias.value = true;
    };

    onMounted(() => {
      obtenerAreas();
    });

    const enviarEvidencia = (file) => {
      submitting.value = true;
      const bodyFormData = new FormData();
      bodyFormData.append("image", file);
      guardarImagen(bodyFormData).then(() => {
        console.log(evidenciaCargada.value?.url);
        const evidencia = {
          url_imagen: evidenciaCargada.value?.url,
          id_reporte: reporte.value.id_reporte,
          id_departamento: modelDepartamento.value.id_departamento,
          id_area: modelArea.value.id_area,
        };
        guardarReferenciaImagen(evidencia);
      });
      setTimeout(() => {
        modelArchivo.value = null;
        evidenciaCargada.value = null;
        submitting.value = false;
      }, 3000);
    };

    const finalizarEvaluacion = () => {
      console.log("FINALIZANDO EVALUACION");
      //TODO: CALCULAR PROMEDIO Y GUARDAR
    };

    return {
      abrir,
      formatearFecha,
      submitting,
      abrirModalEvidencias,

      finalizarEvaluacion,
      evidenciaCargada,
      enviarEvidencia,

      departamentos,
      reporte,
      areas,

      modelDepartamento,
      modelArchivo,
      modelArea,
    };
  },
};
</script>

<style >
</style>
