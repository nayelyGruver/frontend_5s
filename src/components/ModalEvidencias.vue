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
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="enviarEvidencia(modelArchivo)">
            <div class="q-my-md in">
              <label>Departamento</label>
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

            <div class="q-my-md" style="">
              <label>Evidencia Fotográfica</label>
              <q-file
                color="grey-3"
                outlined
                label-color="primary"
                lazy-rules
                v-model="modelArchivo"
                label="Imagen"
                accept=".jpg, image/*"
              >
                <template v-slot:append>
                  <q-icon name="attachment" color="primary" />
                </template>
              </q-file>
            </div>
            <div class="q-my-md">
              <div class="q-my-md" style="">
                <label>Area de clasificacion</label>
                <q-select
                  filled
                  v-model="model"
                  :options="departamentos"
                  option-label="nombre"
                  label="Area"
                  @update:model-value="
                    obtenerEvaluacion(reporte.id_reporte, model.id_departamento)
                  "
                >
                  <template v-slot:selected>
                    <q-chip
                      color="white"
                      text-color="primary"
                      class="q-ma-none"
                    >
                      {{ model?.nombre }}
                    </q-chip>
                  </template>
                </q-select>
              </div>
            </div>
            <q-card-actions align="left">
              <q-btn
                icon-right="save"
                type="submit"
                label="Guardar imagen"
                color="primary"
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
                label="Terminar evaluación"
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

export default {
  setup() {
    const useReporte = useReporteStore();
    const { reporte } = storeToRefs(useReporte);

    const useDepartamento = useDepartamentosStore();
    const { departamentos } = storeToRefs(useDepartamento);

    const model = ref({});
    const abrirModalEvidencias = ref(false);

    const useEvidencia = useEvidenciasStore();
    const { guardarImagen } = useEvidencia;
    const { cargaEvidencia } = storeToRefs(useEvidencia);

    const abrir = () => {
      console.log("DESDE EL MODAL EVALUACION");
      model.value = departamentos.value[0];
      abrirModalEvidencias.value = true;
    };

    const modelArchivo = ref(null);

    onMounted(() => {});

    const enviarEvidencia = (file) => {
      // console.log(modelArchivo);
      // console.log(file);
      var bodyFormData = new FormData();
      bodyFormData.append("image", file);
      guardarImagen(bodyFormData);
    };

    const filtrarEvaluacion = (nombre) =>
      evaluacion.value.filter((criterio) => criterio.nombre_s === nombre);

    const finalizarEvaluacion = () => {
      console.log("FINALIZANDO EVALUACION");
      //TODO: CALCULAR PROMEDIO Y GUARDAR
    };

    return {
      abrir,
      abrirModalEvidencias,
      filtrarEvaluacion,
      departamentos,
      reporte,
      formatearFecha,
      model,
      cumpleModel: ref(null),
      finalizarEvaluacion,
      enviarEvidencia,
      modelArchivo,
    };
  },
};
</script>

<style >
</style>
