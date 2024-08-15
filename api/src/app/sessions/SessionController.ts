import * as TD from '../../types'

import { Controller, Post } from '@nestjs/common'

import { createSession } from './SessionData'

@Controller('/session')
export class SessionController {
  @Post('/')
  public async createSession(): Promise<TD.Session> {
    const newSession = await createSession()

    return {
      ...newSession,
      prompts: newSession.prompts.map((dbPrompt) => ({ ...dbPrompt, type: 'text' as const })),
      version: '1' as const,
    }
  }
}
