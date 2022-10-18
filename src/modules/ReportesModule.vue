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
          class="q-my-md"
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
                @click="abrirVistaEvaluacion(props.row.id_reporte)"
                flat
                color="primary"
                icon="edit"
              >
                <q-tooltip> Modificar Reporte </q-tooltip>
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
          <q-dialog v-model="modelEliminar" persistent>
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
        <ModalEvaluacion ref="abrirModalEvaluacionRef"></ModalEvaluacion>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { storeToRefs } from "pinia";

import { formatearFecha } from "../helpers/formatearFecha";
import ModalDetallesReporte from "../components/ModalDetallesReporte.vue";
import ModalNuevoReporte from "../components/ModalNuevoReporte.vue";

import ModalEvaluacion from "../components/ModalEvaluacion.vue";

import { useReporteStore } from "../stores/reportes";
import { useDepartamentosStore } from "../stores/departamentos";
import { useEvaluacionStore } from "../stores/evaluacion";

export default {
  components: {
    ModalDetallesReporte,
    ModalNuevoReporte,
    ModalEvaluacion,
  },

  setup() {

    const useReporte = useReporteStore();
    const { eliminarReporte, obtenerReporteId } = useReporte;
    const { reportes, reporte } = storeToRefs(useReporte);

    const useEvaluacion = useEvaluacionStore();
    const { obtenerEvaluacion } = useEvaluacion;
    const { evaluacion } = storeToRefs(useEvaluacion);

    const useDepartamento = useDepartamentosStore();
    const { obtenerDepartamentos } = useDepartamento;
    const { departamentos } = storeToRefs(useDepartamento);

    const abrirModalRef = ref(null);
    const modalNuevoReporte = ref(null);
    const abrirModalEvaluacionRef = ref(null);
    const modelEliminar = ref(false);

    const verDetallesReportes = (id) => {
      obtenerReporteId(id);
      obtenerDepartamentos(reporte.value.id_empresa).then(() => {
        obtenerEvaluacion(id, departamentos.value[0]?.id_departamento);
        abrirModalRef.value.abrir(true);
      });
    };

    const crearNuevoReporte = () => {
      modalNuevoReporte.value.abrir(true);
    };

    const confirmarEliminarReporte = (id) => {
      obtenerReporteId(id);
      modelEliminar.value = true;
    };

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
        field: (row) =>
          row?.calificacion ? row.calificacion : "No calificado",
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

    const abrirVistaEvaluacion = (id_reporte) => {
      obtenerReporteId(id_reporte)
      console.log(evaluacion)
      obtenerDepartamentos(reporte.value.id_empresa).then(() => {
        obtenerEvaluacion(id_reporte, departamentos.value[0]?.id_departamento);
        abrirModalEvaluacionRef.value.abrir(true);
      });
    }

    return {
      abrirVistaEvaluacion,
      columns,
      reportes,
      reporte,
      verDetallesReportes,
      abrirModalRef,
      buscar: ref(""),
      confirmarEliminarReporte,
      modelEliminar,
      eliminarReporte,
      modalNuevoReporte,
      crearNuevoReporte,
      abrirModalEvaluacionRef,
    };
  },
};
</script>

<style>
</style>
