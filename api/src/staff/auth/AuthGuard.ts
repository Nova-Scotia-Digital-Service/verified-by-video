import * as TD from '../../types'

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { createRemoteJWKSet, jwtVerify } from 'jose'

import config from '../../config'

import { createOrUpdateUser } from './AuthData'

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const authHeader: string = request.headers['authorization']
    const token = authHeader.replace(/^Bearer /, '')

    try {
      const certsUrl = new URL(`${config.KEYCLOAK_ADDRESS}/realms/verified_by_video/protocol/openid-connect/certs`)
      const jwkSet = createRemoteJWKSet(certsUrl)
      const { payload: decodedToken } = await jwtVerify<TD.DecodedKeycloakToken>(token, jwkSet, {})

      if (!decodedToken.realm_access.roles.includes('reviewer')) {
        throw new Error('User does not have "reviewer" role')
      }

      const user = await createOrUpdateUser(decodedToken)

      request['user'] = user
    } catch (error) {
      console.error(error)
      throw new UnauthorizedException()
    }

    return true
  }
}
