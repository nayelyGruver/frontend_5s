import { defineStore } from 'pinia'
import { apiUsuarios } from 'src/boot/axiosUsuarios'
import { ref } from 'vue'

export const useUsuarioStore = defineStore("usuarios", () => {

    const usuarioAutenticado = ref({})
    const usuariosActivos = ref([])
    const usuariosBajas = ref([])
    const cargando = ref(true)

    const autenticarUsuario = async () => {
        const token = localStorage.getItem('token')

        if (!token) {
            console.log('No hay token')
            return
        }

        const configuracion = {
            headers: {
              "Content-Type": "application/json",
                  Authorization: `Bearer ${ token }`
            }
        }
        try {
          // const { data } = await apiUsuarios.get('/usuarios/perfil', configuracion)
          // usuarioAutenticado.value = { ...data }

        } catch ( error ) {

          console.log( error.response.msg )
        }

      }

      const obtenerUsuarios = async () => {
        try {
            const { data } = await apiUsuarios.get('/usuarios')
            usuariosActivos.value = data

        } catch ( error ) {

          // console.log(error.response.msg)

        } finally {
            cargando.value = false
        }
      }
      const obtenerUsuariosBajas = async () => {
          try {
            const { data } = await apiUsuarios.get('/usuarios/bajas')
            console.log(data)
            usuariosBajas.value = data

          } catch ( error ) {

            console.log(error)

          } finally {
            cargando.value = false
          }
      }

      return {
        usuarioAutenticado,
        autenticarUsuario,
        usuariosActivos,
        usuariosBajas,
        obtenerUsuarios,
        obtenerUsuariosBajas,
        cargando
      }
})
