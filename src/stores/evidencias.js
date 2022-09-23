import { apiUpload } from 'src/boot/axiosUploads'
import { api } from 'src/boot/axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEvidenciasStore = defineStore("evidencias", () => {
    const evidenciaCargada = ref (null)
    const evidencia = ref([])
    const evidencias = ref([])

    const guardarImagen = async (bodyFormData) => {
      console.log("DESDE EL STORE EVIDENCIAS" , bodyFormData)
        try {
            const { data } = await apiUpload.post(`/image`, bodyFormData)
            evidenciaCargada.value = data
            console.log("EVIDENCIAS DESDE EL STORE", evidenciaCargada.value)
        } catch(error){
            console.log(error)
        }
    }
    //url foto, idreporte, iddepartamento, id area
    const guardarReferenciaImagen = async (evidenciaObj) => {
      console.log("DESDE guardar referencia a imagen" , evidenciaObj)
        try {
            const { data } = await api.post(`/evidencia`, evidenciaObj)
            evidencia.value = data
        } catch(error){
            console.log(error)
        }
    }

    const cargarEvidencias = async (id_reporte, id_departamento) => {
      console.log("DESDE cargar Evidencias REPORTE",  id_reporte)
      console.log("DESDE cargar Evidencias DEPARTAMENTO",  id_departamento)

        try {
            const { data } = await api.get(`/evidencias/${id_reporte}/${id_departamento}` )
            evidencias.value = [...data]
            console.log(evidencias.value)
        } catch(error){
            console.log(error)
        }
    }
    return {
      guardarReferenciaImagen,
      guardarImagen,
      evidenciaCargada,
      cargarEvidencias,
      evidencias,
      evidencia
    }
})
