import { AuthService } from '@/service/auth';
import { Context, EggContext, HTTPBody, HTTPController, HTTPMethod, HTTPMethodEnum, Inject } from '@eggjs/tegg';
import { createAuth, CreateAuth, Logout } from 'app/dto';
import { ValidateException } from 'app/utils/ValidateError';

@HTTPController({
  path: '/auth',
})
export class AuthController {
  @Inject()
  private authService: AuthService;

  @HTTPMethod({
    method: HTTPMethodEnum.POST,
    path: 'login',
  })
  async login(
    @HTTPBody() body: CreateAuth,
    @Context() ctx:EggContext,
  ) {
    const errors = ctx.app.validator.validate(createAuth, body);
    if (errors) {
      throw new ValidateException(errors[0]);
    }
    return this.authService.login(body, ctx);
  }

  @HTTPMethod({
    method: HTTPMethodEnum.POST,
    path: 'logout',
  })
  async logout(
    @HTTPBody() body: Logout,
  ) {
    return this.authService.logout(body.email);
  }
}
