<template>
    <div class="patient-register ">
        <div class="row">
            <h3>Create An Account</h3>
            <p>Have an Account? <router-link to="">Login</router-link>
            </p>
        </div>
        <div class="registration-form box-shadow">

            <div class="form-container">
                <label for="Username">Username</label>
                <input type="text" name="" id="" placeholder="Enter Username" v-model="username">
            </div>
            <div class="form-container">
                <label for="Email">Email Address</label>
                <input type="email" name="" id="" placeholder="Enter your email address" v-model="email">
            </div>
            <div class="form-container">
                <label for="Password">Password</label>
                <input type="password" name="" id="" placeholder="Enter your password" v-model="password1">
            </div>

            <div class="form-container">
                <label for="Password">Confirm Password</label>
                <input type="password" name="" id="" placeholder="Confirm your password" v-model="password2">
            </div>

            <button style="display: block; width: 100%;" @click="signup(false)">Proceed As Patient</button>
            <button style="display: block; width: 100%;" @click="signup(true)">Proceed As Doctor</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
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
            email: '',
            password1: '',
            password2: ''
        }
    },
    computed: {
        isValid() {
            if (this.username != "" & this.email != "" & this.password1 != "" & this.password2 != "") {
                return true;
            }
            else {
                return false;
            }
        }
    },
    methods: {
        async signup(isDoctor) {
            if (this.isValid) {
                var res = await axios.post('http://127.0.0.1:8000/api/auth/register/',
                    { username: this.username, 'email': this.email, 'password1': this.password1, 'password2': this.password2 }).catch(() => {
                        this.toast.warning("An error has occured")
                    })
                if (res.status <= 210) {
                    localStorage.setItem('Token', `Token ${res.data['token']}`)


                    if (!isDoctor) {
                        this.$router.push('patient/')
                    }
                    else {
                        this.$router.push('doctor')
                    }
                }
            }
            else {
                this.toast.warning("Kindly fill all fields")

            }
        }
    }
}
</script>

<style>
label {
    display: block;
    padding: 0.6em 0;
    font-weight: 600;
    font-size: small;
}

input,
select {
    height: 40px;
    padding: 0 0.8em;
    border-radius: 7px;
    border: none;
    width: 100%;
    background-color: rgb(209, 208, 208);
}

.short-input {
    width: 100%;
}

.row .form-container {
    margin-right: 1em;
    margin-top: 1em;
}

/* .form-container {
  
    max-width: 30vw;
} */

input::placeholder {
    color: #2a2a2a;
    font-size: smaller;
}

.box-shadow {
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}

.registration-form {
    padding: 2em 1em;
    border-radius: 10px;
    margin: 1em 0;
}

.patient-register {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 35vw;

}

.patient-register .row {
    align-items: center;
    justify-content: space-between;
    font-size: small;
    font-weight: 600;

}

.patient-register .row a {
    font-size: 1.1em;
    color: #1d9fb9;
    font-weight: bold;
}

a {
    cursor: pointer;
}

.patient-register h3 {
    padding-left: 1em;
}
</style>