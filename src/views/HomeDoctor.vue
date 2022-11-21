<template>
    <Payment v-if="openModal" @close="openModal=false" :doctor="doctor"/>
    <section class="doctor-list" :class="{'blur-content': openModal}">
        <div class="page-title">
            <h1>Search Doctor, Make an Appointment</h1>
            <p class="subtitle">Discover the best doctors near you</p>
        </div>
        <div class="doctors-list">
            <DoctorCard @open='makeAppointment' :data='doctor' v-for="doctor in doctors" :key="doctor['id']" />
        </div>
    </section>
</template>
<script>
import DoctorCard from '../components/DoctorCard.vue';
import Payment from '../components/PaymentModal.vue';

export default {
    components: {
        DoctorCard, Payment
    },
    data() {
        return {
            openModal: false,
            doctors: [],
            doctor:null
        }
    },
    methods:{
        makeAppointment(e){
            this.openModal = true;
            this.doctor = e;

        }
    },
    async mounted() {
        var res = await this.$axios.get('doctors/');
        if (res.status < 210) {
            var data = res.data

            this.doctors = data
        }

    }
}
</script>
<style scoped>
.blur-content {
    filter: blur(1px);
}
</style>