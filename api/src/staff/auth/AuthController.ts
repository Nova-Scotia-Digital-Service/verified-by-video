import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import * as jwt from 'jsonwebtoken'

import config from '../../config'

import { getUser } from './AuthData'

class LoginBodySchema {
  @ApiProperty({ type: 'string' })
  email!: string
}

@Controller('/staff/auth')
export class AuthController {
  @Post('/login')
  public async login(@Body() { email }: LoginBodySchema) {
    const user = await getUser(email)

    if (user === undefined) {
      throw new UnauthorizedException()
    }

    // TODO: validate with keycloak authority here

    const token = jwt.sign(user, config.JWT_SECRET_KEY)

    return { token }
  }
}
