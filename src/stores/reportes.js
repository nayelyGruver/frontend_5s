import { api } from 'src/boot/axios'

import { defineStore }   from 'pinia'

import { ref }  from 'vue'

export const useReporteStore = defineStore("reportes", () => {
    //propiedades reactivas - se estrae con useToRef
    const reportes  = ref ([])
    //funciones o actions 
    const obtenerReportes = async (mes, anio) => {
        try{
            const { data } = await api.get(`/reportes/${mes}/${anio}`)
            reportes.value = [... data]
            console.log(data)
        }catch(error){
            console.log(error)
        }
    }

    const obtenerReporte = async (id) => {
        console.log(id)
        try{
            const { data } = await api.get(`/reporte/${id}`)
            reportes.value = [... data]
            console.log(data)
        }catch(error){
            console.log(error)
        }
    }
    return {
        obtenerReportes,
        obtenerReporte,
        reportes
    }
})