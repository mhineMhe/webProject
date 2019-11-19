  <template>
    <div id="Header">
      <b-navbar fixed="top" toggleable="lg" type="light" variant="light">
        <!-- <b-navbar-brand href="#" id="title">UGrab</b-navbar-brand> -->
        <b-card-img :src="require('assets/header.png')" class="rounded-0" id="userIcon"></b-card-img>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <!-- <b-nav-item v-on:click="redirect('/register')" v-if="auth.user === null">Sign Up</b-nav-item>
            <b-nav-item v-on:click="redirect('/login')" v-if="auth.user === null">Login</b-nav-item> -->
            <!-- <b-button size="sm" class="my-2 my-sm-0" type="submit" v-on:click="redirect('/register')"  id="register">Register</b-button>&nbsp;&nbsp;&nbsp; -->
              <b-form-input class="input"  v-if="auth.user === null" v-model="form.username" type="email" required placeholder="Email"></b-form-input>&nbsp;&nbsp;&nbsp;
              <b-form-input  class="input"  v-if="auth.user === null" v-model="form.password" type="password" required placeholder="Password"></b-form-input>&nbsp;&nbsp;&nbsp;
              <b-button v-on:click="onSubmit"  v-if="auth.user === null" id="login">Login</b-button>

              <i v-if="auth.user !== null" class="fa fa-fw fa-home fa-2x" v-b-toggle.collapse-2></i>&nbsp;&nbsp;&nbsp;
              <i v-if="auth.user !== null" class="fas fa-bell fa-2x"></i>&nbsp;&nbsp;&nbsp;
              <i v-if="auth.user !== null" class="fas fa-user-circle fa-2x"></i>&nbsp;&nbsp;&nbsp;
             
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </template>

  <script>
  // import ROUTER from "router";
  import AUTH from 'services/auth'
  export default {
    
    data() {
      return {
        auth: AUTH,
        form:{
          username: "",
          password: ""
        }
      };
    },
    methods: {
      // redirect(route) {
      //   ROUTER.push(route);
      // }
      onSubmit(e){
        e.preventDefault();
        AUTH.login();

      }
    }
  };
  </script>

  <style scoped lang="scss">
  @import "~assets/color.scss";
  // #title {
  //   color: $warning !important;
  // }
  #userIcon {
    width:7%;
    height:auto;
  }
  #login{
    background:$motif;
    height: 39px;
  }
  
  .input{
    border-color:$motif;
  }
  a{
    font-size: 20px;
  }
  </style>

