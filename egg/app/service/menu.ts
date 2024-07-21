import { AccessLevel, EggContext, SingletonProto } from '@eggjs/tegg';
import { CreateMenu, DeleteMenu, UpdateMenu } from 'app/dto';
import { Menu, User } from 'app/models';

export interface ITreeNodeData {
  // node-key='id' 设置节点的唯一标识
  id: number | string;
  // 节点显示文本
  label: string;
  // 子节点
  children?: ITreeNodeData[];
  // 链接
  url: string;
  // 组件
  component: string;
}

interface MenuMap {
  [key: number]: Menu;
}

const toNode = (menu: Menu): ITreeNodeData => {
  return {
    label: menu.name,
    id: menu.id,
    children: [],
    url: menu.path,
    component: menu.component,
  };
};

export const convertToTree = (
  menus: Menu[],
  parentId: number | null = null,
) => {
  const tree: ITreeNodeData[] = [];
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i];
    if (menu.parentId === parentId) {
      const children = convertToTree(menus, menu.id);
      const node = toNode(menu);
      node.children = children;
      tree.push(node);
    }
  }
  return tree;
};

@SingletonProto({
  accessLevel: AccessLevel.PUBLIC,
})
export class MenuService {
  async findAll(
    user: {email: string},
    ctx: EggContext,
  ) {
    const userRep = ctx.app.db.getRepository(User);
    const userInfo = await userRep.createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('role.menus', 'menus')
      .where({
        email: user.email,
      })
      .orderBy('menus.order', 'ASC')
      .getOne();
    const menus = userInfo?.role.flatMap(role => role.menus);
    const maps:MenuMap = {};
    menus?.forEach(menu => {
      maps[menu.id] = menu;
    });
    if (!menus) {
      return [];
    }
    return convertToTree(menus);
  }
  async create(data: CreateMenu, ctx: EggContext) {
    const {
      order,
      menuType,
      name,
      path,
      component,
      icon,
      parentId = null,
    } = data;
    const menuRepo = ctx.app.db.getRepository(Menu);
    const menu = menuRepo.create();
    menu.name = name;
    menu.path = path;
    menu.component = component;
    menu.parentId = parentId;
    menu.menuType = menuType;
    menu.icon = icon;
    menu.order = order;
    return menuRepo.save(menu);
  }
  async updateMenu(
    data: UpdateMenu,
    ctx: EggContext,
  ) {
    const menuRepo = ctx.app.db.getRepository(Menu);
    await menuRepo.update(data.id, {
      name: data.name,
      path: data.path,
      component: data.component,
      parentId: data.parentId,
      menuType: data.menuType,
      icon: data.icon,
      order: data.order,
    });
    return true;
  }

  async deleteMenu(
    data: DeleteMenu,
    ctx: EggContext,
  ) {
    const menuRepo = ctx.app.db.getRepository(Menu);
    const menu = await menuRepo.findOne({
      where: {
        id: data.id,
        name: data.name,
      },
    });
    if (!menu) {
      return;
    }
    return menuRepo.remove([ menu ]);
  }
}
