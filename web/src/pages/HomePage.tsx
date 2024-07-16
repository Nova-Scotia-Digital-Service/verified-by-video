import { Navigate } from 'react-router'

import { paths } from '../paths'

export const HomePage = () => <Navigate replace to={paths.reviewList({})} />
