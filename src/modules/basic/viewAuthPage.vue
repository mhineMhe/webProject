<template>
  <div id="authPage">
    <b-container fluid>
      <b-row>
        <b-col cols="1"></b-col>
        <b-col>
          <div id="form">
            <b-card id="card">
              <b-card-text class="center">
                <b>AUTHORIZATION LETTER</b>
              </b-card-text>
              <br>
              <b-card-text id="senderName" class="center">
                <p>{{UpdateSenderName}}</p>
              </b-card-text>
              <b-card-text class="center">
                <p>{{UpdateyourAddress}}</p>
              </b-card-text>
              <b-card-text class="center">
                <p>{{Updatezip}}</p>
              </b-card-text>
              <br>
              <br>

              <b-card-text>
                <p>
                  <b>{{UpdatecurrentDate}}</b>
                </p>
              </b-card-text>
              <br>

              <b-card-text>
                <p>{{UpdaterecName}}</p>
              </b-card-text>
              <b-card-text>{{UpdaterecAddress}}</b-card-text>
              <b-card-text class="side">
                <p>{{UpdaterecZip}}</p>
              </b-card-text>
              <br>

              <b-card-text class="side">
                <b>To whom it may concern:</b>
              </b-card-text>
              <b-card-text class="side">
                <!-- NEEED FOOOORRR CHANNNNNNNNGE -->
                <p>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I {{UpdateSenderNames}} hereby authorize {{UpdaterecNames}} permission to process and
                  collect my {{UpdateauthDocument}} in my behalf. To expedite the process, I've included Identification
                  information for verification needs.
                </p>
              </b-card-text>
              <b-card-text>
                <p>Authorized Person:{{ UpdaterecNames }}</p>
              </b-card-text>
              <b-card-text>
                <p>Identity Type:{{ UpdateTypeofId }}</p>
              </b-card-text>
              <b-card-text>
                <p>ID Number:{{ UpdateIdNumber}}</p>
              </b-card-text>
              <b-card-text>
                <p>Scoped of Authorization:{{ Updatedoc}}</p>
              </b-card-text>
              <b-card-text>
                <p>
                  The Permission to processes the documents in my name starts on
                  <b>{{UpdatecurrentDate}}</b>
                  and ends on {{UpdatedueDates}}.
                </p>
              </b-card-text>
              <br>

              <b-card-text class="side">Sincerely,</b-card-text>
              <b-card-text class="side">
                <p>{{UpdateSenderName}}</p>
              </b-card-text>
            </b-card>
          </div>
          <br>
          <br>
          <div>
            <center>
              <b-button
                v-b-modal.sendToModal
                id="sendTo"
                @click="shows=true"
                v-on:click="goBack()"
              >OK</b-button>
            </center>
          </div>
        </b-col>
        <b-col cols="1"></b-col>
      </b-row>
    </b-container>
  </div>
</template>


<script>
import ROUTER from "router";
const axios = require("axios");
export default {
  name: "authForm",
  data() {
    return {
      UpdateauthDocument: "",
      UpdateTypeofId: "",
      UpdateIdNumber: "",
      UpdateSenderNames: "",
      UpdateSenderName: "",
      UpdateyourAddress: "",
      Updatezip: "",
      UpdatecurrentDate: new Date(),
      UpdatedueDates: "",
      UpdaterecName: "",
      UpdaterecNames: "",
      UpdaterecAddress: "",
      UpdaterecZip: "",
      Updatedoc: ""
    };
  },
  mounted() {
    this.UpdateSenderName = localStorage.getItem("senderName");
    this.UpdateSenderNames = localStorage.getItem("senderNameUnder");
    this.UpdateyourAddress = localStorage.getItem("senderAddress");
    this.Updatezip = localStorage.getItem("senderZip");
    this.UpdatedueDates = localStorage.getItem("dueDate");
    this.UpdaterecName = localStorage.getItem("receiverName");
    this.UpdaterecNames = localStorage.getItem("receiverNameUnder");
    this.UpdaterecAddress = localStorage.getItem("receiverAddress");
    this.UpdaterecZip = localStorage.getItem("receiverZip");
    this.Updatedoc = localStorage.getItem("documents");
    this.UpdateauthDocument = localStorage.getItem("documentsUpper");
    this.UpdateTypeofId = localStorage.getItem("typeId");
    this.UpdateIdNumber = localStorage.getItem("idNumber");
  },
  methods: {
    goBack() {
      if (localStorage.getItem("partner") === "dashboardPartneredUser") {
        ROUTER.push("/dashboardPartneredUser");
      } else {
        ROUTER.push("/dashboard");
      }
    },
    GOTOACTIVITIES() {
      console.log("This will go to Activities or Notifications!");
      var allData = {
        trackingNum: this.TrackingNumber,
        senderName: localStorage.getItem("senderName"),
        senderAddress: localStorage.getItem("senderAddress"),
        senderZipCode: localStorage.getItem("senderZip"),
        currentDate: this.UpdatecurrentDate,
        receiverAddress: localStorage.getItem("receiverAddress"),
        receiverName: localStorage.getItem("receiverName"),
        receiverZipCode: localStorage.getItem("receiverZip"),
        dueDate: localStorage.getItem("dueDate"),
        documentType: localStorage.getItem("documents"),
        identityType: localStorage.getItem("typeId"),
        idNumber: localStorage.getItem("idNumber")
      };
      axios
        .post("http://localhost:3000/authLetter", allData)
        .then(response => {
          console.log(response);
          if (localStorage.getItem("partner")) {
            ROUTER.push("/dashboardPartneredUser");
          } else {
            ROUTER.push("/dashboard");
          }
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style lang='scss' scoped>
@import "~assets/color.scss";
#authPage {
  margin-top: 6%;
}
#sendTo {
  background-color: $motif;
  margin-bottom: 3%;
  width: 20%;
}
#fillUp {
  background-color: $motif;
  margin-bottom: 3%;
  width: 20%;
  float: left;
}
.center {
  text-align: center;
}
#card,
.borderColor {
  border-color: $motif;
}
</style>