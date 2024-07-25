import { pinia } from "@/stores/pinia";
import { useUserInfoStore } from "@/stores/user";
import Vue from "vue";
import VueRouter from "vue-router";
import defaultLayout from "../layout/default-layout.vue";

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
      children: [
        {
          path: 'board',
          name: 'Board',
          component: () => import('@/views/board/index.vue'),
          meta: {
            locale: 'menu.board',
            requiresAuth: true,
            order: 1,
          },
          children: [
            {
              path: 'home',
              name: 'Home',
              component: () => import('@/views/board/home/index.vue'),
              meta: {
                locale: 'menu.board.home',
                requiresAuth: true,
              },
            },
            {
              path: 'work',
              name: 'Work',
              component: () => import('@/views/board/work/index.vue'),
              meta: {
                locale: 'menu.board.work',
                requiresAuth: true,
              },
            },
          ],
        },
        {
          path: 'form',
          name: 'Form',
          component: () => import('@/views/form/index.vue'),
          meta: {
            locale: 'menu.form',
            requiresAuth: true,
            order: 3,
          },
          children: [
            {
              path: 'base',
              name: 'Base',
              component: () => import('@/views/form/base/index.vue'),
              meta: {
                locale: 'menu.form.base',
                requiresAuth: true,
              },
            },
            {
              path: 'step',
              name: 'Step',
              component: () => import('@/views/form/step/index.vue'),
              meta: {
                locale: 'menu.form.step',
                requiresAuth: true,
              },
            },
          ],
        }
      ]
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

const userInfo = useUserInfoStore(pinia);
router.beforeEach((to, from, next) => {
  // if (!to.meta?.public && !userInfo.token){
  //   next({
  //     path: '/login'
  //   });
  // }
  next();
})

export default router;
