<template>
    <div class="patient-register ">
        <h3>Create Patient Profile</h3>
        <div class="registration-form box-shadow">

            <div class="form-container">
                <label for="">First Name</label>
                <input type="text" name="" id="" placeholder="Ex. John" v-model="fname">
            </div>
            <div class="form-container">
                <label for="">Last Name</label>
                <input type="text" name="" id="" placeholder="Ex. Doe" v-model="lname">
            </div>
            <div class="form-container">
                <label for="">Phone Number</label>
                <input type="text" name="" id="" placeholder="070000000" v-model="phone">
            </div>
            <div class="form-container">
                <label for="">Date of Birth</label>
                <input type="date" name="" id="" placeholder="" v-model="dob">
            </div>
            <div class="form-container">
                <label for="">Address</label>
                <input type="text" name="" id="" placeholder="Ex. 6545, Nyayo House" v-model="address">
            </div>


            <button @click="createProfile">Create Profile</button>
        </div>
    </div>
</template>
    
<script>
import { useToast } from "vue-toastification";

export default {
    setup() {
        // Get toast interface
        // window.location.reload()
        const toast = useToast();

        return { toast }
    },

    data() {
        return {
            fname: '',
            lname: '',
            dob: '',
            address: '',
            phone: ''

        }
    },
    computed: {
        isValid() {
            if (this.fname != "" & this.lname != "" & this.dob != "" & this.phone != "") {
                return true
            }
            else {
                return false
            }
        }
    },
    methods: {
        async createProfile() {
            if (this.isValid) {
                let req_body = {
                    first_name: this.fname, last_name: this.lname,
                    phone_number: this.phone, address: this.address,
                    date_of_birth: this.dob
                }
                var res = await this.$axios.post('patients/register/',req_body).catch((e) => {
                    console.log(e)
                    this.toast.error("An error has occured. Check your credentials or internet connection")
                })
                if (res.status <= 210) {
                    this.$router.push("/")
                }
            }
            else{
              this.toast.warning("Fill all fields")

            }
        }

    }
}
</script>
    
<style>

</style>