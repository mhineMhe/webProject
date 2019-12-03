<template>
  <div style="margin-top: 5%;" id="container">
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
              thumbnail
              flui
              :src="imgUrl?imgUrl:placeHolder"
              alt="Image 3"
              accept="image;"
              id="userIcon"
              rounded="circle"
            ></b-img>
            <div>
              <span>
                <center>
                  <br />
                  <br><h1>Hi {{Uname}}</h1>
                </center>
              </span>
            </div>
          </b-col>
          <b-col cols="4">
            <div class="form-group">
              <h5 for="fullname">Full Name:</h5>
              <h2 class="margLeft">{{fullname}}</h2>
            </div>
            <div class="form-group">
              <h5 for="address" class="bmd-label-floating">Address:</h5>
              <h2 class="margLeft">{{address}}</h2>
            </div>
            <div class="form-group">
              <h5 for="phone" class="bmd-label-floating">PhoneNo.:</h5>
              <h2 class="margLeft">{{phone}}</h2>
            </div>
            <div class="form-group">
              <h5 for="username" class="bmd-label-floating">Username:</h5>
              <h2 class="margLeft">{{username}}</h2>
            </div>
            <div class="form-group">
              <h5 for="email" class="bmd-label-floating">Email:</h5>
              <h2 class="margLeft">{{email}}</h2>
            </div>
            <div class="form-group">
              <h5 for="pwd" class="bmd-label-floating">Password:</h5>
              <h2 class="margLeft">{{password}}</h2>
            </div>
          </b-col>
          <b-col cols="2">
          </b-col>
        </b-row>
      </b-container>
    </div>
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
      Uname: ""
    };
  },
  mounted(){
    this.retrieveData()
    // if(localStorage.getItem("image") == null){
    //   this.imgUrl =         "https://lakewangaryschool.sa.edu.au/wp-content/uploads/2017/11/placeholder-profile-sq.jpg"
    // }else{
    //   this.imgUrl = localStorage.getItem("image")
    // }
    // this.imgUrl = localStorage.getItem("image")
  },
  methods: {
    retrieveData(){
      axios.post("http://localhost:3000/onePartner/" + localStorage.getItem("profEmail"))
        .then(res => {
          this.username = res.data.partner[0].username
          this.email = res.data.partner[0].email
          this.address = res.data.partner[0].address
          this.password = res.data.partner[0].password
          this.phone = res.data.partner[0].phoneNum
          this.fullname = res.data.partner[0].fullname
          this.Uname = res.data.partner[0].username
          this.imgUrl = res.data.partner[0].profilePic
        })
        .catch(err => {
          console.log(err)
        })
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
.margLeft{
  margin-left: 10%;
}
</style>