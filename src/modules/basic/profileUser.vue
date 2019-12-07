<template>
  <div id="container">
    <div>
      <center>
        <h1>Profile</h1>
        <hr />
      </center>
    </div>
    <div class="mt-4">
      <b-container fluid class>
        <b-row>
          <b-col cols="2">
          </b-col>
          <b-col cols="4">
            <b-img
            style="cursor: pointer"
              thumbnail
              flui
              v-b-tooltip.hover.top
              title="Change your Avatar"
              alt="Image 3"
              accept="image;"
              id="userIcon"
              rounded="circle"
              :src="imgUrl?imgUrl:placeHolder"
              @click="$refs.file.click()"
            ></b-img>
            <div>
              <span>
                <input
                  type="file"
                  id="file"
                  @change="handleFileUpload()"
                  ref="file"
                  style="display:none"
                />
                <center>
                  <br />
                  <b-button v-on:click="submit" id="login">Update Profile</b-button>
                  <br><h1>Hi {{Uname}}</h1>
                </center>
              </span>
            </div>
          </b-col>
          <b-col cols="4">
            <div class="form-group">
              <label for="fullname">Full Name</label>
              <b-form-input
                required
                type="text"
                class="form-control"
                id="fullname"
                v-model="fullname"
                :disabled="!inputEnable"
              ></b-form-input>
            </div>
            <div class="form-group">
              <label for="username" class="bmd-label-floating">Username</label>
              <b-form-input
                required
                type="text"
                class="form-control"
                id="Username"
                v-model="username"
                :disabled="!inputEnable"
              ></b-form-input>
            </div>
            <div class="form-group">
              <label for="email" class="bmd-label-floating">Email</label>
              <b-form-input required type="email" class="form-control" id="Email" v-model="email" :disabled="!inputEnable"></b-form-input>
            </div>
            <div class="form-group">
              <label for="address" class="bmd-label-floating">Address</label>
              <b-form-input
                required
                type="text"
                class="form-control"
                id="Address"
                v-model="address"
                :disabled="!inputEnable"
              ></b-form-input>
            </div>
            <div class="form-group">
              <label for="phone" class="bmd-label-floating">PhoneNo.</label>
              <b-form-input required type="text" class="form-control" id="phone" v-model="phone" :disabled="!inputEnable"></b-form-input>
            </div>
            <div class="form-group">
              <label for="pwd" class="bmd-label-floating">Password</label>
              <b-form-input
                required
                type="password"
                class="form-control"
                id="passw"
                v-model="password"
                :disabled="!inputEnable"
              ></b-form-input>
            </div>
            <br>
              <center>
              <b-button v-show="show" v-on:click="update" id="login">Update</b-button>
              <b-button v-show="!show" v-on:click="save" id="login">Save</b-button>
            </center>
          </b-col>
          <b-col cols="2">
          </b-col>
        </b-row>
      </b-container>
    </div>
    <br>
    <br>
    <hr>
  </div>
</template>

<script>
import AUTH from "services/auth";
import axios from "axios";
export default {
  data() {
    return {
      placeHolder: "https://lakewangaryschool.sa.edu.au/wp-content/uploads/2017/11/placeholder-profile-sq.jpg",
      imgUrl:null,
      auth: AUTH,
      file:'',
      fullname: "",
      username: "",
      email: "",
      address: "",
      phone: "",
      password: "",
      Uname: "",
      inputEnable: false,
      show: true
    };
  },
  mounted(){
    this.retrieveData()
  },
  methods: {
    retrieveData(){
      axios.post("http://localhost:3000/oneUser/" + localStorage.getItem("email"))
        .then(res => {
          console.log(res)
          this.username = res.data.user.username
          this.email = res.data.user.email
          this.address = res.data.user.address
          this.password = res.data.user.password
          this.phone = res.data.user.phoneNum
          this.fullname = res.data.user.fullname
          this.Uname = res.data.user.username
          this.imgUrl = res.data.user.profilePic
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      this.imgUrl = URL.createObjectURL(this.file);
      console.log(this.file);
      
    },
    submit() {
      let formData = new FormData();
      var data= {
        fullname: this.fullname,
        username: this.username,
        email: this.email,
        password: this.password,
        address: this.address,
        phoneNum: this.phone,
        profilePic: this.imgUrl
      }
      formData.append("img", this.file);
      formData.append("details", JSON.stringify(data));
      formData.append("user", localStorage.getItem("email"));

      axios
        .post("http://localhost:3000/uploadUser", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then((res)=> {
          console.log(res)
          this.imgUrl = res.data.profilePic
          })  
        .catch((err)=> {
          console.log(err);
        });
    },
    save(){
      var data= {
        fullname: this.fullname,
        username: this.username,
        email: this.email,
        password: this.password,
        address: this.address,
        phoneNum: this.phone
      }
      axios
        .post("http://localhost:3000/userData/" + localStorage.getItem("email"), data)
        .then((res)=> {
          console.log(res)
          this.inputEnable = false
          this.show = true
          })  
        .catch((err)=> {
          console.log(err);
        });
    },
    update(){
      this.inputEnable = true
      this.show = false
    }
  }
};
</script>

<style scoped>
#container {
  margin-left: auto;
  margin-right: auto;
}
.card {
  background-color: transparent;
  border: 2px solid;
}
#userIcon {
  width: 75%;
  height: 70%;
  margin-left: 60px;
  margin-top: 10px;
}
/* h1{
  color:#bb6bd9;
} */
.mt-4 {
  border-color: #bb6bd9;
}
.img-thumbnail {
  border: 1px solid #bb6bd9;
}
.form-control {
  border: 1px solid #bb6bd9;
}
.btn-outline-primary {
  color: #bb6bd9;
  border-color: #bb6bd9;
}
hr {
  border-top: 1px solid #bb6bd9;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 21rem;
  margin-right: 17.5rem;
}
#button{
   background-color: transparent;
}
.border {
  border-color: #bb6bd9;
  border-radius: 0.25rem;
}
#login {
  background: #bb6bd9;
  height: 39px;
}
</style>