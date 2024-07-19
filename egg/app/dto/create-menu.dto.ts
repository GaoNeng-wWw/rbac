const createMenu = {
  order: 'int',
  menuType: 'string',
  name: 'string',
  path: 'string',
  component: 'string',
  icon: 'string',
  parentId: 'int',
} as const;

export type CreateMenu = {
  order: number;
  menuType: string;
  name: string;
  component: string;
  icon: string;
  parentId: number;
};

export {
  createMenu,
};
