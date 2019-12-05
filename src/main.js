import Vue from 'vue'
import App from 'src/App.vue'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from 'router'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import Vuelidate from 'vuelidate'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
// import Swal from 'sweetalert2'

Vue.use(Vuesax);
Vue.use(Vuelidate)
Vue.use(VueSidebarMenu)
Vue.use(require('vue-pusher'), {
  api_key: '19f814902a00899fa4c5',
  options: {
      cluster: 'ap1',
      encrypted: true,
  }
});
Vue.prototype.$axios = axios;
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
