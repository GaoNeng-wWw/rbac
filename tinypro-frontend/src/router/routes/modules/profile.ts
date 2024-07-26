import { RoleType } from '@/types/roleType';

export default {
  path: 'profile',
  name: 'Profile',
  label: 'Profile',
  component: () => import('@/views/profile/index.vue'),
  meta: {
    id: 'Profile',
    locale: 'menu.profile',
    requiresAuth: true,
    order: 4,
    roles: [RoleType.admin],
  },
  children: [
    {
      path: 'detail',
      name: 'Detail',
      label: 'Detail',
      component: () => import('@/views/profile/detail/index.vue'),
      meta: {
        id: 'Detail',
        locale: 'menu.profile.detail',
        requiresAuth: true,
        roles: [RoleType.admin],
      },
    },
  ],
};
