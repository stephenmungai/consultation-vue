<template>
    <div class="payment-screen">

        <div class="container box-shadow">
            <div class="icon-container-circular">
                <i class="fa fa-check"></i>
            </div>
            <h3>Payment Verification</h3>
            <!-- <p class="info-text">Verify your payment if you have completed the transaction. A confirmation email will be
                sent to your account</p> -->

            <h4> Application Details</h4>

            <div class="confirmation-details">
                <p v-if="data"><span>Doctor</span> {{data.doctor['first_name']}} {{data.doctor['last_name']}}</p>
                <p v-if="data"><span>Specialization</span>{{data.doctor['specialization']['name']}}</p>
                <p v-if="data"><span>Payment Type</span>MPESA</p>
                <p v-if="data"><span>Payment Code</span>{{data.checkoutID}}</p>

            </div>
            <p style="color:red;" v-if="error"> An error has occured please try again </p>
            <button @click="verifyPayment">Verify Payment</button>
        </div>
    </div>
</template>
<script>
import { useToast } from "vue-toastification";

export default {

    setup(){
        const toast = useToast();

      return { toast }

    },
    data() {
        return {
            error: false,
            data: null
        }
    },
    methods: {
        async verifyPayment() {
            this.error = false;
            var res = await this.$axios.post('patients/mpesa/verify/', { checkoutID: this.data.checkoutID }).catch(()=>{
                this.toast.warning("An error has occured")
                this.error = true;
            })
            if (res.status <= 210) {
                this.$router.push('/consultations')
                this.toast.success("The doctor has received your request.")
            }
            
        }
    },
    async mounted() {
        var res = await this.$axios.get(`patients/application/${this.$route.params['id']}`)
        console.log(res.data)
        if (res.status <= 210) {
            this.data = res.data
        }
        else {
            this.$router.replace('404')
        }
    }


}

</script>
<style scoped>
.payment-screen .container {
    width: fit-content;
    padding: 2em;
    margin: 3em auto;
    border-radius: 10px;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.icon-container-circular {
    padding: 2em;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: green;
    border: 2px solid green;
    border-radius: 50%;
    margin: 0 auto;
}

.icon-container-circular i {
    font-size: 1.5em;
}

h3 {
    text-align: center;
    margin: 1em 0;
}

.info-text {
    font-size: 0.9em;
    margin-bottom: 1em;
    line-height: 1.5;
}

h4 {
    margin-bottom: 1em;
    width: fit-content;
}

h4::after {
    background-color: #1d9fb9;
    width: auto;
    height: 5px;
    display: block;
    content: '';
    border-radius: 7px;
    margin: 0.5em 0;
}

button {
    width: 100%;
}

.confirmation-details p {
    margin-bottom: 0.6em;
    font-size: 0.9em;
    color: rgb(69, 69, 69);
    font-weight: 500;
}

.confirmation-details span {
    font-weight: 600;
    text-align: center;
    min-width: 150px;
    margin-right: 2em;
    color: black;
}
</style>