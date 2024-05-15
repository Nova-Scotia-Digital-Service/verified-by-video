import * as TD from '../types'

import { Controller, Post } from '@nestjs/common'

import { insertSession, prompts as defaultPrompts } from './SessionData'

@Controller('/session')
export class SessionController {
  @Post('/')
  public async createSession(): Promise<TD.Session> {
    const newSession = await insertSession()

    return {
      ...newSession,
      version: '1' as const,
      prompts: defaultPrompts,
    }
  }
}
