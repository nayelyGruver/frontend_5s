import { api } from 'src/boot/axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEvaluacionStore = defineStore( "evaluaciones", () => {

    const evaluacion = ref ([])
    const criterioEvaluacion = ref(null)


    const obtenerEvaluacion = async (idReporte="", idDepartamento="") => {
        try {
            const { data } = await api.get(`/evaluacion/${idReporte}/${idDepartamento}`)

            evaluacion.value = [...data]
        } catch(error){
            console.log(error)
        }
    }
    const obtenerCriterioEvaluacion = ( id ) => {
      criterioEvaluacion.value = evaluacion.value.find( criterio => criterio.id_evaluacion === id )
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

    const puntuarCumpleCriterio = async (evaluacionCriterio, criterio) => {
      console.log("EVALUACION CRITERIO", evaluacionCriterio)
          try {
              const { data } = await api.put(`/evaluacion/cumple`, evaluacionCriterio)
              return data
              // evaluacion.value = [...data] //<---Reemplazar el valor que habia antes en el array
          } catch(error){
              console.log(error)
          }
    }

    const agregarObservacionCriterio  = async (criterioEvaluacion) => {
      console.log(criterioEvaluacion.value)
          try {
              const { data } = await api.put(`/observaciones`, criterioEvaluacion.value)
              return data
          } catch(error){
              console.log(error)
          }
    }

      return {
          obtenerEvaluacion,
          evaluacion,
          puntuarNoCumpleCriterio,
          agregarObservacionCriterio,
          obtenerCriterioEvaluacion,
          criterioEvaluacion,
          puntuarCumpleCriterio
      }
})
