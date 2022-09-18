import { api } from 'src/boot/axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMetricasStore = defineStore("metricas", () => {
    const calificacionMes = ref ([""])
    const calificacionAnio = ref ([""])

    const obtenerCalificacionMes = async () => {
        try {
            const { data } = await api.get(`/metricas/calificacion/mes`)
            calificacionMes.value = [data[0].calificacionMes]
        } catch(error){
            console.log(error)
        }
    }
    const obtenerCalificacionAnio = async () => {
        try {
            const { data } = await api.get(`/metricas/calificacion/anio`)
            calificacionAnio.value = [data[0].calificacionAnio]
        } catch(error){
            console.log(error)
        }
    }

    return {
        obtenerCalificacionMes,
        obtenerCalificacionAnio,
        calificacionMes,
        calificacionAnio
    }
})
