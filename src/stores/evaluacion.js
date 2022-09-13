import { api } from 'src/boot/axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useEvaluacionStore = defineStore("evaluaciones", () => {
    const evaluacion = ref ([])
    const listaCriterios5s = [
        { nombre: "clasificar" },
        { nombre: "ordenar" },
        { nombre: "limpiar" },
        { nombre: "estandarizar" },
        { nombre: "mantener" },
    ]

    const obtenerEvaluacion = async (idReporte, idDepartamento, nombre5s) => {
        console.log('nombre de la s', nombre5s)
        try {
            const { data } = await api.get(`/evaluacion/${idReporte}/${idDepartamento}`)
            console.log(data)

            for (const criterio of listaCriterios5s) {
                const evaluacionFiltrada = data.filter( evaluacion => evaluacion.nombre_s === criterio.nombre )
                console.log(evaluacionFiltrada)
                for ( const filtroEvaluacion of evaluacionFiltrada ){
                    if (filtroEvaluacion.nombre_s === criterio.nombre) {
                        evaluacion.value.push(filtroEvaluacion)
                    }
                }
                
            }
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