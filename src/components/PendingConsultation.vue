<template>
    <div class="appointment-card">
        <img src="../assets/3641634.jpg" alt="">
        <div class="doctor-details">
            <small>
                <p class="doctor-name">{{profile['first_name']}}
                    {{profile['last_name']}}</p>
            </small>
            <p class="appointment-date caption">{{formatDate(data['date'])}}</p>


        </div>

        <p v-if="user['is_doctor']" class="start-link" @click="startConsultation">Start</p>


    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import firebase from 'firebase'
import moment from 'moment'
export default {
    props: ['data'],
    computed: {
        ...mapGetters({ user: 'getUser' }),
        profile() {
            return this.user['is_doctor'] ?

                this.$props.data['application']['patient']
                : this.$props.data['application']['doctor']
        },
    },
    methods: {
        formatDate(date) {
            return moment(date).format("MMM Do YY");

        },
        async startConsultation() {
            var res = await this.$axios(`doctors/consultation/${this.$props.data['id']}/start/`)
            if (res.status <= 210) {
                firebase.firestore().collection('messages/').add(
                    {
                        'ticket':this.$props.data['id']
                    }
                )
                this.$router.go(this.$router.currentRoute)
            }
        }
    }

}
</script>