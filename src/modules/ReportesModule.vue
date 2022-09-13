<template>
  <q-layout>
    <q-page-container>
      <div class="q-pa-md">
        <h2>Reportes de Evaluación 5'S</h2>
      </div>
      <q-separator color="primary" class="q-my-md" inset />
      <div class="q-pa-md">
        <q-table :rows="reportes" :columns="columns">
          <template v-slot:body-cell-acciones="props">
            <q-td>
              <q-btn
                label="Ver detalles"
                @click="verDetallesReportes(props.row.id_reporte)"
              />
            </q-td>
          </template>
        </q-table>
        <ModalDetallesReporte ref="abrirModalRef"></ModalDetallesReporte>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { useReporteStore } from "../stores/reportes";

import { ref, onMounted } from "vue";

import { storeToRefs } from "pinia";

import { formatearFecha } from "../helpers/formatearFecha";

import ModalDetallesReporte from "../components/ModalDetallesReporte.vue";

export default {
  components: {
    ModalDetallesReporte,
  },
  setup() {
    const useReporte = useReporteStore();
    // se estrae el metodo
    const { obtenerReportes } = useReporte;
    //se extrae el state
    const { reportes } = storeToRefs(useReporte);

    const abrirModalRef = ref(null);

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
        field: "id_empresa",
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

    const buscarReporte = (mes, anio) => {
      obtenerReportes(mes, anio);
      console.log(reportes.value);
    };

    const verDetallesReportes = (id) => {
      console.log(id);
      abrirModalRef.value.abrir(true);
      // abrirModalRef.value.abrirModal = true;
    };

    //  HOOK ciclo de vida del componente
    onMounted(() => {
      obtenerReportes(8, 2022);
    });

    return {
      columns,
      obtenerReportes,
      reportes,
      buscarReporte,
      verDetallesReportes,
      abrirModalRef,
    };
  },
};
</script>

<style>
</style>