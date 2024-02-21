import { Get, JsonController, Post } from 'routing-controllers'
import { Service } from 'typedi'

import { initialSessionData } from './SessionData'

@JsonController('/session')
@Service()
export class SessionController {
  @Get('/') // TEMPORARY - for development
  @Post('/')
  public async createSession() {
    return initialSessionData
  }
}
