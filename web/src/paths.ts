import { path } from 'static-path'

export const paths = {
  home: path('/'),
  reviewList: path('/reviews'),
  reviewDetail: path('/reviews/:reviewId'),
  tagAdmin: path('/admin/tags'),
}
