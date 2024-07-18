import { partical } from './partial';
import CreateUserDto from './create-user.dto';

export default {
  ...partical(CreateUserDto),
  oldPassword: 'string',
  newPassword: 'string',
} as const;
