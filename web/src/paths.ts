import { path } from 'static-path'

export const paths = {
  home: path('/'),
  reviewList: path('/reviews'),
  reviewHistory: path('/reviews/history'),
  reviewDetail: path('/reviews/:reviewId'),
  tagAdmin: path('/admin/tags'),
}
