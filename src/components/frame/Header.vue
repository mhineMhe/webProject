<template>
  <div id="Header">
    <b-navbar fixed="top" toggleable="lg" type="light" variant="light">
      <!-- <b-navbar-brand href="#" id="title">UGrab</b-navbar-brand> -->
      <b-card-img :src="require('assets/header.png')" class="rounded-0" id="userIcon"></b-card-img>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-form-input
            class="input"
            v-if="this.userEmail === null"
            v-model="form.email"
            type="email"
            required
            placeholder="Email"
          ></b-form-input>&nbsp;&nbsp;&nbsp;
          <b-form-input
            class="input"
            v-if="this.userEmail === null"
            v-model="form.password"
            type="password"
            required
            placeholder="Password"
          ></b-form-input>&nbsp;&nbsp;&nbsp;
          <b-button v-on:click="onSubmit" v-if="this.userEmail === null" id="login">Login</b-button>

          <div variant="link" v-if="this.userEmail !== null">
            <span
              style="margin-top:7px;color:#3483eb;"
              v-on:click="redirect()"
              class="fa fa-fw fa-home fa-2x"
            ></span>
          </div>
          <div v-if="this.userEmail !== null">
            <b-dropdown variant="link" toggle-class="text-decoration-none" no-caret>
              <template v-slot:button-content>
                <span class="fas fa-user-circle fa-2x"></span>
              </template>
              <b-dropdown-item v-on:click="goToPersonalInfo()">View Profile</b-dropdown-item>
              <b-dropdown-item v-on:click="logout()">Logout</b-dropdown-item>
            </b-dropdown>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

  <script>
import ROUTER from "router";
import AUTH from "services/auth";
export default {
  data() {
    return {
      user: "",
      auth: AUTH,
      form: {
        email: "",
        password: ""
      },
      userEmail: null
    };
  },
  methods: {
    goToPersonalInfo(){
      ROUTER.push('/personalInformation')
    },
    redirect() {
      if(localStorage.getItem("partner") === null){
        ROUTER.push('/dashboardPartneredUser')
      }else{
        ROUTER.push('/dashboard')
      }
      
    },

    logout(){
      AUTH.logout()
    },

    onSubmit(e) {
      e.preventDefault();
      AUTH.login(this.form.email, this.form.password)
        // .then(response => {
        //   this.userEmail = response.data.email;
        // })
        // .catch(err => {
        //   console.log(err);
        // });
      this.userEmail = localStorage.getItem("email");
      alert("Hi " + this.userEmail);
    }
  }
};
</script>

  <style scoped lang="scss">
@import "~assets/color.scss";
#userIcon {
  width: 7%;
  height: auto;
}
#login {
  background: $motif;
  height: 39px;
}
.input {
  border-color: $motif;
}
a {
  font-size: 20px;
}
</style>
