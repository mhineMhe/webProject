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

          <center>
            <p>
              By clicking Sign Up, you agree to our
              <a
                href="#"
                v-b-modal.modal-scrollable
                @click="show=true"
              >Terms & Conditions</a>
            </p>
            <div>
              <b-modal
                scrollable
                title="Our Terms and Conditions"
                id="modal-scrollable"
                v-model="show"
              >
                <b>Iconnect Terms of Service ("Agreement")</b>
                <p>
                  This Agreement was last modified on September 20, 2013.
                  Please read these Terms of Service completely using iconnectblog.com which is owned and operated by Iconnect. This Agreement documents the legally binding terms and conditions attached to the use of the Site at iconnectblog.com.
                  By using or accessing the Site in any way, viewing or browsing the Site, or adding your own content to the Site, you are agreeing to be bound by these Terms of Service.
                </p>
                <ul>
                  <b>Intellectual Property</b>
                  <p>The Site and all of its original content are the sole property of Iconnect and are, as such, fully protected by the appropriate international copyright and other intellectual property rights laws.</p>
                  <b>Termination</b>
                  <p>
                    Iconnect reserves the right to terminate your access to the Site, without any advance notice.Links to Other Websites
                    Our Site does contain a number of links to other websites and online resources that are not owned or controlled by Iconnect.
                    Iconnect has no control over, and therefore cannot assume responsibility for, the content or general practices of any of these third party sites and/or services. Therefore, we strongly advise you to read the entire terms and conditions and privacy policy of any site that you visit as a result of following a link that is posted on our site.
                  </p>
                  <b>Governing Law</b>
                  <p>This Agreement is governed in accordance with the laws of Philippines.</p>
                  <b>Changes to This Agreement</b>
                  <p>
                    Iconnect reserves the right to modify these Terms of Service at any time. We do so by posting and drawing attention to the updated terms on the Site. Your decision to continue to visit and make use of the Site after such changes have been made constitutes your formal acceptance of the new Terms of Service.
                    Therefore, we ask that you check and review this Agreement for such changes on an occasional basis. Should you not agree to any provision of this Agreement or any changes we make to this Agreement, we ask and advise that you do not use or continue to access the Iconnect site immediately.
                  </p>
                  <b>Contact Us</b>
                  <p>If you have any questions about this Agreement, please feel free to contact us at info@iconnect.com.</p>
                </ul>
                <template v-slot:modal-footer>
                  <div class="w-100">
                    <b-button
                      id="modal"
                      size="sm"
                      class="float-right"
                      @click="show=false"
                      v-on:click="Terms"
                    >OK</b-button>
                  </div>
                </template>
              </b-modal>
            </div>
            <b-button id="login" type="submit">Sign Up</b-button>
          </center>
          <br />
        </b-form>  
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import AUTH from "services/auth";
import { required, email, sameAs } from "vuelidate/lib/validators";
// const axios = require('axios');
var passwordHash = require('password-hash');
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
    Terms: function() {
      console.log(
        "{The modal is successfully tested!!}"
    )},

    togglePasswordVisibility () {
			this.passwordVisible = !this.passwordVisible
    },
    
    onSubmit(evt) {
      evt.preventDefault();
      this.submitted = true;
      var encryptPass = passwordHash.generate(this.form.password);
      var encryptEmail = passwordHash.generate(this.form.email);
      var encryptUserName = passwordHash.generate(this.form.username);
      
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      // alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.form))
      alert(encryptPass +" "+ encryptEmail +" "+ encryptUserName);
      AUTH.register(this.form.username, this.form.email, this.form.password);
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