import { CreateMenu, createMenu } from './create-menu.dto';
import { partical } from './partial';

export const updateMenu = {
  ...partical(createMenu),
  id: 'int',
} as const;

export type UpdateMenu = Partial<CreateMenu> & {
  id:number
};
