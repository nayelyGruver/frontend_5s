<template>
  <div class="contenedor-login">
    <div class="informacion-login contenedor">
      <div class="portada-login">
        <h1>Bienvenido, <span>Portal de 5s</span></h1>
      </div>
      <q-form
        class="bg-white formulario-login"
        @submit.prevent="login"
        ref="formulario"
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
              v-model="usuarioObj.usuario"
              label="Ingresa el nombre de usuario"
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
  </div>
</template>
<script>
import { useAutenticacionStore } from "../stores/autenticaciones";
import { api } from "src/boot/axios";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const useAutenticacion = useAutenticacionStore();
    const { iniciarSesion } = useAutenticacion;

    const isPassword = ref(true);
    const formulario = ref(null);
    const router = useRouter();

    const usuarioObj = reactive({
      usuario: "",
      contrasena: "",
    });

    const login = async () => {
      if (await formulario.value.validate()) {
        await iniciarSesion(usuarioObj);
        router.push("/principal");
      }
    };

    return {
      usuarioObj,
      isPassword,
      iniciarSesion,
      login,
      formulario,
    };
  },
};
</script>

<style scoped>
h1 {
  margin-top: 0;
}
.contenedor-login {
  background-color: #f3f4f6;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
