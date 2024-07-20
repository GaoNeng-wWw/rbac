import { PermissionService } from '@/service/permission';
import { Context, EggContext, HTTPBody, HTTPController, HTTPMethod, HTTPMethodEnum, Inject } from '@eggjs/tegg';
import { createPermission, CreatePermission, DeletePermission, updatePermission, UpdatePermission } from 'app/dto';
import { ValidateException } from 'app/utils/ValidateError';

@HTTPController({
  path: '/permission',
})
export class PermissionController {
  @Inject()
  private permissionService: PermissionService;

  @HTTPMethod({
    method: HTTPMethodEnum.POST,
    path: '/',
  })
  create(
    @HTTPBody() body: CreatePermission,
    @Context() ctx: EggContext,
  ) {
    const errors = ctx.app.validator.validate(createPermission, body);
    if (errors) {
      throw new ValidateException(errors[0]);
    }
    return this.permissionService.create(body, ctx);
  }
  @HTTPMethod({
    method: HTTPMethodEnum.PATCH,
    path: '/',
  })
  update(
    @HTTPBody() body: UpdatePermission,
    @Context() ctx: EggContext,
  ) {
    const errors = ctx.app.validator.validate(updatePermission, body);
    if (errors) {
      throw new ValidateException(errors[0]);
    }
    return this.permissionService.updatePermission(body, ctx);
  }
  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: '/',
  })
  find(@Context() ctx: EggContext) {
    return this.permissionService.findPermission(ctx);
  }
  @HTTPMethod({
    method: HTTPMethodEnum.DELETE,
    path: '/',
  })
  del(
    @HTTPBody() data: DeletePermission,
    @Context() ctx: EggContext,
  ) {
    return this.permissionService.delPermission(data, ctx);
  }
}
