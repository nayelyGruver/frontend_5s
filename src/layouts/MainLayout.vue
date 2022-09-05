<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Reportes de Evaluación
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container >
      <div class ="q-ma-lg flex justify-end">
        <div class ="row">
          <q-select outlined v-model="model" :options="options" label="Outlined" />
          <q-select outlined v-model="model" :options="options" label="Outlined" />
        </div>
        <q-btn @click="buscarReporte(8,2022)" color="primary q-ml-xl" label="Buscar" />
      </div>
      <div class="q-pa-md">
        <q-table
          :rows="reportes"
          :columns="columns">
        </q-table>
      </div>

      <router-view />
    </q-page-container>
  </q-layout>
</template>



<script>
import { defineComponent, ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia';
import EssentialLink from 'components/EssentialLink.vue'
import { useReporteStore  } from '../stores/reportes';
import { formatearFecha } from '../helpers/formatearFecha'
import { routerViewLocationKey } from 'vue-router';

const useReporte = useReporteStore()


// se estrae el metodo
const { obtenerReportes } = useReporte
//se extrae el state 
const { reportes } = storeToRefs(useReporte)

const columns = [
  {
  name : 'id_reporte', 
  label : 'No Reporte', 
  align : 'left', 
  field : 'id_reporte', 
  sortable : false
  }, 
  {
    name : 'id_empresa', 
    label : 'Empresa', 
    align : 'left', 
    field: 'id_empresa',
    sortable : true
  }, 
  { 
    name : 'usuario', 
    label : 'Auditor', 
    align : 'left', 
    field : 'usuario',
    sortable : false 
  }, 
  {
    name : 'fecha', 
    label : 'Fecha', 
    align : 'left', 
    field : row => formatearFecha( row.fecha ),
    sortable : true  
  },
  {
    name : 'calificacion', 
    label : 'Calificación Obtenida', 
    align : 'left', 
    field : 'calificacion',
    sortable : true  
  }
]

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

export default defineComponent({
  
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    const buscarReporte = (mes, anio) => {
      obtenerReportes(mes, anio)
      console.log(reportes.value)
    }
    //  HOOK ciclo de vida del componente
    onMounted(()=> {
      obtenerReportes(8, 2022)
    })

    return {
      columns, 
      essentialLinks: linksList,
      leftDrawerOpen,
      obtenerReportes,
      reportes,
      buscarReporte,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
