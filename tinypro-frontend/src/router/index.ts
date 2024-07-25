import { pinia } from "@/stores/pinia";
import { useUserInfoStore } from "@/stores/user";
import Vue from "vue";
import VueRouter from "vue-router";
import defaultLayout from "../layout/default-layout.vue";
import appRoutes from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'root',
      component: defaultLayout,
      meta: {
        public: false
      },
      children: appRoutes,
    }
  ],
});



export const useRouter = () => router
export const useRoute = () => appRoutes;

router.beforeEach((to, from, next) => {
  // if (!to.meta?.public && !userInfo.token){
  //   next({
  //     path: '/login'
  //   });
  // }
  next();
})

export default router;
