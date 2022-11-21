<template>
    <header class="home-nav">
        <div class="logo">
            <img src="../assets/logo.png" alt="">
            <p>Consult</p>
        </div>
        <div class="nav-links">
            <router-link to="/">
                <p class="nav-link">Home</p>
            </router-link>
            <router-link to="/doctors">
                <p class="nav-link" v-if="!user['is_doctor']">Doctor</p>
            </router-link>
            <router-link to="/consultations">
                <p class="nav-link" v-if="!user['is_superuser']">Consultations</p>
            </router-link>
            <router-link to="/reports" v-if="user['is_superuser']">
                <p class="nav-link">Reports</p>
            </router-link>
        </div>
        <div class="profile-settings">
            <div class="row profile-details">
                <img src="../assets/icons/account.svg" alt="">
                <p v-if="user['profile']">{{user['profile']['first_name']}} {{user['profile']['last_name']}}</p>
                <p v-else>Login</p>
            </div>
            <div class="container" v-if="user['profile']!=null" >
                <router-link to="/profile">
                    <p>My Profile</p>
                </router-link>
                <p @click="signOut">Sign Out</p>
            </div>
        </div>


    </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters({ user: 'getUser' })
    },
    methods: {
        ...mapActions(['signOut'])
    }
}
</script>