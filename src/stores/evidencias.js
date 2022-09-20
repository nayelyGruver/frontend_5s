import { apiUpload } from 'src/boot/axiosUploads'
import { api } from 'src/boot/axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEvidenciasStore = defineStore("evidencias", () => {
    const cargaEvidencia = ref ([])
    const evidencia = ref([])
    const evidencias = ref([])

    const guardarImagen = async (bodyFormData) => {
      console.log("DESDE EL STORE EVIDENCIAS" , bodyFormData)
        try {
            const {data} = await apiUpload.post(`/image`, bodyFormData)
            cargaEvidencia.value = data
            console.log("EVIDENCIAS DESDE EL STORE", cargaEvidencia.value)
        } catch(error){
            console.log(error)
        }
    }
    //url foto, idreporte, iddepartamento, id area
    const guardarReferenciaImagen = async (evidencia) => {
      console.log("DESDE guardar referencia a imagen" , evidencia)
        try {
            const { data } = await api.post(`/evidencia`, evidencia)
            evidencia.value = data
        } catch(error){
            console.log(error)
        }
    }

    const cargarEvidencias = async (reporte, departamento) => {
      console.log("DESDE cargar Evidencias REPORTE",  reporte)
      console.log("DESDE cargar Evidencias DEPARTAMENTO",  departamento)
      const idReporte = reporte.id_reporte
      const idDepartamento = departamento.id_departamento
        try {
            const { data } = await api.get(`/evidencias/${idReporte}/${idDepartamento}` )
            evidencias.value = [...data]
            console.log(evidencias.value)
        } catch(error){
            console.log(error)
        }
    }
    return {
      guardarReferenciaImagen,
      guardarImagen,
      cargaEvidencia,
      cargarEvidencias,
      evidencias,
      evidencia
    }
})
