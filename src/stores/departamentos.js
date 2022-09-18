import { api } from 'src/boot/axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDepartamentosStore = defineStore("departamentos", () => {
    const departamentos = ref ([])

    const obtenerDepartamentos = async (idEmpresa="") => {
        try {
            const { data } = await api.get(`/departamentos/${idEmpresa}`)
            departamentos.value = [...data]
        } catch(error){
            console.log(error)
        }
    }


    return {
        obtenerDepartamentos,
        departamentos,
    }
})
