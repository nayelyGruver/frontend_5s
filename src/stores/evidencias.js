import { apiUpload } from 'src/boot/axiosUploads'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEvidenciasStore = defineStore("evidencias", () => {
    const cargaEvidencia = ref ([])

    const guardarImagen = async (bodyFormData) => {
      console.log("DESDE EL STORE EVIDENCIAS" , bodyFormData)
        try {
            const { data } = await apiUpload.post(`/image`, bodyFormData)
            cargaEvidencia.value = data
            console.log(cargaEvidencia.value)
        } catch(error){
            console.log(error)
        }
    }
    return {
      guardarImagen,
      cargaEvidencia,
    }
})
