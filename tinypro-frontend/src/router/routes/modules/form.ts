import { RoleType } from '@/types/roleType';

export default {
  path: 'form',
  name: 'Form',
  label: 'Form',
  component: () => import('@/views/form/index.vue'),
  meta: {
    id: 'Form',
    locale: 'menu.form',
    requiresAuth: true,
    order: 3,
    roles: [RoleType.admin],
  },
  children: [
    {
      path: 'base',
      name: 'Base',
      label: 'Base',
      component: () => import('@/views/form/base/index.vue'),
      meta: {
        id: 'Base',
        locale: 'menu.form.base',
        requiresAuth: true,
        roles: [RoleType.admin],
      },
    },
    {
      path: 'step',
      name: 'Step',
      label: 'Step',
      component: () => import('@/views/form/step/index.vue'),
      meta: {
        id: 'Step',
        locale: 'menu.form.step',
        requiresAuth: true,
        roles: [RoleType.admin],
      },
    },
  ],
};
