import { defineStore } from 'pinia'
import { apiUsuarios } from 'src/boot/axiosUsuarios'
import { ref } from 'vue'
import { notificacion } from 'src/helpers/mensajes'

export const useAutenticacionStore = defineStore("autenticaciones", () => {

  const usuarioAutenticado = ref(null)
  const token = ref(null)
  const expiresIn = ref(null)

  const iniciarSesion = async ( usuario ) => {
    try {

      const { data } = await apiUsuarios.post('/usuarios/login', usuario)
      
      token.value = data.token.token
      expiresIn.value = data.token.expiresIn
      usuarioAutenticado.value = data
      console.log('expiraaaaaaaaaaaaaaaaaaaaaaaaaaaaa',expiresIn.value)
      sessionStorage.setItem("usuarioAutenticado", data.nombre);
      establecerTiempo()
      // return data
    } catch ( error ) {
      // notificacion('negative', error.response.data.msg)
      console.log(error)
    }
  }

  const establecerTiempo = () => {
      setTimeout(() => {
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
        Authorization: `Bearer ${ token.value }`,
        
      },
      // usuarioAutenticado: usuarioAutenticado.value
    }
    console.log(usuarioAutenticado.value)

    try {
      const { data } = await apiUsuarios.get('/usuarios/perfil', configuracion)
      usuarioAutenticado.value =  data 
      console.log(data)
      console.log('objeto lleno', usuarioAutenticado.value)

    } catch (error) {

      console.log(error.response.msg)
    }

  }

  return {
    token,
    expiresIn,
    iniciarSesion,
    cerrarSesion,
    establecerTiempo,
    refrescarToken,
    resetearStore,
    usuarioAutenticado
  }


})
