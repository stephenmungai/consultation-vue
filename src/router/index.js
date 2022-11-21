import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Authentication from "../views/Authentication.vue";
import AuthPatient from "../components/Auth/AuthPatient.vue";
import AuthPatientProfile from "../components/Auth/AuthPatientProfile.vue";
import AuthLogin from "../components/Auth/AuthLogin.vue";
import Consultations from "../views/HomeConsultation.vue";
import HomeDoctors from "../views/HomeDoctor.vue";
import Consultation from "../views/Consultation.vue";
import Payment from "../views/Payment.vue";
import NotFoundPage from "../views/404.vue";
import ProfilePage from "../views/ProfileSettings.vue";
import AuthDoctor from "../components/Auth/AuthDoctor.vue";
import Prescription from "../views/Prescription.vue";
import Report from "../views/Report.vue";
import HomePage from '../views/HomePage.vue'
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/consultations",
        name: "Consultations",
        component: Consultations,
        children: [],
      },

      {
        path: "/",
        name: "Homepage",
        component: HomePage,
      },
      {
        path: "/doctors",
        name: "Doctors",
        component: HomeDoctors,
      },
      {
        path: "/profile",
        name: "profile-page",
        component: ProfilePage,
      },
      {
        path: '/reports',
        name:"reports",
        component:Report
      },
      {
        path: "/prescription/:id",
        name: "prescription",
        component: Prescription,
        props:true
      },
    ],
  },
  {
    path: "/consultations/:id",
    name: "Consultation",
    component: Consultation,
  },
  {
    path: "/payment/confirmation/:id",
    name: "payment-confirmation",
    component: Payment,
  },

  {
    path: "/auth",
    name: "Auth",
    component: Authentication,
    children: [
      {
        path: "register/",
        name: "patient-auth",
        component: AuthPatient,
      },
      {
        path: "patient/",
        name: "patient-auth-profile",
        component: AuthPatientProfile,
      },
      {
        path: "doctor/",
        name: "doctor-auth-profile",
        component: AuthDoctor,
      },
      {
        path: "",
        name: "auth-home",
        component: AuthLogin,
      },
    ],
  },
  { path: "/:catchAll(.*)", component: NotFoundPage },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
