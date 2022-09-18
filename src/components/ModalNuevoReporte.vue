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
            />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { useEmpresasStore } from "../stores/empresas.js";
import { useReporteStore } from "../stores/reportes.js";
import { ref, reactive, onMounted } from "vue";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const useEmpresa = useEmpresasStore();
    const { obtenerEmpresas } = useEmpresa;
    const { empresas } = storeToRefs(useEmpresa);

    const useReportes = useReporteStore();
    const { insertarReporte } = useReportes;

    let reporteObj = reactive({
      usuario: "nperez",
      empresa: "GRUVER",
      id_empresa: 10,
      fecha: "2022/09/15",
    });

    const guardarReporte = () => {
      insertarReporte(reporteObj);
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
      modelEmpresa: ref({ id_empresa: 10, nombre: "GRUVER" }),
      date: ref("2022/09/15"),
      empresas,
      reporteObj,
      guardarReporte,
    };
  },
};
</script>

<style>
</style>
