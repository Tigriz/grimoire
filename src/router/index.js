import Vue from "vue";
import VueRouter from "vue-router";
import Navbar from "../views/Navbar.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    components: {
      navbar: Navbar,
      default: ()=>import('../views/Home.vue'),
    },
  },
  {
    path: "/equipe",
    name: "Team",
    components: {
      navbar: Navbar,
      default: ()=>import('../views/Team.vue'),
    },
  },
  {
    path: "/grimoire",
    name: "Grimoire",
    components: {
      navbar: Navbar,
      default: ()=>import('../views/Grimoire.vue'),
    },
  },
  {
    path: "/festivites",
    name: "Festivités",
    components: {
      navbar: Navbar,
      default: ()=>import('../views/Calendar.vue'),
    },
  },
  {
    path: "/404",
    name: "Erreur",
    components: {
      navbar: Navbar,
      default: ()=>import('../views/NotFound.vue'),
    },
  },
  {
    path: "*",
    redirect: "/404",
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
