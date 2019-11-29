<template>
  <div>
    <div id="cardBody">
      <b-card id="cardWhole" no-body>
        <b-tabs active-nav-item-class="font-weight-bold text-uppercase text-default" card>
          <!-- Tab 1 -->
          <b-tab title="Online Users" active>
            <b-form-group>
              <i id="searchIcon" style="cursor: pointer" class="fa fa-search fa_custom fa-2x"></i>
              <b-form-input id="searchBar" required placeholder="Search Location" v-model="search"></b-form-input>
            </b-form-group>
            <b-container fluid>
                <b-row>
                    <b-col cols="3" v-for="(item, index) in filterData" :key="index">
                        <center>
                            <div id="card">
                                    <b-row no-gutters>
                                    <b-col md="5">
                                       <b-card-img :src="require('assets/user.png')" id="userIcon" class="rounded-0"></b-card-img>
                                    </b-col>
                                    <b-col md="7">
                                        <b-card-body>
                                            <label style="border: 2px solid">{{item.fname + " " + item.lname}}</label><br>
                                            <label style="border: 2px solid">{{item.address}}</label><br>
                                            <b-button v-on:click="redirect('/authorizationForm', index)" id="connectBtn">Connect</b-button>
                                        </b-card-body>
                                    </b-col>
                                    </b-row>
                            </div>
                        </center>
                    </b-col>
                    <b-col cols="4">
                        
                    </b-col>
                    <b-col cols="4">
                        
                    </b-col>
                </b-row>
            </b-container>
          </b-tab>
      <!-- Tab 2 -->
          <b-tab title="Activities">
            <div v-for="(item,index) in notify" :key="index">
              <b-card>
                <b-card-text>{{item.trackingNum}}</b-card-text>
              </b-card>
            </div>
          </b-tab>
          <!-- TAb 3 -->
          <b-tab title="Track">
            <b-container>
              <b-row>
                <b-col cols="2">
                </b-col>
                <b-col cols="8">
                   <b-form-group label="Tracking No.">
                      <i id="searchIcon" class="fa fa-search fa_custom fa-2x"></i>
                      <b-form-input id="tracking" required placeholder="e.g 123456789012"></b-form-input>
                  </b-form-group>
                  <b-card id="cardTracking" scrollable>
                  </b-card>
                </b-col>
                <b-col cols="2">
                </b-col>
              </b-row>
            </b-container>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>
<style lang='scss' scoped>
@import "~assets/color.scss";
#cardBody {
  margin-top: 5%;
  margin-left: 1%;
  margin-right: 1%;
  margin-bottom: 1%;
  height: 100%;
}
#card{
  border-color: $motif;
  box-shadow: 3px 5px 15px 3px #888888;
  border-radius: 7px;
}
.card{
  text-align: center;
  border-color: $motif;
}
#searchBar{
  width: 30%;
  float: right;
  border-color: $motif;
}
#searchIcon{
  float: right;
  margin-left: 5px;
}
#tracking{
  width: 90%;
  float: right;
  border-color: $motif;
}
#connectBtn{
  background-color: $motif;
}
#addBtn{
 background-color: $motif;
}
.motif{
    border-color: $motif;
}
#userIcon{
  height:160px;
  margin-top: 18%;
  width: auto;
}
</style>

<script>
import ROUTER from "router"
const axios = require('axios')
// import { mapGetters } from 'vuex'
export default {
   mounted(){
      this.managePusher();
      setTimeout( () => {
        this.retrieve( response => {
          if(response.data.partner.length > 0){
            this.data = response.data.partner
          }else{
            this.data = []
          }
        })
      }, 100)

  },
  computed: {
      filterData () {
          return this.data.filter( data => {
              return !this.search || data.address.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  data() {
    return {
      data: [],
      search: "",
      notify: []
    };
  },
  component: {
  },
  methods: {
    retrieve(callback){
      axios.post('http://localhost:3000/allPartners')
      .then(function (response) {
        console.log(response.data.partner)
        callback(response)
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    managePusher(){
      let user = {
        sendEmail: localStorage.getItem("receiverEmail")
      }
      var channel = this.$pusher.subscribe('my-channel');
      channel.bind('my-event', ({notify}) => {
        if(parseInt(notify.recemail) == user.sendEmail){
          this.notify.unshift(notify)
        }
      });
    },
    redirect(route, index){
      localStorage.setItem("receiverEmail", this.filterData[index].email)
      ROUTER.push(route);
    },
    
    // searchAddress(callback){
    //   axios.post('http://localhost:3000/dashboardSearch/'+ this.search)
    //     .then(function (response) {
    //       callback(response)
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // }
  }
}
</script>