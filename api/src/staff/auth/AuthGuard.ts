import * as TD from '../../types'

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'

import config from '../../config'

import { getUser } from './AuthData'

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token: string = request.headers['authorization']

    try {
      const decodedUser = jwt.verify(token.replace(/^Bearer /, ''), config.JWT_SECRET_KEY) as TD.DBUser
      const user = await getUser(decodedUser.email)
      if (decodedUser.id !== user.id) throw new Error()

      request['user'] = decodedUser
    } catch (error) {
      throw new UnauthorizedException()
    }

    return true
  }
}
