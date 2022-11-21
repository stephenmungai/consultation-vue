<template>
    <Modal @close="$emit('close')">
        <div id="diagnosis-modal">
            <div class="row" id="diagnosis-modal-header">
                <img src="../../assets/logo.png" alt="" class="logo">

                <h4>Register Diagnosis</h4>
            </div>
            <div class="diagnosis-form">
                <div class="form-container">
                    <input type="text" placeholder="Diagnosis" v-model="diagnosis">

                </div>
                <div class="form-container">
                    <input type="text" name="" id="" class="textarea" placeholder="Remarks" v-model='remark'>
                </div>
                <div class="form-container">
                    <input type="text" name="" id="" class="textarea" placeholder="Prescription" v-model='prescription'>
                </div>
                <button @click="diagnose">Complete Consultation</button>
            </div>
        </div>
    </Modal>
</template>

<script>
import Modal from '../Modal.vue';

export default {
    components: {
        Modal
    },
    data() {
        return {
            remark: "",
            diagnosis: "",
            prescription: ""
        }
    },
    methods: {
        async diagnose() {
            var res = await this.$axios.patch(`doctors/consultation/${this.$route.params.id}/`, { diagnosis: this.diagnosis, remarks: this.remark, prescription: this.prescription, completed: true })
            if (res.statusCode <= 210) {

                this.$emit('close')
                this.$router.push('/consultations')

            }
        }
    }
}
</script>
<style>
@import url('../../styles/consultation.css');
</style>