import { Get, JsonController } from 'routing-controllers'
import { Service } from 'typedi'

import { videoReview } from '../content/VideoData'

@JsonController('/reviews')
@Service()
export class SubmissionController {
  @Get('/')
  public async postSubmissions() {
    return videoReview
  }
}
