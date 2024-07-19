import { partical } from './partial';
import { CreateUser, createUser } from './create-user.dto';

export const updateUser = {
  ...partical(createUser),
  oldPassword: 'string',
  newPassword: 'string',
} as const;

export type UpdateUser = Partial<CreateUser> & {
  oldPassword: string;
  newPassword: string;
};
