import { api } from 'src/boot/axios'
import { defineStore }   from 'pinia'

import { ref }  from 'vue'

export const useReporteStore = defineStore("", () => {
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
    return {
        obtenerReportes,
        reportes
    }
})