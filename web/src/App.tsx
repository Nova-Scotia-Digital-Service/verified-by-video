import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'

import { paths } from './paths'
import { useIsAuthenticated } from './store/slices/auth/authSelectors'

import { GlobalHeader } from './components/GlobalHeader'
import { ErrorBoundary } from './components/ErrorBoundary'

import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/auth/LoginPage'
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage'
import { ReviewListPage } from './pages/reviews/ReviewListPage'
import { ReviewPage } from './pages/reviews/ReviewDetailPage'
import { PageNotFound } from './pages/PageNotFound'

const AuthenticationRequired = () => {
  const isAuthenticated = useIsAuthenticated()
  const location = useLocation()
  const next = `next=${location.pathname}`

  return isAuthenticated ? <Outlet /> : <Navigate to={{ pathname: paths.login({}), ...(next && { search: next }) }} />
}

function App() {
  return (
    <>
      <GlobalHeader />
      <ErrorBoundary>
        <Routes>
          <Route path={paths.home.pattern} element={<HomePage />} />

          <Route path={paths.login.pattern} element={<LoginPage />} />
          <Route path={paths.forgotPassword.pattern} element={<ForgotPasswordPage />} />

          <Route element={<AuthenticationRequired />}>
            <Route path={paths.reviewList.pattern} element={<ReviewListPage />} />
            <Route path={paths.reviewDetail.pattern} element={<ReviewPage />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ErrorBoundary>
    </>
  )
}

export default App
