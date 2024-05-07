import { Controller, Post } from '@nestjs/common'

@Controller('/staff/auth')
export class AuthController {
  @Post('/login')
  public async login() {
    return { token: 'PLACEHOLDER TOKEN' }
  }
}
