import { path } from 'static-path'

export const paths = {
  home: path('/'),
  submissionList: path('/submissions'),
  reviewHistory: path('/reviews/history'),
  reviewDetail: path('/reviews/:reviewId'),
  tagAdmin: path('/admin/tags'),
}
