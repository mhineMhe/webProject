<template>
  <div id="lawas">
    <!-- <div v-if="auth.user !== null">
      <sideBar></sideBar>
        <transition>
          <router-view></router-view>
        </transition>
    </div> -->
    <div>
      <transition>
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<style scoped>
</style>

<script>
// import sideBar from "components/frame/sidebar.vue";
import AUTH from 'services/auth'
export default {
  name: "lawas",
  components: {
    // sideBar
  },
  data(){
      return{ 
          auth: AUTH,
      }
  }
};
</script>