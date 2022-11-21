<template>
  <HomeHeader />

  <main class="home-main">
    <RouterView />
  </main>
</template>

<script>
import HomeHeader from '../components/HomeHeader.vue';
import { mapActions } from 'vuex';
import firebase from 'firebase';
import { useToast } from "vue-toastification";

export default {

  components: {
    HomeHeader
  }
  ,
  data() {
    return {
      
    }
  },
  setup() {
      // Get toast interface
      const toast = useToast();

      return { toast }
    },
  methods: {
    ...mapActions(['populateUser'])
  },

  mounted(){
    var db = firebase.firestore()
    db.collection(`messages/`).orderBy('createdAt').onSnapshot(querySnap => {
        querySnap.docs.map(doc =>{
          console.log(doc)
          this.toast.success(doc)
        })})
  },
  async created() {
    await this.populateUser();
   

  }

}

</script>
<style>
@import url('../styles/home.css');
</style>