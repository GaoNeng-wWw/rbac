import { Inject, HTTPController, HTTPMethod, HTTPMethodEnum, HTTPQuery } from '@eggjs/tegg';
import { HelloService } from '@/service/hello';

@HTTPController({
  path: '/bar',
})
export class Hello {
  @Inject()
  helloService: HelloService;

  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: 'user',
  })
  async user(
    @HTTPQuery({ name: 'userId' }) userId: string,
  ) {
    return await this.helloService.hello(userId);
  }
}
