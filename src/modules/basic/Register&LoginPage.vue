<template>
    <div id="body">
    <b-container fluid>
      <b-row id="row">
        <b-col>

        </b-col>
        <b-col id="top" cols="6">

        <b-form @submit="onSubmit">
          <center>
            <h1>Sign Up</h1>
            <p><b><i>Get account for free</i></b></p>
            <div>
              <img src="~assets/logoTrans.png" fluid/>
            </div>
          </center>
          <b-form-group id="input-group-0" label="Username:" label-for="input-0">
            <b-form-input class="input" id="input-0" v-model="form.username" type="text"
                :class="{ 'is-invalid': submitted && $v.form.username.$error }"
                placeholder="Username"></b-form-input>
            <div v-if="submitted && !$v.form.username.required" class="invalid-feedback">Username is required</div>
          </b-form-group>

          <b-form-group id="input-group-1" label="Email:" label-for="input-1">
            <b-form-input class="input" id="input-1" v-model="form.email" type="email"
                :class="{ 'is-invalid': submitted && $v.form.email.$error }"
                placeholder="Email"></b-form-input>
            <div v-if="submitted && $v.form.email.$error" class="invalid-feedback">
              <span v-if="!$v.form.email.required">Email is required</span>
              <span v-if="!$v.form.email.email">Email is invalid</span>
            </div>
          </b-form-group>

          <b-form-group id="input-group-2" label="Password:" label-for="input-2">
            <b-form-input id="input-2" v-model="form.password" placeholder="Password"
                class="visibility"
                :class="{ 'is-invalid': submitted && $v.form.password.$error }"
                :type="passwordVisible ? 'text' : 'password'"></b-form-input>
            <span id="pointer" class="visibility" tabindex='-1' @click='togglePasswordVisibility' :arial-label='passwordVisible ? "Hide password" : "Show password"'>
              <i class="material-icons">{{ passwordVisible ? "Hide" : "Show" }}</i>
            </span>

            <div v-if="submitted && $v.form.password.$error" class="invalid-feedback">
              <span v-if="!$v.form.password.required">Password is required</span>
              <span v-if="!$v.form.password.minLength">Weak Password</span>
            </div>
          </b-form-group>
          
          <b-form-group id="input-group-3" label="Confirm Password:" label-for="input-3">
            <b-form-input class="input" id="input-3" v-model="form.confirmPassword" placeholder="Confirm Password"
                type="password"
                :class="{ 'is-invalid': submitted && $v.form.confirmPassword.$error }"></b-form-input>
            <div v-if="submitted && $v.form.confirmPassword.$error" class="invalid-feedback">
              <span v-if="!$v.form.confirmPassword.required">Confirm Password is required</span>
              <span v-else-if="!$v.form.confirmPassword.sameAsPassword">Passwords must match</span>
            </div>
          </b-form-group>

          <center><p>By clicking Sign Up, you agree to our <a href="#">Terms & Conditions</a></p>
          <b-button id="login" type="submit">Sign Up</b-button></center><br>
        </b-form>  
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import AUTH from "services/auth";
import { required, email, sameAs } from "vuelidate/lib/validators";
var passwordHash = require('password-hash');
const axios = require('axios');
export default {
  data() {
    return {
      auth: AUTH,
      form: {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      show: true,
      passwordVisible: false,
      submitted: false
    };
  },

  validations: {
    form: {
      username: { required },
      email: { required, email },
      password: {
        required,
        strongPassword(password) {
          return (
            /[a-z]/.test(password) && // checks for a-z
            /[0-9]/.test(password) && // checks for 0-9
            /\W|_/.test(password) && // checks for special char
            password.length >= 6
          );
        }
      },
      confirmPassword: { required, sameAsPassword: sameAs("password") },
    },
  },

  methods: {
    togglePasswordVisibility () {
			this.passwordVisible = !this.passwordVisible
    },
    
    onSubmit(evt) {
      evt.preventDefault();
      sessionStorage.setItem("Password", this.form.password);
      sessionStorage.setItem("Username", this.form.username);
      sessionStorage.setItem("Email", this.form.email);
      this.submitted = true;
      var encryptPass = passwordHash.generate(this.form.password);
      var encryptEmail = passwordHash.generate(this.form.email);
      var encryptUserName = passwordHash.generate(this.form.username);
      
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.form))
      alert(encryptPass +" "+ encryptEmail +" "+ encryptUserName);
      var data = {
        username: this.form.username,
        email: this.form.username,
        password: this.form.password
      }
      axios.post('/users',data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      AUTH.register(this.form.email, this.form.password);
    }
  }
};
</script>

<style scoped lang="scss">
@import "~assets/color.scss";
#top{
    background-color: white;
    padding: 2vw 3vw 4vw;
    border-radius: 7px;
    box-shadow: 2px 5px 16px 2px rgba(16, 16, 16, 0.18);
    margin-top: 8%;
    margin-bottom: 3%;  
    margin-left: 3%;
    margin-right: 3%;
}
.input{
  border-color: $motif;
}
.visibility{
  border-color: $motif;
}
#body {
  background-image: url("~assets/f.png");
  background-size: cover;
  background-attachment: fixed;
}
#login{
  background-color: $motif;
  width: 30%;
}
#pointer {cursor: pointer;}
</style>