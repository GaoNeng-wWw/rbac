import { RoleService } from '@/service/role';
import { Context, EggContext, HTTPBody, HTTPController, HTTPMethod, HTTPMethodEnum, HTTPParam, Inject } from '@eggjs/tegg';
import { createRole, CreateRole, deleteRole, DeleteRole, updateRole, UpdateRole } from 'app/dto';
import { ValidateException } from 'app/utils/ValidateError';

@HTTPController({
  path: '/role',
})
export class RoleController {
  @Inject()
  private roleService: RoleService;

  @HTTPMethod({
    method: HTTPMethodEnum.POST,
    path: '',
  })
  create(
    @HTTPBody() body: CreateRole,
    @Context() ctx: EggContext,
  ) {
    const errors = ctx.app.validator.validate(createRole, body);
    if (errors.length) {
      throw new ValidateException(errors[0]);
    }
    return this.roleService.create(body, ctx);
  }
  @HTTPMethod({
    method: HTTPMethodEnum.DELETE,
    path: '',
  })
  del(
    @HTTPBody() body: DeleteRole,
    @Context() ctx: EggContext,
  ) {
    const errors = ctx.app.validator.validate(deleteRole, body);
    if (errors.length) {
      throw new ValidateException(errors[0]);
    }
    return this.roleService.del(body, ctx);
  }

  @HTTPMethod({
    method: HTTPMethodEnum.PATCH,
    path: '',
  })
  update(
    @HTTPBody() body: UpdateRole,
    @Context() ctx: EggContext,
  ) {
    const errors = ctx.app.validator.validate(updateRole, body);
    if (errors.length) {
      throw new ValidateException(errors[0]);
    }
    return this.roleService.update(body, ctx);
  }

  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: '',
  })
  getAll(
    @Context() ctx: EggContext,
  ) {
    return this.roleService.findAll(ctx);
  }
  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: '/info/:id',
  })
  getInfo(
    @HTTPParam({
      name: 'id',
    }) id: string,
    @Context() ctx: EggContext,
  ) {
    return this.roleService.findOne(id, ctx);
  }
}
