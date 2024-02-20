import { Get, JsonController } from 'routing-controllers'
import { Service } from 'typedi'

import { videos } from '../content/VideoData'

@JsonController('/videos')
@Service()
export class SubmissionController {
  @Get('/')
  public async postSubmissions() {
    return videos
  }
}
