import { Get, JsonController } from 'routing-controllers'
import { Service } from 'typedi'

import { reviewQuestions } from '../content/ReviewData'

@JsonController('/reviews')
@Service()
export class SubmissionController {
  @Get('/')
  public async postSubmissions() {
    return reviewQuestions
  }
}
