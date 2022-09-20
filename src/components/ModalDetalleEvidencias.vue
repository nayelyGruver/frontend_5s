<template>
  <div>
    <q-dialog v-model="abrirModalDetalleEvidencias">
      <q-card class="">
        <q-card-section
          class="bg-primary text-white row items-center q-pb-none"
        >
          <h2 class="">
            Evidencias 5'S - {{ reporte.empresa }} -
            {{ formatearFecha(reporte.fecha) }}
          </h2>
          <q-space />
        </q-card-section>
        <q-card-section>
          <q-form
            @submit.prevent="enviarEvidencia(modelArchivo, model, modelArea)"
          >
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
          </q-form>
        </q-card-section>
        <q-card-section>
          <!-- TODO: FALTA QUE FILTE LAS IMAGENES POR AREA DE OPORTUNIDAD Y POR DEPARTAMENTO -->
          <!-- TODO: PONER UNA LEYENDA DE QUE NO HAY EVIDENCIAS EN ESTA ÁREA PARA LAS QUE NO TIENEN FOTO -->
          <q-tree
            :nodes="buenas"
            node-key="label"
            no-connectors
            v-model:expanded="buenas"
          />
          <div class="row">
            <q-img
              v-for="evidencia in evidencias"
              :key="evidencia.id_evidencia"
              class="q-mx-sm"
              :src="evidencia.path_foto"
              loading="lazy"
              spinner-color="white"
              height="140px"
              style="max-width: 150px"
            />
          </div>

          <q-tree
            :nodes="oportunidad"
            node-key="label"
            no-connectors
            v-model:expanded="oportunidad"
          />
          <div class="row">
            <q-img
              v-for="evidencia in evidencias"
              :key="evidencia.id_evidencia"
              class="q-mx-sm"
              :src="evidencia.path_foto"
              loading="lazy"
              spinner-color="white"
              height="140px"
              style="max-width: 150px"
            />
          </div>
          <q-tree
            :nodes="mantenimiento"
            node-key="label"
            no-connectors
            v-model:expanded="mantenimiento"
          />
          <div class="row">
            <q-img
              v-for="evidencia in evidencias"
              :key="evidencia.id_evidencia"
              class="q-mx-sm"
              :src="evidencia.path_foto"
              loading="lazy"
              spinner-color="white"
              height="140px"
              style="max-width: 150px"
            />
          </div>
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
    const abrirModalDetalleEvidencias = ref(false);

    const useEvidencia = useEvidenciasStore();
    const { guardarImagen, guardarReferenciaImagen } = useEvidencia;
    const { evidencias, evidenciaCargada } = storeToRefs(useEvidencia);

    const abrir = () => {
      console.log("DESDE EL MODAL DETALLE EVIDENCIA");
      model.value = departamentos.value[0];
      abrirModalDetalleEvidencias.value = true;
    };
    const evidencia = ref(null);

    const modelArchivo = ref(null);

    onMounted(() => {});

    const enviarEvidencia = (file, modelDepto, modelAre) => {
      // console.log(modelArchivo);
      // console.log(file);
      var bodyFormData = new FormData();
      bodyFormData.append("image", file);
      guardarImagen(bodyFormData).then(() => {
        console.log(evidenciaCargada);
        // evidencia.value = {
        //   url_imagen: evidenciaCargada.value.url,
        //   id_reporte: reporte.value.id_reporte,
        //   id_departamento: modelDepto.id_departamento,
        //   id_area: modelAre.id_area,
        // };
        guardarReferenciaImagen({
          url_imagen: evidenciaCargada.value.url,
          id_reporte: reporte.value.id_reporte,
          id_departamento: modelDepto.id_departamento,
          id_area: modelAre.id_area,
        });
      });
    };

    const filtrarEvaluacion = (nombre) =>
      evaluacion.value.filter((criterio) => criterio.nombre_s === nombre);

    const finalizarEvaluacion = () => {
      console.log("FINALIZANDO EVALUACION");
      //TODO: CALCULAR PROMEDIO Y GUARDAR
    };

    return {
      abrir,
      abrirModalDetalleEvidencias,
      filtrarEvaluacion,
      departamentos,
      reporte,
      formatearFecha,
      model,
      cumpleModel: ref(null),
      finalizarEvaluacion,
      evidencias,
      enviarEvidencia,
      modelArchivo,
      modelArea: ref({ id_area: 1, nombre: "Area en buenas condiciones" }),

      expanded: ref(["Areas de clasificación", "dashboard"]),

      buenas: [
        {
          label: "Areas en buenas condiciones",
          icon: "done",
        },
      ],
      oportunidad: [
        {
          label: "Areas de oportunidad",
          icon: "close",
        },
      ],
      mantenimiento: [
        {
          label: "Areas para mantenimiento",
          icon: "construction",
        },
      ],
    };
  },
};
</script>

<style >
</style>
