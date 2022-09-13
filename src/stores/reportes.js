import { api } from 'src/boot/axios'

import { defineStore, storeToRefs }   from 'pinia'

import { ref }  from 'vue'

import { useDepartamentosStore } from "../stores/departamentos"

const useDepartamento = useDepartamentosStore();
const { obtenerDepartamento } = useDepartamento;
const { departamentos } = storeToRefs(useDepartamento);

export const useReporteStore = defineStore("reportes", () => {
    //propiedades reactivas - se estrae con useToRef
    const reportes  = ref ([])
    //funciones o actions 
    const obtenerReportes = async() => {
        try{
            const { data } = await api.get(`/reportes`)
            console.log(data)
            data.forEach(row => {
                console.log("ROW", row)
            });
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