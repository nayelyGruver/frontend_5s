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
            <label>Sucursal</label>
            <q-select
              outlined
              :disable="disableSelectSucursal"
              v-model="modelEmpresa"
              :options="empresas"
              option-label="nombre"
              label="Sucursal"
            >
              <template v-slot:selected>
                <q-chip color="white" text-color="primary" class="q-ma-none">
                  {{ modelEmpresa?.nombre }}
                </q-chip>
              </template>
            </q-select>
            <div class="">
              <q-checkbox
                class="text-h5"
                v-model="modelCheck"
                label="Seleccionar otra sucursal"
                @click="habilitarSelectSucursal"
              />
            </div>
          </div>

          <div class="q-py-md" style="max-width: 300px">
            <label>Fecha</label>
            <q-input
              outlined
              v-model="modelFecha"
              mask="date"
              :rules="['modelFecha']"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="modelFecha">
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
import { useDepartamentosStore } from "../stores/departamentos";
import { useAutenticacionStore } from "../stores/autenticaciones";

import { ref, reactive, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import ModalEvaluacion from "../components/ModalEvaluacion.vue";
import { formatearFecha2 } from "../helpers/formatearFecha";

export default {
  components: {
    ModalEvaluacion,
  },
  setup() {
    const useUsuario = useAutenticacionStore();
    const { usuarioAutenticado } = storeToRefs(useUsuario);

    const useEmpresa = useEmpresasStore();
    const { obtenerEmpresas } = useEmpresa;
    const { empresas } = storeToRefs(useEmpresa);

    const useReportes = useReporteStore();
    const { insertarReporte } = useReportes;
    const { reporte } = storeToRefs(useReportes);

    const useEvaluacion = useEvaluacionStore();
    const { obtenerEvaluacion } = useEvaluacion;

    const useDepartamento = useDepartamentosStore();
    const { obtenerDepartamentos } = useDepartamento;
    const { departamentos } = storeToRefs(useDepartamento);

    const abrirModalEvaluacionRef = ref(null);
    const disableSelectSucursal = ref(true);
    const submitting = ref(false);
    const model = ref({ id_departamento: "", nombre: "" });
    const modelCheck = ref(false);
    const modelFecha = ref(formatearFecha2(new Date()));
    const empresaUsuario = ref(
      empresas.value.filter(
        (empresa) =>
          empresa.id_empresa === Number(usuarioAutenticado?.value?.idSucursal)
      )[0]
    );
    const modelEmpresa = ref({
      id_empresa: empresaUsuario?.value?.id_empresa,
      nombre: empresaUsuario?.value?.nombre,
    });
    watch(modelEmpresa, (valorNuevo, viejoValor) => {
      localStorage.setItem(
        "empresaUsuario",
        viejoValor.nombre || valorNuevo.nombre
      );
    });
    let reporteObj = reactive({
      usuario: usuarioAutenticado?.value?.usuarioPermiso,
      empresa: usuarioAutenticado?.value?.nombreSucursal,
      id_empresa: usuarioAutenticado?.value?.idSucursal,
      fecha: modelFecha.value,
    });

    const guardarReporte = () => {
      reporteObj.empresa = modelEmpresa?.value.nombre;
      reporteObj.id_empresa = modelEmpresa?.value.id_empresa;
      reporteObj.fecha = modelFecha?.value;
      submitting.value = true;

      // Inserta el nuevo reporte y carga en el state reporte nuevo e Inserción masiva de evaluación de criterios
      reporte.value = insertarReporte(reporteObj);

      obtenerDepartamentos(reporteObj.id_empresa).then(() => {
        model.value = departamentos.value[0];
      });

      setTimeout(() => {
        obtenerEvaluacion(
          reporte.value.id_reporte,
          model.value.id_departamento
        );
        abrirModalEvaluacionRef.value.abrir(true);
        submitting.value = false;
      }, 2000);
    };
    const habilitarSelectSucursal = () => {
      modelCheck.value
        ? (disableSelectSucursal.value = false)
        : (disableSelectSucursal.value = true);
    };

    const abrirModal = ref(false);

    const abrir = () => (abrirModal.value = true);

    onMounted(() => {
      obtenerEmpresas();
    });

    return {
      abrir,
      abrirModal,
      abrirModalEvaluacionRef,
      modelEmpresa,
      empresas,
      reporteObj,
      usuarioAutenticado,
      guardarReporte,
      submitting,
      disableSelectSucursal,
      habilitarSelectSucursal,
      modelCheck,
      modelFecha,
    };
  },
};
</script>

<style>
</style>
