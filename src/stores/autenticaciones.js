import { defineStore } from 'pinia'
import { apiUsuarios } from 'src/boot/axiosUsuarios'
import { ref } from 'vue'
import { notificacion } from 'src/helpers/mensajes'

export const useAutenticacionStore = defineStore("autenticaciones", () => {

  const usuarioAutenticado = ref(null)
  const isLogin = ref(false)

  const iniciarSesion = async ( usuario ) => {
    try {
      usuario.idPortal = 3
      const { data } = await apiUsuarios.post('/usuarios/login', usuario)
      // autenticarUsuario()
      isLogin.value = true
      localStorage.setItem( 'token', data.token )
      
    } catch ( error ) {
      notificacion('negative', error.response.data.msg)
    }
  }

  // reseteamos el store de la autenticacion
  const cerrarSesion = async () => {
    try {
      usuarioAutenticado.value = null
      localStorage.removeItem('token')
      isLogin.value = false

    } catch ( error ) {
      console.log( error )
    }
  }

  const autenticarUsuario = async () => {
    const token = localStorage.getItem('token')

    if (!token) {
      console.log('No hay token')
      return
    }

    const configuracion = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ token }`, 
      }
    }
    try {
      isLogin.value = true

      const { data } = await apiUsuarios.get('/usuarios/perfil', configuracion)
      usuarioAutenticado.value = { ...data }

    } catch (error) {
      console.log(error.response.msg)
    }

  }

  return {
    iniciarSesion,
    cerrarSesion,
    autenticarUsuario,
    usuarioAutenticado,
    isLogin
  }


})
