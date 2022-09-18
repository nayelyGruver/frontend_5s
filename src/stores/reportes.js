import { api } from 'src/boot/axios'
import { defineStore }   from 'pinia'
import { ref }  from 'vue'

export const useReporteStore = defineStore("reportes", () => {
    const reportes  = ref ([])
    const reporte = ref(null)
    const obtenerReportes = async() => {
        try{
            const { data } = await api.get(`/reportes`)
            reportes.value = [... data]
        }catch(error){
            console.log(error)
        }
    }

    const obtenerReporteId = ( id ) => {
        reporte.value = reportes.value.find( reporte => reporte.id_reporte === id )
    }

    const eliminarReporte = async(id) => {
        try{
            await api.delete(`/reporte/${id}`)
            reportes.value = reportes.value.filter( reporte => reporte.id_reporte !== id )
            console.log("eliminandoReporte ", id)
        }catch(error){
            console.log(error)
        }

    }
    const insertarReporte = async (reporteObj) => {
        try{
            const { data } = await api.post('/reporte', reporteObj)
            reportes.value = [ data, ... reportes.value ]
            console.log("Insertando Reporte", data)
        } catch(error){
            console.log(error)
        }
    }

    return {
        obtenerReportes,
        obtenerReporteId,
        eliminarReporte,
        reportes,
        reporte,
        insertarReporte
    }
})
