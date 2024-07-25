import { RoleType } from '@/types/roleType';

export default {
  path: 'result',
  name: 'Result',
  label: 'Result',
  component: () => import('@/views/result/index.vue'),
  meta: {
    id: 'Result',
    locale: 'menu.result',
    requiresAuth: true,
    order: 5,
    roles: [RoleType.admin, RoleType.user],
  },
  children: [
    {
      path: 'success',
      name: 'Success',
      label: 'Success',
      component: () => import('@/views/result/success/index.vue'),
      meta: {
        id: 'Success',
        locale: 'menu.result.success',
        requiresAuth: true,
        roles: [RoleType.admin],
      },
    },
    {
      path: 'error',
      name: 'Error',
      label: 'Error',
      component: () => import('@/views/result/error/index.vue'),
      meta: {
        id: 'Error',
        locale: 'menu.result.error',
        requiresAuth: true,
        roles: [RoleType.admin, RoleType.user],
      },
    },
  ],
};
