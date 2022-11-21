<template>
    <modal-vue @close="$emit('close')">
        <div class="row modal-header">
            <img src="../assets/logo.png" alt="">
            <p>Apply for an Appointment</p>
        </div>
        <div class="modal-body">
            <div class="row" id="modal-doctor-details">
                <img src="../assets/3641634.jpg" alt="">
                <div class="col">
                    <h4>{{doctor['first_name']}} {{doctor['last_name']}}</h4>
                    <p>{{doctor['specialization']['name']}}</p>
                </div>
            </div>
            <p id="modal-doctor-caution">A payment of {{doctor['specialization']['consultation_price']}} sh is supposed to be made to initiate the Consultation. A
                refund can be requested if the doctor doesn't reach back after payment. Transaction fees may apply</p>

            <input type="text" name="phone" id="phone-modal" placeholder="Billing phone number" v-model="number">
            <button id="mpesa-btn" @click="makePayment">
                Pay {{doctor['specialization']['consultation_price']}} via Mpesa
            </button>
        </div>
    </modal-vue>
</template>

<script>
import ModalVue from './Modal.vue';
export default {
    components: {
        ModalVue
    },
    data(){
        return {
            number:''
        }
    },
    methods:{
        async makePayment(){
            var res = await this.$axios.post('patients/mpesa/pay/',{doctor:this.$props.doctor['id'],phone:this.number});
            if(res.status<=210){
                this.$router.push({name:"payment-confirmation",params:{
                    id:res.data['id']
                }})
            }
            else{
                console.log(res.data)
            }
        }
    },
    props:['doctor']
}
</script>
<style>
@import url('../styles/modal.css');
</style>