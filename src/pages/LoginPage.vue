<template>
  <div class="contenedor-login">
    <h1>Portal 5s</h1>
    <q-form
      class="bg-white contenedor formulario-login"
      @submit.prevent.stop="login"
      ref="formulario"
    >
      <div class="q-pa-xl">
        <div class="contenedor-logo-gruver">
          <q-img
            src="../img/LogoGruver.png"
            spinner-color="white"
            class="q-mb-xl imagen-gruver"
          />
        </div>
        <div class="q-mb-md">
          <q-input
            ref="usuarioRef"
            v-model="usuarioObj.usuario"
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
            v-model="usuarioObj.contrasena"
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
    </q-form>
  </div>
</template>
<script>
import { useAutenticacionStore } from "../stores/autenticaciones";

import { ref, reactive } from "vue";
import { useQuasar } from "quasar";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

export default {
  setup() {
    const useAutenticacion = useAutenticacionStore();
    const { iniciarSesion } = useAutenticacion;

    const usuario = ref("");
    const contrasena = ref("");
    const usuarioRef = ref("");
    const contrasenaRef = ref("");
    const isPassword = ref(true);
    const dense = ref(false);
    const formulario = ref(null);

    const $q = useQuasar();
    const router = useRouter();

    const usuarioObj = reactive({
      usuario: "",
      contrasena: "",
    });
    //metodos
    const mostrarNotificacion = (mensaje) => {
      $q.notify({
        message: mensaje,
        icon: "error",
        color: "red",
      });
    };
    const login = async () => {
      try {
        if (await formulario.value.validate()) {
          await iniciarSesion(usuarioObj);
          router.push("/principal");
        }
      } catch (error) {
        // mostrarNotificacion(error);
        console.log(error);
      }
    };

    const getFechaActual = () => {
      const fechaActual = new Date();
      return fechaActual.getFullYear();
    };

    return {
      usuarioObj,
      usuario,
      formulario,
      contrasena,
      usuarioRef,
      contrasenaRef,
      iniciarSesion,
      isPassword,
      dense,
      login,
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
