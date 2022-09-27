// import { apiUpload } from 'src/boot/axiosUploads'
import { api } from 'src/boot/axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEvidenciasStore = defineStore("evidencias", () => {
    const evidenciaCargada = ref (null)
    const evidencia = ref([])
    const evidencias = ref([])

    const guardarImagen = async (bodyFormData) => {
        try {
            const { data } = await api.post(`/image`, bodyFormData)
            console.log( data )
            evidenciaCargada.value = data
        } catch(error){
            console.log(error)
        }
    }

    const guardarReferenciaImagen = async (evidenciaObj) => {
        try {
            const { data } = await api.post(`/evidencia`, evidenciaObj)
            evidencia.value = data
        } catch(error){
            console.log(error)
        }
    }

    const cargarEvidencias = async (id_reporte, id_departamento) => {
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
