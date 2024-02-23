import { JsonController, Post } from 'routing-controllers'
import { Service } from 'typedi'

@JsonController('/staff/auth')
@Service()
export class AuthController {
  @Post('/login')
  public async login() {
    return { token: 'PLACEHOLDER TOKEN' }
  }
}
