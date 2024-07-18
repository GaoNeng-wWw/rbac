import createRoleDto from './create-role.dto';
import { partical } from './partial';

export default {
  ...partical(createRoleDto),
  id: 'int',
} as const;
