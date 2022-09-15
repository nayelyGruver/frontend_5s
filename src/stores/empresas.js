import { api } from 'src/boot/axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEmpresasStore = defineStore("empresas", () => {
    const empresas = ref ([])
    const obtenerEmpresas = async () => {
        try {
            const { data } = await api.get(`/empresas`)
            empresas.value = [...data]
            console.log("empresas DESDE STORE", empresas.value)
        } catch(error){
            console.log(error)
        }
    }
    return {
        obtenerEmpresas,
        empresas, 
    }
})