import { RoleType } from '@/types/roleType';

export default {
  path: 'user',
  name: 'User',
  label: 'User',
  component: () => import('@/views/user/index.vue'),
  meta: {
    id: 'User',
    locale: 'menu.user',
    requiresAuth: true,
    order: 7,
    roles: [RoleType.admin, RoleType.user],
  },
  children: [
    {
      path: 'info',
      name: 'Info',
      label: 'Info',
      component: () => import('@/views/user/info/index.vue'),
      meta: {
        id: 'Info',
        locale: 'menu.user.info',
        requiresAuth: true,
        roles: [RoleType.admin, RoleType.user],
      },
    },
    {
      path: 'setting',
      name: 'Setting',
      label: 'Setting',
      component: () => import('@/views/user/setting/index.vue'),
      meta: {
        id: 'Setting',
        locale: 'menu.user.setting',
        requiresAuth: true,
        roles: [RoleType.admin, RoleType.user],
      },
    },
  ],
};
