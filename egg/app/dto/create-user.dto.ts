export const createUser = {
  username: 'string',
  email: 'email',
  password: {
    type: 'string',
  },
  roleIds: {
    type: 'array?',
    itemType: 'int',
    default: [],
  },
} as const;

export type CreateUser = {
  username: string;
  email: string;
  password: string;
  roleIds: number[];
};
