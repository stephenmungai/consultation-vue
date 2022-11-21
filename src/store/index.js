import { createStore } from "vuex";
import router from "../router/index";
import axios from "axios";
import firebase from 'firebase';
import { useToast } from 'vue-toastification'

const toast = useToast()
export default createStore({
  state: {
    user: {},
    profile: {},
    consultations: [],
    payment_doctor:{},
    payment_message:{}
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setProfile(state, profile) {
      state.profile = profile;
    },
    deleteUser(state) {
      state.user = {};
    },
    setConsultations(state, consultations) {
      state.consultations = consultations;
    },
    
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getProfile(state) {
      return state.profile;
    },
    getConsultations(state) {
      return state.consultations;
    },
  },
  actions: {
    async populateUser({ commit }) {
      var token = localStorage.getItem("Token");
      if (token != null) {
        var response = await axios.get("http://127.0.0.1:8000/api/auth/me/", {
          headers: { Authorization: token },
        });
        if (response.status <= 210) {
          commit("setUser", response.data);
        }
        return response.data;
      } else {
        router.push("auth/");
      }
      return Promise.resolve();
    },
    async signOut({ commit }) {
      var token = localStorage.getItem("Token");

      await axios.post(
        "http://127.0.0.1:8000/api/auth/logout/",
        {
          headers: { Authorization: token },
        }
      );
      localStorage.removeItem("Token");
      commit("deleteUser");
      router.push('/auth')
    },
    async populateConsultations({ commit, state,dispatch }) {
      var token = localStorage.getItem("Token");
      await dispatch('populateUser');
      var res;
      if (state.user["is_doctor"] == true) {
        res = await axios.get(
          "http://127.0.0.1:8000/api/doctors/consultation",
          {
            headers: { Authorization: token },
          }
        );
        if (res.status <= 210) {
          commit("setConsultations", res.data);
        }
      } else if (state.user["is_doctor"] == false) {
        res = await axios.get("http://127.0.0.1:8000/api/patients/consultation", {
          headers: { Authorization: token },
        });
        if (res.status <= 210) {
          commit("setConsultations", res.data);
        }
      }
      return res.data
    },

    async listenFirebase(){

      var db =firebase.firestore();
      db.collection(`messages/`).orderBy('createdAt').onSnapshot(querySnap => {
        console.log(querySnap)
        querySnap.docs.map(doc =>{
          toast.success(doc)
        })})
    

    }
  },
  modules: {},
});
