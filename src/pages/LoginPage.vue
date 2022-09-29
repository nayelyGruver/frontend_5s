<template>
  <div class="contenedor-login">
    <h1>Portal de Usuarios</h1>
    <form
      class="bg-white contenedor formulario-login"
      @submit.prevent.stop="iniciarSesion"
    >
      <div class="q-pa-xl">
        <div class="contenedor-logo-gruver">
          <q-img
            src="../img/logoGruver.png"
            spinner-color="white"
            class="q-mb-xl imagen-gruver"
          />
        </div>
        <div class="q-mb-md">
          <q-input
            ref="usuarioRef"
            v-model="usuario"
            label="Ingresa el nombre de usuario"
            :dense="dense"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Debes ingresar un nombre de usuario',
            ]"
          >
            <template v-slot:append>
              <q-icon name="person" />
            </template>
          </q-input>
        </div>
        <div class="q-mb-md">
          <q-input
            ref="contrasenaRef"
            v-model="contrasena"
            filled
            :type="isPassword ? 'password' : 'text'"
            label="Ingresa la contraseña"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Debes ingresar una contraseña',
            ]"
          >
            <template v-slot:append>
              <q-icon
                :name="isPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPassword = !isPassword"
              />
            </template>
          </q-input>
        </div>
        <div class="btn-login">
          <q-btn color="primary" type="submit" label="Iniciar Sesión" />
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { useUsuarioStore } from "../stores/usuarios";
import { apiUsuarios } from "src/boot/axiosUsuarios";
import { ref } from "vue";
import { useQuasar } from "quasar";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

export default {
  setup() {
    const useUsuario = useUsuarioStore();
    // destructuración de las acciones
    const { autenticarUsuario } = useUsuario;
    // destructuración de propiedades reactivas y computadas
    const { usuarioAutenticado } = storeToRefs(useUsuario);

    const usuario = ref("");
    const contrasena = ref("");
    const usuarioRef = ref("");
    const contrasenaRef = ref("");
    const isPassword = ref(true);
    const dense = ref(false);

    const $q = useQuasar();
    const router = useRouter();

    //metodos
    const mostrarNotificacion = (mensaje) => {
      $q.notify({
        message: mensaje,
        icon: "error",
        color: "red",
      });
    };
    const iniciarSesion = async () => {
      usuarioRef.value.validate();
      contrasenaRef.value.validate();

      try {
        // Si esta vacio el formulario
        if (!usuarioRef.value.validate() || !contrasenaRef.value.validate()) {
          return;
        }

        const { data } = await apiUsuarios.post("/usuarios/login", {
          usuario: usuario.value,
          contrasena: contrasena.value,
        });
        console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", data);
        usuarioAutenticado.value = data;
        autenticarUsuario();
        router.push("/principal");
      } catch (error) {
        mostrarNotificacion(error.response.data.msg);
      }
    };

    const getFechaActual = () => {
      const fechaActual = new Date();
      return fechaActual.getFullYear();
    };

    return {
      usuario,
      contrasena,
      usuarioRef,
      contrasenaRef,
      isPassword,
      dense,
      iniciarSesion,
      getFechaActual,
    };
  },
};
</script>

<style scoped>
h1 {
  margin-top: 0;
}
.contenedor-login {
  background: -webkit-radial-gradient(
      closest-corner,
      rgba(16, 47, 70, 0) 60%,
      rgba(16, 47, 70, 0.26)
    ),
    -webkit-linear-gradient(108deg, #0a4867, #2196f3 90%);
  height: 100vh;
  min-height: 600px;
}
</style>
