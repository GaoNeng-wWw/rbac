import { RoleType } from '@/types/roleType';

export default {
  path: 'list',
  name: 'List',
  label: 'List',
  component: () => import('@/views/list/index.vue'),
  meta: {
    id: 'List',
    locale: 'menu.list',
    requiresAuth: true,
    order: 2,
    roles: [RoleType.admin, RoleType.user],
  },
  children: [
    {
      path: 'table', // The midline path complies with SEO specifications
      name: 'Table',
      label: 'Table',
      component: () => import('@/views/list/search-table/index.vue'),
      meta: {
        id: 'Table',
        locale: 'menu.list.searchTable',
        requiresAuth: true,
        roles: [RoleType.admin, RoleType.user],
      },
    },
  ],
};
