import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: ()=>import('../views/index.vue'),
      meta: {
        public: false
      }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/login/index.vue"),
      meta: {
        public: true,
      },
    },
  ],
});

export const useRouter = () => router

export default router;
