import { defineStore } from 'pinia'
import { apiUsuarios } from 'src/boot/axiosUsuarios'
import { ref } from 'vue'
import { notificacion } from 'src/helpers/mensajes'

export const useAutenticacionStore = defineStore("autenticaciones", () => {

  const usuarioAutenticado = ref(null)


  const iniciarSesion = async ( usuario ) => {
    try {

      const { data } = await apiUsuarios.post('/usuarios/login', usuario)
      localStorage.setItem( 'token', data.token )
      
    } catch ( error ) {
      // notificacion('negative', error.response.data.msg)
      console.log(error)
    }
  }

  const cerrarSesion = async () => {
    try {
      await apiUsuarios.get('/usuarios/logout')
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
        
      },
      // usuarioAutenticado: usuarioAutenticado.value
    }

    try {
      const { data } = await apiUsuarios.get('/usuarios/perfil', configuracion)
      usuarioAutenticado.value =  { ...data } 

    } catch (error) {

      console.log(error.response.msg)
    }

  }

  return {
    iniciarSesion,
    cerrarSesion,
    autenticarUsuario,
    usuarioAutenticado
  }


})
