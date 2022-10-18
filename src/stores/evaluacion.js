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
            evaluacion.value.forEach(criterio => { criterio.estado = criterio.puntos_obtenidos > 0 })
        } catch(error){
            console.log(error)
        }
    }
    const obtenerCriterioEvaluacion = ( id ) => {
      criterioEvaluacion.value = evaluacion.value.find( criterio => criterio.id_evaluacion === id )
    }

    const puntuarCumpleCriterio = async (evaluacionCriterio) => {
          try {
              const { data } = await api.put(`/evaluacion/cumple`, evaluacionCriterio)
              return data
          } catch(error){
              console.log(error)
          }
    }

    const agregarObservacionCriterio  = async (criterioEvaluacion) => {
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
          agregarObservacionCriterio,
          obtenerCriterioEvaluacion,
          criterioEvaluacion,
          puntuarCumpleCriterio
      }
})
