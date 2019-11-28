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
              <br />
              <b-card-text id="senderName" class="center">
                <p>{{UpdateSenderName}}</p>
              </b-card-text>
              <b-card-text class="center">
                <p>{{UpdateyourAddress}}</p>
              </b-card-text>
              <b-card-text class="center">
                <p>{{Updatezip}}</p>
              </b-card-text>
              <br />
              <br />

              <b-card-text>
                <p><b>{{UpdatecurrentDate}}</b></p>
              </b-card-text>
              <br />

              <b-card-text>
                <p>{{UpdaterecName}}</p>
              </b-card-text>
              <b-card-text>{{UpdaterecAddress}}</b-card-text>
              <b-card-text class="side">
                <p>{{UpdaterecZip}}</p>
              </b-card-text>
              <b-card-text class="side">
                <p>{{Updatesubject}}</p>
              </b-card-text>
              <br />

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
                <p>Authorized Person:{{UpdaterecNames}}</p>
              </b-card-text>
              <b-card-text>
                <p>Identity Type:{{UpdateTypeofId}}</p>
              </b-card-text>
              <b-card-text>
                <p>ID Number:{{UpdateIdNumber}}</p>
              </b-card-text>
              <b-card-text>
                <p>Scoped of Authorization:{{Updatedoc}}</p>
              </b-card-text>
              <b-card-text>
                <p>The Permission to processes the documents in my name starts on <b>{{UpdatecurrentDate}}</b> and ends on {{UpdatedueDates}}.</p>
              </b-card-text>
              <br />

              <b-card-text class="side">Sincerely,</b-card-text>
              <b-card-text class="side">
                <p>{{UpdateSenderName}}</p>
              </b-card-text>
            </b-card>
          </div>
          <br />
          <br />
          <div>
            <b-button v-b-modal.modalForm id="fillUp" @click="show=true">Fill Up</b-button>
            <b-button
              v-b-modal.sendToModal
              id="sendTo"
              @click="shows=true"
              v-on:click="generateTrackNumber()"
            >Send To</b-button>
          </div>
        </b-col>
        <b-col cols="1"></b-col>
      </b-row>
    </b-container>

    <b-modal
      size="lg"
      scrollable
      id="modalForm"
      ref="modal"
      title="Please Fill Up Everything"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      no-close-on-esc
      no-close-on-backdrop
      hide-header-close
      ok-variant="success"
      cancel-variant="primary"
      v-model="show"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <!-- Sender's Credentials -->
        <b-form-group
          label="Sender's Full Name"
          label-for="yourName"
          invalid-feedback="Sender's Full Name is required"
        >
          <b-form-input
            class="borderColor"
            id="yourName"
            v-model="SenderName"
            required
            placeholder="Sender's Full Name"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Sender's Address"
          label-for="yourAddress"
          invalid-feedback="Address is required"
        >
          <b-form-input
            class="borderColor"
            id="yourAddress"
            v-model="yourAddress"
            required
            placeholder="Sender's Current Address"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Sender's State/ZIP Code"
          label-for="zip"
          invalid-feedback="State/Zip Code is required"
        >
          <b-form-input
            class="borderColor"
            id="zip"
            v-model="zip"
            required
            placeholder="State/ZIP Code"
          ></b-form-input>
        </b-form-group>
        <!-- Date from & Date to -->
        <b-form-group label="Due Date" label-for="dueDate" invalid-feedback="Date is required">
          <b-form-input
            class="borderColor"
            id="dueDate"
            v-model="dueDate"
            required
            placeholder="Due Date"
          ></b-form-input>
        </b-form-group>
        <!-- Recipient's Credentials -->
        <b-form-group
          label="Recipient's Full Name"
          label-for="recName"
          invalid-feedback="Recipient's Full Name is required"
        >
          <b-form-input
            class="borderColor"
            id="recName"
            v-model="recName"
            required
            placeholder="Recipient's Full Name"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Recipient's Address"
          label-for="recAddress"
          invalid-feedback="Recipient's Address is required"
        >
          <b-form-input
            class="borderColor"
            id="recAddress"
            v-model="recAddress"
            required
            placeholder="Recipient's Address"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Recipient's State/ZIP Code"
          label-for="recZip"
          invalid-feedback="Recipient's State/Zip Code is required"
        >
          <b-form-input
            class="borderColor"
            id="recZip"
            v-model="recZip"
            required
            placeholder="Recipient's State/Zip Code"
          ></b-form-input>
        </b-form-group>
        <!-- Subject -->
        <b-form-group label="Subject" label-for="subject" invalid-feedback="Subject is required">
          <b-form-input
            class="borderColor"
            id="subject"
            v-model="subject"
            required
            placeholder="Subject"
          ></b-form-input>
        </b-form-group>
        <!-- Types of Documents -->
        <b-form-group
          label="Types of Document/s"
          label-for="doc"
          invalid-feedback="Type of Document is required"
        >
          <b-form-input
            class="borderColor"
            id="doc"
            v-model="doc"
            required
            placeholder="e.g Birth Certificate"
          ></b-form-input>
        </b-form-group>
        <!-- TYPES OF IDENTITY ID -->
        <b-form-group
          label="Types of IdentityId"
          label-for="IdentityId"
          invalid-feedback="Type of IdentityId is required"
        >
          <b-form-input
            class="borderColor"
            id="IdentityId"
            v-model="IdentityId"
            required
            placeholder="Please type your IdentityId "
          ></b-form-input>
        </b-form-group>
        <!-- FOR THE ID NUMBER -->
        <b-form-group label="ID NUMBER" invalid-feedback="Type of  IdNumber is required">
          <b-form-input
            class="borderColor"
            id="IdNumber"
            v-model="numberId"
            required
            placeholder="Please type your IdNumber "
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>

    <!-- Send To -->
    <div>
      <b-modal
        id="sendToModal"
        centered
        title="Tracking Number"
        ok-only
        @ok="GOTOACTIVITIES"
        no-close-on-esc
        no-close-on-backdrop
        hide-header-close
      >
        <form>
          <p>{{TrackingNumber}}</p>
        </form>
      </b-modal>
    </div>
  </div>
