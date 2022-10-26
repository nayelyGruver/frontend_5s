<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar class="logo-inicio">
            <img src="../img/logog.png" />
          </q-avatar>
          Evaluaciones 5s
        </q-toolbar-title>
        <q-btn flat @click="logout"> Cerrar sesión</q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
      <div class="row justify-center contenedor-menu">
        <q-img src="../img/banner.jpg" id="target-img-1" style="height: 100px">
          <div
            class="absolute-bottom-right"
            style="border-top-left-radius: 5px"
          >
            {{ usuarioAutenticado?.nombrePermiso }}
            <span style="font-weight: bold"></span>
          </div>
        </q-img>
      </div>
      <NavBar></NavBar>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import NavBar from "../components/NavBar.vue";

import { useReporteStore } from "../stores/reportes";
// import { useUsuarioStore } from "../stores/usuarios";
import { useAutenticacionStore } from "../stores/autenticaciones";
import { useMetricasStore } from "../stores/metricas";
import { useEmpresasStore } from "../stores/empresas";

export default {
  components: {
    NavBar,
  },
  setup() {
    const useReporte = useReporteStore();
    const { obtenerReportes } = useReporte;
    const useUsuario = useAutenticacionStore();
    const { usuarioAutenticado } = storeToRefs(useUsuario);
    const { cerrarSesion } = useUsuario;
    // const { obtenerUsuarios } = useUsuario;
    const leftDrawerOpen = ref(false);
    const router = useRouter();

    const useMetricas = useMetricasStore();
    const { obtenerCalificacionMes, obtenerCalificacionAnio } = useMetricas;

    const useEmpresas = useEmpresasStore();
    const { obtenerEmpresas } = useEmpresas;

    onMounted(() => {
      // obtenerUsuarios();
      obtenerEmpresas();
      obtenerCalificacionMes();
      obtenerCalificacionAnio();
      obtenerReportes();
    });

    const inicialesUsuario = (nombre) =>
      computed(() => {
        const nombreCompleto = nombre.split(" ");
        return nombreCompleto[0].charAt(0) + nombreCompleto[1].charAt(0);
      });

    const logout = () => {
      router.push("/");
      cerrarSesion();
    };

    return {
      leftDrawerOpen,
      usuarioAutenticado,
      inicialesUsuario,
      logout,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>
<style scoped>
.logo-inicio {
  background-color: white;
}
.logo-inicio img {
  padding: 0.3rem;
}
.contenedor-menu {
  margin-bottom: 1rem;
}
</style>
