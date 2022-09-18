import { api } from 'src/boot/axios'
import { defineStore }   from 'pinia'
import { ref }  from 'vue'

export const useReporteStore = defineStore("reportes", () => {
    //propiedades reactivas - se estrae con useToRef
    const reportes  = ref ([])
    const reporte = ref(null)
    //funciones o actions
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
        console.log("eliminandoReporte ", id)
        try{
            await api.delete(`/reporte/${id}`)
            reportes.value = reportes.value.filter( reporte => reporte.id_reporte !== id )
        }catch(error){
            console.log(error)
        }

    }
    const insertarReporte = async (reporteObj) => {
        console.log(reporteObj)
        try{
            const { data } = await api.post('/reporte', reporteObj)
            reportes.value = [ data, ... reportes.value ]
        } catch(error){
            console.log(error)
        }
    }



    const obtenerIdReporteNuevo = async () => {
        try{
            const { data } = await api.get('/nuevo/reporte')
            const  id = data[0].id_reporte
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
