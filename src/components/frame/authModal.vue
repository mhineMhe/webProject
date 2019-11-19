<template>
  <mdb-container>
    <mdb-btn color="default" @click.native="header = true">launch header form modal <mdb-icon icon="eye" class="ml-1"/></mdb-btn>
    <mdb-modal :show="header" @close="header = false" warning>
      <mdb-modal-header class="text-center">
        <mdb-modal-title tag="h4" bold class="w-100">Subscribe</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body class="mx-3">
        <mdb-input label="Your name" icon="user" class="mb-5" iconClass="grey-text"/>
        <mdb-input label="Your email" icon="envelope" type="email" class="mb-5" iconClass="grey-text"/>
      </mdb-modal-body>
      <mdb-modal-footer center>
        <mdb-btn @click.native="header = false" outline="warning">Send <mdb-icon icon="paper-plane" class="ml-1"/></mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
    </mdb-container>
  </template>
  <script>
  import { mdbContainer, mdbBtn, mdbModal, mdbModalHeader, mdbModalBody, mdbInput, mdbModalFooter, mdbModalTitle, mdbIcon } from 'mdbvue';
  export default {
    name: 'ModalExamplesPage',
    components: {
      mdbContainer,
      mdbBtn,
      mdbModal,
      mdbModalHeader,
      mdbModalBody,
      mdbInput,
      mdbModalFooter,
      mdbModalTitle,
      mdbIcon
    },
    data() {
      return {
        header: false
      }
    }
  }
</script>