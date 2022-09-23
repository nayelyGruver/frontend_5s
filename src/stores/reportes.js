import { api } from 'src/boot/axios'
import { defineStore }   from 'pinia'
import { ref }  from 'vue'

export const useReporteStore = defineStore("reportes", () => {
    const reportes  = ref ([])
    const reporte = ref(null)
    const calificacionDepartamento = ref({calificacion: 0})
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
            //carga en el state reporte nuevo
            obtenerReporteId(data.id_reporte)
            //Inserción masiva de evaluación de criterios
            insercionCriteriosEvaluacion(data)
            console.log(data.id_reporte)
            return data.id_reporte
        } catch(error){
            console.log(error)
        }
    }

    const insercionCriteriosEvaluacion = async (reporteObj) => {
      try{
          const { data } = await api.post('/criterios', reporteObj)
          console.log("DESDE INSERCION DE CRITERIOS DE EVALUACION", data)
          return data
      } catch(error){
          console.log(error)
      }
    }

    const guardarCalificacionReporte = async (reporteObj) => {
      try{
          const {data} = await api.put('/reporteEvaluacion', reporteObj)
          console.log("DESDE guardarCalificacionReporte---", data[0]?.calificacionMes)
          // reportes.value.find
          reportes.value.find( r => r.id_reporte === reporte.value.id_reporte ).calificacion = data[0]?.calificacionMes
          return data
      } catch(error){
          console.log(error)
      }
    }

    //TODO: TRABAJANDO EN CALIFICACION DEPARTAMENTO
    const obtenerCalificacionDepartamento = async (id_reporte, id_departamento) => {
      try{
          const {data} = await api.get(`/calificacion/${id_reporte}/${id_departamento}`)
          calificacionDepartamento.value = data[0]
          return data
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
        insertarReporte,
        guardarCalificacionReporte,
        obtenerCalificacionDepartamento,
        calificacionDepartamento
    }
})
