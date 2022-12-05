<template>
  <div>
    <q-dialog v-model="abrirModalDetalleEvidencias">
      <q-card class="">
        <q-card-section
          class="bg-primary text-white row items-center q-py-none"
        >
          <h2 class="">
            Evidencias 5'S - {{ reporte.empresa }} -
            {{ formatearFecha(reporte.fecha) }}
          </h2>
        </q-card-section>
        <q-card-section>
          <q-form
            @submit.prevent="
              enviarEvidencia(modelArchivo, modelDepartamento, modelArea)
            "
          >
            <div class="">
              <q-select
                outlined
                v-model="modelDepartamento"
                :options="departamentos"
                option-label="nombre"
                label="Departamento"
                @update:model-value="
                  cargarEvidencias(
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
          </q-form>
        </q-card-section>
        <q-card-section
          ><q-item>
            <q-item-section avatar>
              <q-avatar>
                <q-icon name="done" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-h4">
                Areas en Buenas Condiciones
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-img
            v-for="evidencia in filtrarEvidencia(1)"
            :key="evidencia.id_evidencia"
            class="q-ma-sm"
            :src="evidencia.path_foto"
            loading="lazy"
            spinner-color="white"
            height="140px"
            style="max-width: 150px"
          />
        </q-card-section>
        <q-card-section>
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <q-icon name="close" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-h4">Areas de Oportunidad</q-item-label>
            </q-item-section>
          </q-item>
          <q-img
            v-for="evidencia in filtrarEvidencia(2)"
            :key="evidencia.id_evidencia"
            class="q-ma-sm"
            :src="evidencia.path_foto"
            loading="lazy"
            spinner-color="white"
            height="140px"
            style="max-width: 150px"
          />
        </q-card-section>
        <q-card-section>
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <q-icon name="construction" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-h4">
                Areas para Mantenimiento
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-img
            v-for="evidencia in filtrarEvidencia(3)"
            :key="evidencia.id_evidencia"
            class="q-ma-sm"
            :src="evidencia.path_foto"
            loading="lazy"
            spinner-color="white"
            height="140px"
            style="max-width: 150px"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            icon-right="close"
            a
            flat
            label="Cerrar"
            text-color="dark"
            color="gris"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { formatearFecha } from "../helpers/formatearFecha";

import { useReporteStore } from "../stores/reportes";
import { useEvidenciasStore } from "../stores/evidencias";
import { useDepartamentosStore } from "../stores/departamentos";

export default {
  setup() {
    const modelDepartamento = ref({});
    const modelArchivo = ref(null);
    const modelArea = ref({ id_area: 1, nombre: "Area en buenas condiciones" });
    const abrirModalDetalleEvidencias = ref(false);

    const useReporte = useReporteStore();
    const { reporte } = storeToRefs(useReporte);

    const useDepartamento = useDepartamentosStore();
    const { departamentos } = storeToRefs(useDepartamento);

    const useEvidencia = useEvidenciasStore();
    const { cargarEvidencias } = useEvidencia;
    const { evidencias } = storeToRefs(useEvidencia);

    const abrir = () => {
      modelDepartamento.value = departamentos.value[0];
      abrirModalDetalleEvidencias.value = true;
    };

    const filtrarEvidencia = (id_area) =>
      evidencias.value.filter((evidencia) => evidencia.id_area === id_area);

    return {
      abrir,
      abrirModalDetalleEvidencias,
      filtrarEvidencia,
      departamentos,
      reporte,
      formatearFecha,
      modelDepartamento,
      evidencias,
      modelArchivo,
      modelArea,
      cargarEvidencias,
      buenas: [{ label: "Areas en buenas condiciones", icon: "done" }],
      oportunidad: [{ label: "Areas de oportunidad", icon: "close" }],
      mantenimiento: [
        { label: "Areas para mantenimiento", icon: "construction" },
      ],
    };
  },
};
</script>

<style >
</style>