</template>


<script>
// import swal from "sweetalerts";
// import Swal from 'sweetalert2'
// import ROUTER from "router";
export default {
  name: "authForm",
  data() {
    return {
      show: false,
      shows: false,
      UpdateauthDocument: "______________",
      UpdateTypeofId: "[ID TYPE]",
      UpdateIdNumber: "[ID Number]",
      UpdateSenderNames: "_____________",
      UpdateSenderName: "[SenderName]",
      UpdateyourAddress: "[Address]",
      Updatezip: "[State/ ZIP Code]",
      UpdatecurrentDate: new Date(),
      UpdatedueDate: "[DueDate]",
      UpdatedueDates: "_______________",
      UpdaterecName: "[Recipients name]",
      UpdaterecNames: "_______________",
      UpdaterecAddress: "[Address]",
      UpdaterecZip: "[State/ ZIP Code]",
      Updatesubject: "[Subject]",
      Updatedoc: "[DOCS]",
      TrackingNumber: " ",
      SenderName: "",
      yourAddress: "",
      zip: "",
      dueDate: "",
      recName: "",
      recAddress: "",
      recZip: "",
      subject: "",
      doc: "",
      IdentityId: "",
      numberId: ""
    };
  },
  component: {},
  mounted() {
    this.UpdatecurrentDate = new Date()
      .toJSON()
      .slice(0, 10)
      .replace(/-/g, "/");
    console.log(this.UpdatecurrentDate);
  },
  methods: {
    generateTrackNumber: function() {
      const a = "ABCD".split("")[Math.floor(Math.random() * 4)];
      const b = "EFGH".split("")[Math.floor(Math.random() * 4)];
      const c = "IJKL".split("")[Math.floor(Math.random() * 4)];
      const d = "MNOP".split("")[Math.floor(Math.random() * 4)];
      const e = "QRST".split("")[Math.floor(Math.random() * 4)];
      const f = "UVWXYZ".split("")[Math.floor(Math.random() * 6)];
      var tracknum1 = Math.floor(10 + Math.random() * 90).toString();
      var tracknum2 = Math.floor(10 + Math.random() * 90).toString();
      var tracknum3 = Math.floor(10 + Math.random() * 90).toString();
      this.TrackingNumber =
        tracknum1 +
        "-" +
        (a + b) +
        "-" +
        tracknum2 +
        "-" +
        (c + d) +
        "-" +
        tracknum3 +
        "-" +
        (e + f);
      console.log("trackingnumber:" + this.TrackingNumber);
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      return valid;
    },
    resetModal() {
      this.SenderName = "";
      this.yourAddress = "";
      this.zip = "";
      this.dueDate = "";
      this.dueDate = "";
      this.recName = "";
      this.recName = "";
      this.recAddress = "";
      this.recZip = "";
      this.subject = "";
      this.doc = "";
      this.IdentityId = "";
      this.numberId = "";
    },
    GOTOACTIVITIES() {
      console.log("This will go to Activities or Notifications!");
      // var notify = {};
      // axios.post("http://localhost:3000/pusher", notify);
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
      //replace data
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      } else {
        console.log(
          "{The modal is successfully tested  for fill-up in authorization letter!}"
        );
        this.UpdateSenderName = this.SenderName;
        this.UpdateSenderNames = this.SenderName;
        this.UpdateyourAddress = this.yourAddress;
        this.Updatezip = this.zip;
        this.UpdatedueDate = this.dueDate;
        this.UpdatedueDates = this.dueDate;
        this.UpdaterecName = this.recName;
        this.UpdaterecNames = this.recName;
        this.UpdaterecAddress = this.recAddress;
        this.UpdaterecZip = this.recZip;
        this.Updatesubject = this.subject;
        this.Updatedoc = this.doc;
        this.UpdateauthDocument = this.doc;
        this.UpdateTypeofId = this.IdentityId;
        this.UpdateIdNumber = this.numberId;
      }
      // Hide the modal manually
      this.$nextTick(() => {
        this.$refs.modal.hide();
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
  float: right;
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