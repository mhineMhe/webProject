import Vue from 'vue'
import App from 'src/App.vue'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from 'router'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.use(VueSidebarMenu)
// import Slider from '@jeremyhamm/vue-slider'
// Vue.use(Slider)
// import 'bootstrap-css-only/css/bootstrap.min.css'
// import 'mdbvue/lib/css/mdb.min.css'
// import '@fortawesome/fontawesome-free/css/all.min.css

import * as mdbvue from 'mdbvue'
for (const component in mdbvue) {
  Vue.component(component, mdbvue[component])
}

Vue.config.productionTip = false
Vue.use(BootstrapVue)
new Vue({
  render: h => h(App),
  router:router,
  template: '<router-view></router-view>'
}).$mount('#app')
