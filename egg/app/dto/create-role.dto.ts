export const createRole = {
  name: 'string',
  permissionIds: {
    type: 'array',
    itemType: 'int',
  },
  menuIds: {
    type: 'array',
    itemType: 'int',
  },
} as const;

export type CreateRole = {
  name: string;
  permissionIds: number[];
  menuIds: number[];
};
