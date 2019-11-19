<template>
  <div id="authPage" >
    <b-container fluid>
        <b-row>
            <b-col cols="1">
            </b-col>
            <b-col>
                <div id="form">
                  <b-card id="card">
                    <b-card-text class="center"><b>AUTHORIZATION LETTER</b></b-card-text><br>
                    <b-card-text id="senderName" class="center">[Sender's name]</b-card-text>
                    <b-card-text class="center">[Address]</b-card-text>
                    <b-card-text class="center">[State/ ZIP Code]</b-card-text><br><br>

                    <b-card-text>[Date]</b-card-text><br>

                    <b-card-text>[Recipient's name]</b-card-text>
                    <b-card-text>[Address]</b-card-text>
                    <b-card-text class="side">[State/ ZIP Code]</b-card-text>
                    <b-card-text class="side">[Subject]</b-card-text><br>

                    <b-card-text class="side"><b>To whom it may concern:</b></b-card-text>
                    <b-card-text class="side">I {{Uname}} hereby authorize ________________ permission to process and
                      collect my ________________ in my behalf. To expedite the process, I've included Identification
                      information for verification needs. 
                    </b-card-text>
                    <b-card-text>Authorized Person: [Recipient's name]</b-card-text>
                    <b-card-text>Identity Type: [Type of ID]</b-card-text>
                    <b-card-text>ID Number: [ID number]</b-card-text>
                    <b-card-text>Scoped of Authorization: [Types of documents to be processed.]</b-card-text>
                    <b-card-text>The Permission to processes the documents in my name starts on ________________ and ends on ________________</b-card-text><br>

                    <b-card-text class="side">Sincerely,</b-card-text>
                    <b-card-text class="side">[Sender's Name]</b-card-text>
                    <b-card-text class="side">[Date Today]</b-card-text>
                  </b-card>
                </div><br><br>    
                <div>
                  <b-button  v-b-modal.modalForm id="fillUp">Fill Up</b-button>
                  <b-button v-b-modal.sendToModal id="sendTo">Send To</b-button>
                </div>
            </b-col>
            <b-col cols="1">
            </b-col>
        </b-row>
    </b-container>
    <!-- <div class="mt-3">
      Submitted Names:
      <div v-if="submittedNames.length === 0">--</div>
      <ul v-else class="mb-0 pl-3">
        <li v-for="name in submittedNames">{{ name }}</li>
      </ul>
    </div> -->

    <b-modal size="lg" scrollable id="modalForm" ref="modal" title="Please Fill Up Everything" @show="resetModal" @hidden="resetModal" @ok="handleOk">
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <!-- Sender's Credentials -->
        <b-form-group :state="nameState" label="Sender's Full Name" label-for="yourName" invalid-feedback="Sender's Full Name is required">
          
          <b-form-input class="borderColor" id="yourName" v-model="yourName" :state="nameState" required placeholder="Sender's Full Name"></b-form-input>
        </b-form-group>
        <b-form-group :state="nameState" label="Sender's Address" label-for="yourAddress" invalid-feedback="Address is required">
          <b-form-input class="borderColor" id="yourAddress" v-model="yourAddress" :state="nameState" required placeholder="Sender's Current Address"></b-form-input>
        </b-form-group>
         <b-form-group :state="nameState" label="Sender's State/ZIP Code" label-for="zip" invalid-feedback="State/Zip Code is required">
          <b-form-input class="borderColor" id="zip" v-model="zip" :state="nameState" required placeholder="State/ZIP Code"></b-form-input>
        </b-form-group>
        <!-- Date from & Date to -->
         <b-form-group :state="nameState" label="Current Date" label-for="currentDate" invalid-feedback="Date is required">
          <b-form-input class="borderColor" id="currentDate" v-model="currentDate" :state="nameState" required placeholder="Current Date"></b-form-input>
        </b-form-group>
        <b-form-group :state="nameState" label="Due Date" label-for="dueDate" invalid-feedback="Date is required">
          <b-form-input class="borborderColorder" id="dueDate" v-model="dueDate" :state="nameState" required placeholder="Due Date"></b-form-input>
        </b-form-group>
        <!-- Recipient's Credentials -->
         <b-form-group :state="nameState" label="Recipient's Full Name" label-for="recName" invalid-feedback="Recipient's Full Name is required">
          <b-form-input class="borderColor" id="recName" v-model="recName" :state="nameState" required placeholder="Recipient's Full Name"></b-form-input>
        </b-form-group>
         <b-form-group :state="nameState" label="Recipient's Address" label-for="recAddress" invalid-feedback="Recipient's Address is required">
          <b-form-input class="borderColor" id="recAddress" v-model="recAddress" :state="nameState" required placeholder="Recipient's Address"></b-form-input>
        </b-form-group>
         <b-form-group :state="nameState" label="Recipient's State/ZIP Code" label-for="recZip" invalid-feedback="Recipient's State/Zip Code is required">
          <b-form-input class="borderColor" id="recZip" v-model="recZip" :state="nameState" required placeholder="Recipient's State/Zip Code"></b-form-input>
        </b-form-group>
        <!-- Subject -->
         <b-form-group :state="nameState" label="Subject" label-for="subject" invalid-feedback="Subject is required">
          <b-form-input class="borderColor" id="subject" v-model="subject" :state="nameState" required placeholder="Subject"></b-form-input>
        </b-form-group>
        <!-- Types of Documents -->
         <b-form-group :state="nameState" label="Types of Document/s" label-for="doc" invalid-feedback="Type of Document is required">
          <b-form-input class="borderColor" id="doc" v-model="doc" :state="nameState" required placeholder="e.g Birth Certificate"></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  <!-- Send To -->
    <div>
      <b-modal id="sendToModal" centered title="Recepient's Email">
        <form>
          <b-form-group label="Email" label-for="email" invalid-feedback="Email is required">
            <b-form-input class="borderColor" id="email" v-model="email" :state="nameState" required placeholder="e.g you@gmail.com"></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
    </div>
   
    
  </div>
</template>


<script>
import ROUTER from "router"
export default {
  name: "authForm",
  data() {
    return {
      yourName: '',
      yourAddress: '',
      zip:'',
      currentDate:'',
      dueDate:'',
      recName:'',
      recAddress:'',
      recZip:'',
      subject:'',
      doc:'',
      nameState: null,
      submittedNames: [],
      modalShow: false
    };
  },
  component: {

  },
  methods: {
    checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid ? 'valid' : 'invalid'
        return valid
      },
      resetModal() {
        this.yourName = ''
        this.nameState = null
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        // Push the name to submitted names
        this.submittedNames.push(this.yourName)
        // Hide the modal manually
        this.$nextTick(() => {
          this.$refs.modal.hide()
        })
      }
  }
};
</script>
<style lang='scss' scoped>
@import "~assets/color.scss";
#authPage{
  margin-top: 6%;
}
#sendTo{
  background-color: $motif;
  margin-bottom: 3%;
  width: 20%;
  float:right;
}
#fillUp{
  background-color: $motif;
  margin-bottom: 3%;
  width: 20%;
  float:left;
}
.center{
  text-align: center; 
}
#card, .borderColor{
  border-color: $motif;
}

</style>