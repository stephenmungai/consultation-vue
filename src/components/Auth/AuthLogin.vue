<template>
    <div class="patient-register ">
        <div class="row">
            <h3>Welcome Back</h3>
            <p>Don't Have an Account? <router-link to="/auth/register">Register</router-link>
            </p>
        </div>
        <div class="registration-form box-shadow">

            <div class="form-container">
                <label for="Username">Username</label>
                <input type="text" name="" id="" placeholder="Enter Username" v-model="username">
            </div>

            <div class="form-container">
                <label for="Password">Password</label>
                <input type="password" name="" id="" placeholder="Enter your password" v-model="password1">
            </div>



            <button @click="login">Login</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useToast } from "vue-toastification";
export default {
    setup() {
      // Get toast interface
      const toast = useToast();

      return { toast }
    },

    data() {
        return {
            username: '',
            password1: '',
        }
    },
    methods: {
        async login() {
            try {


                var res = await axios.post("http://127.0.0.1:8000/api/auth/login/", { username: this.username, password: this.password1 })
                if (this.username != "" && this.password1 != "") {
                    if (res.status <= 210) {
                        var token = res.data['key']
                        localStorage.setItem('Token', `Token ${token}`)
                        console.log(localStorage.getItem('Token'))
                        await this.$store.dispatch('populateUser')
                        this.$router.push('/')
                    }
                }
            }
            catch {
              this.toast.warning("Enter the correct username or password")
            }

        }

    }
}
</script>


