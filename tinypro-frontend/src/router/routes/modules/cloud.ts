import { RoleType } from '@/types/roleType';

export default {
  path: 'cloud',
  name: 'Cloud',
  label: 'Cloud',
  component: () => import('@/views/cloud/index.vue'),
  meta: {
    id: 'Cloud',
    locale: 'menu.cloud',
    requiresAuth: true,
    order: 8,
    roles: [RoleType.admin, RoleType.user],
  },
  children: [
    {
      path: 'hello',
      name: 'Hello',
      label: 'Hello',
      component: () => import('@/views/cloud/hello/index.vue'),
      meta: {
        id: 'Hello',
        locale: 'menu.cloud.hello',
        requiresAuth: true,
        roles: [RoleType.admin],
      },
    },
    {
      path: 'contracts',
      name: 'Contracts',
      label: 'Contracts',
      component: () => import('@/views/cloud/contracts/index.vue'),
      meta: {
        id: 'Contracts',
        locale: 'menu.cloud.contracts',
        requiresAuth: true,
        roles: [RoleType.admin, RoleType.user],
      },
    },
  ],
};
