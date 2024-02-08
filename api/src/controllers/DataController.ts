import { Get, JsonController } from 'routing-controllers'
import { Service } from 'typedi'

import { SomeData } from '../content/SomeData'

@JsonController('/data')
@Service()
export class DataController {
  @Get('/')
  public async stringMissing() {
    return SomeData
  }
}
