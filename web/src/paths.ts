import { path } from 'static-path'

export const paths = {
  home: path('/'),
  login: path('/auth/login'),
  forgotPassword: path('/auth/forgot-password'),
  dashboard: path('/dashboard'),
  review: path('/dashboard/review/:videoId'),
}
