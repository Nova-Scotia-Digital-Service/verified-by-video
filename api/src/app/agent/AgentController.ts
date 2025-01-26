import * as TD from '../../types'
import { Controller, Get, Post, HttpCode, HttpStatus, Body } from '@nestjs/common'
import { sendDrpcResponse } from '../../utils/traction'
import { createConnectionDetails } from './AgentData'
import { createSession } from '../sessions/SessionData'

@Controller('/topic')
export class AgentController {
  @Post('/ping')
  @Get('/ping')
  @HttpCode(HttpStatus.ACCEPTED) // Set the response code to 202 Accepted
  public async ping(): Promise<void> {
    // console.log('Run POST /topic/ping/')

    return
  }

  @Post('drpc_request')
  @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content
  // These are incoming requests a.k.a RPC calls to us from other agents.
  public async drpcRequest(@Body() body: TD.DrpcSessionRequest): Promise<void> {
    // console.log('Run POST /topic/drpc_request/')

    const { connection_id, thread_id } = body
    const requestId = body.id ?? Math.floor(Math.random() * 1000000)
    const newSession = await createSession()

    await createConnectionDetails(newSession.id, connection_id)

    // Fix the prompts. They are being returned as strings. Probably need to
    // address this in the database.
    const prompts = newSession.prompts.map((dbPrompt: any) => {
      const prompts = JSON.parse(dbPrompt.text)
      return { id: prompts.id, text: prompts.text, type: 'text' as const }
    })

    const result = {
      ...newSession,
      prompts,
      version: '1' as const,
    }

    const response: TD.DrpcResponse = {
      id: requestId,
      jsonrpc: '2.0',
      result,
    }

    await sendDrpcResponse(connection_id, thread_id, response)

    return
  }

  @Post('drpc_response')
  @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content
  // These are incoming responses a.k.a responses to RPC calls we made
  /// to other agents.
  public async drpcResponse(): Promise<void> {
    // console.log('Run POST /topic/drpc_response/')

    return
  }
}
