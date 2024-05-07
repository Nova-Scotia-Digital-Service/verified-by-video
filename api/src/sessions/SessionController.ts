import { Controller, Post } from '@nestjs/common'

import { initialSessionData } from './SessionData'

@Controller('/session')
export class SessionController {
  @Post('/')
  public async createSession() {
    return initialSessionData
  }
}
