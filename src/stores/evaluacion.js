import { api } from 'src/boot/axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useEvaluacionStore = defineStore("evaluaciones", () => {
    const evaluacion = ref ([])

    const obtenerEvaluacion = async (idReporte, idDepartamento, nombre5s) => {
        console.log('nombre de la s', nombre5s)
        try {
            const { data } = await api.get(`/evaluacion/${idReporte}/${idDepartamento}`)
            console.log(data)

            evaluacion.value = [...data]
            evaluacion.value = evaluacion.value.filter(criterio => criterio.nombre_s == nombre5s)
            // evaluacion.value.forEach(evaluacion => console.log( evaluacion.descripcion ))
        } catch(error){
            console.log(error)
        }
    }
    return {
        obtenerEvaluacion,
        evaluacion
    }
})


// export const useEvaluacionStore = defineStore("evaluaciones", () => {
//     const evaluacion = ref ([])
//     const obtenerEvaluacion = async (idReporte, idDepartamento) => {
//         try {
//             const { data } = await api.get(`/evaluacion/${idReporte}/${idDepartamento}`)
            
//             evaluacion.value = [...data]
//             console.log(data)
//         } catch(error){
//             console.log(error)
//         }
//     }
//     return {
//         obtenerEvaluacion,
//         evaluacion
//     }
// })