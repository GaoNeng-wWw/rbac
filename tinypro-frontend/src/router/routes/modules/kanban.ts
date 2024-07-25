import { RoleType } from '@/types/roleType';

export default {
  path: 'board',
  name: 'Board',
  label: 'Board',
  component: () => import('@/views/board/index.vue'),
  meta: {
    id: 'Board',
    locale: 'menu.board',
    requiresAuth: true,
    order: 1,
    roles: [RoleType.admin],
  },
  children: [
    {
      path: 'home',
      name: 'Home',
      label: 'Home',
      component: () => import('@/views/board/home/index.vue'),
      meta: {
        id: 'Home',
        locale: 'menu.board.home',
        requiresAuth: true,
        roles: [RoleType.admin],
      },
    },
    {
      path: 'work',
      name: 'Work',
      label: 'Work',
      component: () => import('@/views/board/work/index.vue'),
      meta: {
        id: 'Work',
        locale: 'menu.board.work',
        requiresAuth: true,
        roles: [RoleType.admin],
      },
    },
  ],
};
