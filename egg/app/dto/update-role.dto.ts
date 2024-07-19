import { CreateRole, createRole } from './create-role.dto';
import { partical } from './partial';

export const updateRole = {
  ...partical(createRole),
  id: 'int',
} as const;

export type UpdateRole = {
  id:number
} & Partial<CreateRole>;
