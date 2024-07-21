import { MenuService } from '@/service/menu';
import { Context, EggContext, HTTPBody, HTTPController, HTTPMethod, HTTPMethodEnum, Inject } from '@eggjs/tegg';
import { createMenu, CreateMenu, DeleteMenu, UpdateMenu } from 'app/dto';
import { ValidateException } from 'app/utils/ValidateError';

@HTTPController({
  path: '/menu',
})
export class MenuController {
  @Inject()
  private service:MenuService;
  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: '',
  })
  async getMenu(@Context() ctx:EggContext) {
    return this.service.findAll(ctx.request.user, ctx);
  }
  @HTTPMethod({
    method: HTTPMethodEnum.POST,
    path: '',
  })
  async create(
    @HTTPBody() body: CreateMenu,
    @Context() ctx:EggContext,
  ) {
    const [ error ] = ctx.app.validator.validate(createMenu, body);
    if (error) {
      throw new ValidateException(error);
    }
    return this.service.create(body, ctx);
  }
  @HTTPMethod({
    method: HTTPMethodEnum.PATCH,
    path: '',
  })
  async update(
    @HTTPBody() body: UpdateMenu,
    @Context() ctx:EggContext) {
    const [ error ] = ctx.app.validator.validate(createMenu, body);
    if (error) {
      throw new ValidateException(error);
    }
    return this.service.updateMenu(body, ctx);
  }
  @HTTPMethod({
    method: HTTPMethodEnum.DELETE,
    path: '',
  })
  async del(
    @HTTPBody() body: DeleteMenu,
    @Context() ctx:EggContext,
  ) {
    const [ error ] = ctx.app.validator.validate(createMenu, body);
    if (error) {
      throw new ValidateException(error);
    }
    return this.service.deleteMenu(body, ctx);
  }
}
