<template>
    <section class="consultations">
        <section id="current-consultations">
            <h4>Current Appointments</h4>
            <div class="consultations-list">
                <div class="consultation-legends row">
                    <p v-if="!isDoctor">Doctor</p>
                    <p v-else>Patient</p>
                    
                    <p>Phone</p>
                    <p v-if="!isDoctor">Specialization</p>
                    <p>Disease</p>

                </div>
                <ConsultationCard v-for="consultation in consultations" :key="consultation['id']"
                    :data="consultation" />

            </div>
        </section>
        <section id="pending-appointments">
            <h5>Pending Appointments</h5>
            <div class="appointment-list">
                <PendingConsultation v-for='consultation in pending' :key="consultation['id']" :data='consultation'/>
            </div>
        </section>
    </section>
</template>
<script>
import ConsultationCard from '../components/ConsultationCard.vue';
import moment from 'moment'
import PendingConsultation from '../components/PendingConsultation.vue';
export default {
    components: {
    ConsultationCard,
    PendingConsultation
},
    data() {
        return {
            consultations: [],
            completed: [],
            pending:[],
            user: {}
        }
    },
    methods: {
        formatDate(date) {
            return moment(date).format("MMM Do YY");

        },
        async getPendingConsultations() {

            if (this.isDoctor) {
                var res = await this.$axios.get('doctors/schedule')
                if(res.status<=210){
                    this.pending = res.data
                }
            }
            else {
                this.$axios.get("patients/consultation/completed").then((res) => {
                    if (res.status <= 210) {
                        this.completed = res.data;
                        console.log(res.data);
                    }
                })
            }

        },



    },
    computed: {
        isDoctor() {
            return this.user['is_doctor']
        },
    },

    async created() {
        await this.$store.dispatch('populateConsultations')
    },
    async mounted() {
        this.consultations = await this.$store.dispatch('populateConsultations')
        this.user = await this.$store.dispatch('populateUser')
        await this.getPendingConsultations()
    }

}
</script>

<style>
@import url('../styles/consultations.css');
</style>