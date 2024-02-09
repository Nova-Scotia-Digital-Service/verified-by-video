import { Get, JsonController, NotFoundError, Param } from 'routing-controllers'
import { Service } from 'typedi'

@JsonController('/echo')
@Service()
export class EchoController {
  @Get('/:echoString')
  public async echoString(@Param('echoString') echoString: string) {
    return echoString
  }

  @Get('/')
  public async stringMissing() {
    throw new NotFoundError(`Need a string to echo!`)
  }
}
