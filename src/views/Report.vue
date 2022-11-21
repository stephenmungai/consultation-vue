<template>
    <div class="report-view">
        <section id="users-section">

            <h4>Consult User Metrics</h4>

            <div class="cards-view">

                <ReportCard name='Doctors Registered' :quantity='doctors_registered' v-if='doctors_registered'/>

                <ReportCard name='Patients Registered' :quantity='patients_registered' v-if='patients_registered'/>
                <ReportCard name='Consultations Ongoing' :quantity='patients_consult' v-if="patients_consult!=null"/>

            </div>

        </section>
        <section id="specialization-report">
            <h4>Doctor Specialization Metrics</h4>
            <div class="cards-view">
                <ReportCard :name="special['specialization__name']" :quantity="special['count']" v-for="special in specialization" :key="special['specialization']"/>
            </div>
        </section>
        <section id="disease-report">
            <h4>Diagnosed Diseases Metrics</h4>
            <DiseaseChart :labels="labels" :dataset="dataset" v-if="isData"></DiseaseChart>
        </section>
    </div>
</template>

<script>

import ReportCard from '../components/ReportCard.vue';
import DiseaseChart from '../components/DiseaseChart.vue'

export default {
    components: {
        ReportCard,DiseaseChart
    },
    data(){
        return {
            specialization:[],
            doctors_registered:null,
            patients_consult:null,
            patients_registered:null,
            disease:[],
        }
    },

    computed:{
        labels(){
            let diagnosis = []
            this.disease.forEach(e=>{
                diagnosis.push(e['diagnosis'])
            })
            
            return diagnosis
        },
        dataset(){
            let diagnosis = []
            this.disease.forEach(e=>{
                diagnosis.push(e['count'])
            })
            
            return diagnosis

        },
        isData(){
            return this.dataset.length>0?true:false;
        }

    },
    async mounted(){
        var res = await this.$axios.get('doctors/report/')
        let data = res.data
        this.doctors_registered = data['doctors']
        this.patients_registered = data['patients']
        this.patients_consult = data['patients_consult']
        this.specialization = data['specializations']
        this.disease = data['diagnosis']

    }
}
</script>

<style>
@import url('../styles/reports.css');
</style>