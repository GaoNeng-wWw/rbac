import createPermission from './create-permission';
import { partical } from './partial';

export default {
  ...partical(createPermission),
  id: 'int',
} as const;
