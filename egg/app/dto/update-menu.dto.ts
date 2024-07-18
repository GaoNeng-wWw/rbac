import createMenuDto from './create-menu.dto';
import { partical } from './partial';

export default {
  ...partical(createMenuDto),
  id: 'int',
} as const;
