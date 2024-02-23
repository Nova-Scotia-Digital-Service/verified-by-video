import { JsonController, Post } from 'routing-controllers'
import { Service } from 'typedi'

import { initialSessionData } from './SessionData'

@JsonController('/session')
@Service()
export class SessionController {
  @Post('/')
  public async createSession() {
    return initialSessionData
  }
}
