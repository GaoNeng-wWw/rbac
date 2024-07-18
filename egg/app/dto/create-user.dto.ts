export default {
  username: 'string',
  email: 'email',
  password: {
    type: 'string',
  },
  roleIds: {
    type: 'array',
    itemType: 'int',
  },
} as const;
