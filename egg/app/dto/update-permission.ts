import { CreatePermission, createPermission } from './create-permission';
import { partical } from './partial';

export const updatePermission = {
  ...partical(createPermission),
  id: 'int',
} as const;

export type UpdatePermission = Partial<CreatePermission> & {
  id: number
};
