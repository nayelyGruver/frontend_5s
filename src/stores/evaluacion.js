import { api } from 'src/boot/axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEvaluacionStore = defineStore("evaluaciones", () => {
    const evaluacion = ref ([])
    const obtenerEvaluacion = async (idReporte, idDepartamento) => {
        try {
            const { data } = await api.get(`/evaluacion/${idReporte}/${idDepartamento}`)
            evaluacion.value = [...data]
            console.log(data)
        } catch(error){
            console.log(error)
        }
    }
    
    return {
        obtenerEvaluacion,
        evaluacion, 
    }
})