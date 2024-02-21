import { path } from 'static-path'

export const paths = {
  home: path('/'),
  login: path('/auth/login'),
  forgotPassword: path('/auth/forgot-password'),
  reviewList: path('/reviews'),
  reviewDetail: path('/reviews/:reviewId'),
}
