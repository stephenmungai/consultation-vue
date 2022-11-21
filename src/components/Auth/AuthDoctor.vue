<template>
    <div class="patient-register ">
        <h3>Create Doctor Profile</h3>
        <div class="registration-form box-shadow">
            <div class="row">


                <div class="form-container">
                    <label for="">First Name</label>
                    <input type="text" name="" id="" placeholder="Ex. John" v-model="fname" class="short-input">
                </div>
                <div class="form-container">
                    <label for="">Last Name</label>
                    <input type="text" name="" id="" placeholder="Ex. Doe" v-model="lname" class="short-input">
                </div>
            </div>
            <div class="row">

                <div class="form-container">
                    <label for="">Phone Number</label>
                    <input type="number" name="" id="" placeholder="0701000000" v-model="phone" class="short-input">
                </div>

                <div class="form-container">
                    <label for="">Degree</label>
                    <input type="text" name="" id="" placeholder="MSBBS" v-model="degree" class="short-input">
                </div>
            </div>
            <div class="form-container">
                <label for="">Speciality</label>
                <select name="" id="speciality-dropdown" v-model="speciality">
                    <option v-for="specs in specialities" :key="specs['id']" :value="specs['id']">{{ specs['name'] }}
                    </option>
                </select>
            </div>

            <button style="width:100%;" @click="createProfile">Create Profile</button>
            <router-link to="/">Back to home</router-link>
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
            fname: "",
            lname: "",
            speciality: "",
            phone: "",
            degree: "",
            specialities: []

        }
    },
    computed: {
        isValid() {
            if (this.fname != "" & this.lname != "" & this.speciality != "" & this.phone != "" & this.degree != "") {
                return true
            }
            return false

        }
    },
    methods: {
        async createProfile() {
            if (this.isValid) {
                var res = await this.$axios.post('doctors/register/', {
                    first_name: this.fname, last_name: this.lname, specialization: this.speciality,
                    phone_number: this.phone, degree: this.degree
                }).catch(() => {
                    this.toast.error("An error has occured. Check your credentials or internet connection")
                })
                if (res.status <= 210) {
                    this.$router.push("/")
                }
            }
            else {
                this.toast.warning("Fill all fields");
            }
        }
    },
    async mounted() {
        var res = await this.$axios.get('doctors/specialities/')
        console.log(res.data)
        if (res.status <= 210) {
            this.specialities = res.data
        }
    }
}

</script>
    
<style scoped>
a {
    font-size: small;
    font-weight: 500;
    text-align: right;
}
</style>