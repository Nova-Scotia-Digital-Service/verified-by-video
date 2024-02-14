import { Routes, Route, Navigate, Outlet } from 'react-router-dom'

import { paths } from './paths'
import { useIsAuthenticated } from './store/slices/auth/authSelector'

import { GlobalHeader } from './components/GlobalHeader'

import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/auth/LoginPage'
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage'
import { DashboardPage } from './pages/dashboard/index/DashboardPage'
import { ReviewPage } from './pages/dashboard/review/ReviewPage'
import { PageNotFound } from './pages/PageNotFound'

const TokenCheck = () => {
  const isAuthenticated = useIsAuthenticated()

  if (!isAuthenticated) return <Navigate to={paths.login({})} />

  return <Outlet />
}

function App() {
  return (
    <>
      <GlobalHeader />
      <Routes>
        <Route path={paths.home.pattern} element={<HomePage />} />

        <Route path={paths.login.pattern} element={<LoginPage />} />
        <Route path={paths.forgotPassword.pattern} element={<ForgotPasswordPage />} />

        <Route path="/" element={<TokenCheck />}>
          <Route path={paths.dashboard.pattern} element={<DashboardPage />} />
          <Route path={paths.review.pattern} element={<ReviewPage />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
