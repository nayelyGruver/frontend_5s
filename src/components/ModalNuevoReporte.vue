<template>
  <q-dialog v-model="abrirModal">
    <q-card class="">
      <q-card-section class="bg-primary text-white row items-center q-pb-none">
        <h2 class="text-h4">Nueva Evaluación 5'S</h2>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="guardarReporte">
          <div class="q-my-md" style="max-width: 300px">
            <label>Empresa</label>
            <q-select
              filled
              v-model="modelEmpresa"
              :options="empresas"
              option-label="nombre"
              label="Empresa"
            >
              <template v-slot:selected>
                <q-chip color="white" text-color="primary" class="q-ma-none">
                  {{ modelEmpresa.nombre }}
                </q-chip>
              </template>
            </q-select>
          </div>
          <div class="q-my-md in">
            <label>Fecha</label>
            <div class="q-pa-md" style="max-width: 300px">
              <q-input filled v-model="date" mask="date" :rules="['date']">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="date">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
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
    <ModalEvaluacion ref="abrirModalEvaluacionRef"></ModalEvaluacion>
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
  components: {
    ModalEvaluacion,
  },
  setup() {
    const useEmpresa = useEmpresasStore();
    const { obtenerEmpresas } = useEmpresa;
    const { empresas } = storeToRefs(useEmpresa);

    const useReportes = useReporteStore();
    const { insertarReporte, insercionCriteriosEvaluacion } = useReportes;
    const { reporte } = storeToRefs(useReportes);
    const submitting = ref(false);
    const model = ref({ id_departamento: "", nombre: "" });
    const abrirModalEvaluacionRef = ref(null);

    const useEvaluacion = useEvaluacionStore();
    const { obtenerEvaluacion } = useEvaluacion;
    const { evaluacion } = storeToRefs(useEvaluacion);
    const useDepartamento = useDepartamentosStore();
    const { obtenerDepartamentos } = useDepartamento;
    const { departamentos } = storeToRefs(useDepartamento);

    let reporteObj = reactive({
      usuario: "nperez",
      empresa: "GRUVER",
      id_empresa: 10,
      fecha: "2022/09/15",
    });

    const guardarReporte = () => {
      submitting.value = true;
      //Iserta el nuevo reporte y carga en el state reporte nuevo e Inserción masiva de evaluación de criterios
      reporte.value = insertarReporte(reporteObj);
      console.log("REPORTE NUEVO", reporte);
      obtenerDepartamentos(reporteObj.id_empresa).then(() => {
        model.value = departamentos.value[0];
      });
      console.log("MODEL VALUE", model);
      setTimeout(() => {
        // abrirModal.value = false;
        obtenerEvaluacion(
          reporte.value.id_reporte,
          model.value.id_departamento
        );
        abrirModalEvaluacionRef.value.abrir(true);
        submitting.value = false;
      }, 2000);
      //abrir nuevo modal
      console.log("ANTES DE ABRIR EL MODAL");
    };

    const abrirModal = ref(false);
    const abrir = () => {
      abrirModal.value = true;
    };
    onMounted(() => {
      obtenerEmpresas();
    });
    return {
      abrir,
      abrirModal,
      abrirModalEvaluacionRef,
      modelEmpresa: ref({ id_empresa: 10, nombre: "GRUVER" }),
      date: ref("2022/09/15"),
      empresas,
      reporteObj,
      guardarReporte,
      submitting,
    };
  },
};
</script>

<style>
</style>
