<template>
  <q-layout>
    <q-page-container>
      <div class="q-pa-md">
        <h2>Reportes de Evaluación 5'S</h2>
        <div>
          <q-btn
            icon-right="note_add"
            borderless
            color="primary"
            label="Realizar nueva evaluación"
            @click="crearNuevoReporte"
          />
        </div>
      </div>
      <q-separator color="primary" class="q-my-md" inset />
      <div class="q-pa-md">
        <q-table
          :rows="reportes"
          :columns="columns"
          row-key="id_reporte"
          no-data-label="No se han encontrado reportes."
          :filter="buscar"
        >
          <template v-slot:top-right>
            <q-input
              outlined
              dense
              debounce="300"
              v-model="buscar"
              placeholder="Buscar"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:body-cell-acciones="props">
            <q-td>
              <q-btn
                @click="verDetallesReportes(props.row.id_reporte)"
                flat
                color="dark"
                icon="format_list_bulleted"
              >
                <q-tooltip> Ver Detalles </q-tooltip>
              </q-btn>
              <q-btn
                @click="confirmarEliminarReporte(props.row.id_reporte)"
                flat
                color="negative"
                icon="delete"
              >
                <q-tooltip> Eliminar Reporte </q-tooltip>
              </q-btn>
            </q-td>
          </template>
        </q-table>
        <template>
          <q-dialog v-model="confirm" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-avatar icon="help_outline" text-color="negative" />
                <span class="q-ml-sm"
                  >¿Seguro que deseas eliminar este reporte de evaluación?</span
                >
              </q-card-section>
              <q-card-actions align="right">
                <q-btn flat label="Cancelar" color="primary" v-close-popup />
                <q-btn
                  @click="eliminarReporte(reporte.id_reporte)"
                  flat
                  label="Eliminar"
                  color="negative"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </template>
        <ModalDetallesReporte ref="abrirModalRef"></ModalDetallesReporte>
        <ModalNuevoReporte ref="modalNuevoReporte"> </ModalNuevoReporte>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";

import { formatearFecha } from "../helpers/formatearFecha";
import ModalDetallesReporte from "../components/ModalDetallesReporte.vue";
import ModalNuevoReporte from "../components/ModalNuevoReporte.vue";

import { useReporteStore } from "../stores/reportes";
import { useDepartamentosStore } from "../stores/departamentos";
import { useEvaluacionStore } from "../stores/evaluacion";

export default {
  components: {
    ModalDetallesReporte,
    ModalNuevoReporte,
  },
  setup() {
    const useReporte = useReporteStore();
    const { eliminarReporte, obtenerReportes, obtenerReporteId } = useReporte;
    const { reportes, reporte } = storeToRefs(useReporte);

    const useEvaluacion = useEvaluacionStore();
    const { obtenerEvaluacion } = useEvaluacion;
    const { evaluacion } = storeToRefs(useEvaluacion);

    const useDepartamento = useDepartamentosStore();
    const { obtenerDepartamentos } = useDepartamento;
    const { departamentos } = storeToRefs(useDepartamento);

    const abrirModalRef = ref(null);
    const modalNuevoReporte = ref(null);
    const confirm = ref(false);

    const columns = [
      {
        name: "id_reporte",
        label: "No Reporte",
        align: "left",
        field: "id_reporte",
        sortable: false,
      },
      {
        name: "id_empresa",
        label: "Empresa",
        align: "left",
        field: "empresa",
        sortable: true,
      },
      {
        name: "usuario",
        label: "Auditor",
        align: "left",
        field: "usuario",
        sortable: false,
      },
      {
        name: "fecha",
        label: "Fecha",
        align: "left",
        field: (row) => formatearFecha(row.fecha),
        sortable: true,
      },
      {
        name: "calificacion",
        label: "Calificación Obtenida",
        align: "left",
        field: "calificacion",
        sortable: true,
      },
      {
        name: "acciones",
        label: "Acciones",
        align: "left",
        field: "acciones",
        sortable: true,
      },
    ];

    const verDetallesReportes = (id) => {
      obtenerReporteId(id);
      obtenerDepartamentos(reporte.value.id_empresa).then(() => {
        obtenerEvaluacion(id, departamentos.value[0]?.id_departamento);
        abrirModalRef.value.abrir(true);
        console.log(evaluacion);
      });
    };

    const crearNuevoReporte = () => {
      modalNuevoReporte.value.abrir(true);
    };

    onMounted(() => {
      obtenerReportes();
    });

    const confirmarEliminarReporte = (id) => {
      obtenerReporteId(id);
      confirm.value = true;
    };

    return {
      columns,
      reportes,
      reporte,
      verDetallesReportes,
      abrirModalRef,
      buscar: ref(""),
      confirmarEliminarReporte,
      confirm,
      eliminarReporte,
      modalNuevoReporte,
      crearNuevoReporte,
    };
  },
};
</script>

<style>
</style>
