import { api } from 'src/boot/axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAreasStore = defineStore("areas", () => {
    const areas = ref ([])

    const obtenerAreas = async () => {
        try {
            const { data } = await api.get(`/areas`)
            areas.value = [...data]
        } catch(error){
            console.log(error)
        }
    }
    return {
        obtenerAreas,
        areas,
    }
})
