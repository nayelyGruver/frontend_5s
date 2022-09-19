import { api } from 'src/boot/axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEvaluacionStore = defineStore("evaluaciones", () => {
    const evaluacion = ref ([])
    const obtenerEvaluacion = async (idReporte="", idDepartamento="") => {
        try {
            const { data } = await api.get(`/evaluacion/${idReporte}/${idDepartamento}`)
            evaluacion.value = [...data]
        } catch(error){
            console.log(error)
        }
    }

    const puntuarNoCumpleCriterio = async (evaluacionCriterio) => {
      console.log(evaluacionCriterio)
          try {
              const { data } = await api.put(`/evaluacion`, evaluacionCriterio)

              return data
              // evaluacion.value = [...data] //<---Reemplazar el valor que habia antes en el array
          } catch(error){
              console.log(error)
          }
    }

      return {
          obtenerEvaluacion,
          evaluacion,
          puntuarNoCumpleCriterio
      }
})
