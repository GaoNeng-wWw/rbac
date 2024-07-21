export const createPermission = {
  name: 'string',
  desc: 'string',
} as const;

export type CreatePermission = {
  name: string;
  desc: string;
};
