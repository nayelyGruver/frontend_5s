import { defineStore } from 'pinia'
import { apiUsuarios } from 'src/boot/axiosUsuarios'
import { ref } from 'vue'

export const useUsuarioStore = defineStore("usuarios", () => {

    const usuariosActivos = ref([])
    const usuariosBajas = ref([])
    const cargando = ref(true)

    const usuarioAutenticado = ref(null)
    const token = ref(null)
    const expiresIn = ref(null)
  
    const login = async ( usuario ) => {
      try {
  
        const { data } = await apiUsuarios.post('/usuarios/login', usuario)
        console.log( data.token.token )
        token.value = data.token.token
        expiresIn.value = data.token.expiresIn
        usuarioAutenticado.value = data
        sessionStorage.setItem("usuarioAutenticado", data.nombre);
        establecerTiempo()
        // return data
      } catch ( error ) {
        notificacion('negative', error.response.data.msg)
      }
    }
  
    const establecerTiempo = () => {
      setTimeout(() => {
        console.log('se refresco')
        refrescarToken()
      }, expiresIn.value * 1000 - 6000) 
    }
  
    const refrescarToken = async () => {
      try {
        const { data } = await apiUsuarios.get('/usuarios/refrescar')
        token.value = data.token
        expiresIn.value = data.token
        autenticarUsuario()
        // establecerTiempo()
        console.log('desde refrescar token', data.token)
      } catch ( error ) {
        console.log( error )
      }
    }
  
    const cerrarSesion = async () => {
      try {
        await apiUsuarios.get('/usuarios/logout')
      } catch ( error ) {
        console.log( error )
      } finally {
        resetearStore()
      }
    }
  
    const resetearStore = () => {
      usuarioAutenticado.value = null
      token.value = null
      expiresIn.value = null
    }
  
    const autenticarUsuario = async () => {
  
  
      if (!token.value) {
        console.log('No hay token')
        return
      }
  
      const configuracion = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ token.value }`
        }
      }
      try {
        const { data } = await apiUsuarios.get('/usuarios/perfil', configuracion)
        console.log('Desde obtener perfil', data)
        usuarioAutenticado.value = { ...data }
  
      } catch (error) {
  
        console.log(error.response.msg)
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
        login,
        cerrarSesion,
        usuarioAutenticado,
        autenticarUsuario,
        usuariosActivos,
        usuariosBajas,
        obtenerUsuarios,
        obtenerUsuariosBajas,
        cargando
      }
})
