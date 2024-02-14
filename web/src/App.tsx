import { Routes, Route } from 'react-router-dom'

import { GlobalHeader } from './components/GlobalHeader'

import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/auth/LoginPage'
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage'
import { DashboardPage } from './pages/dashboard/index/DashboardPage'
import { ReviewPage } from './pages/dashboard/review/ReviewPage'
import { PageNotFound } from './pages/PageNotFound'

import { paths } from './paths'

function App() {
  return (
    <>
      <GlobalHeader />
      <Routes>
        <Route path={paths.home.pattern} element={<HomePage />} />
        <Route path={paths.login.pattern} element={<LoginPage />} />
        <Route path={paths.forgotPassword.pattern} element={<ForgotPasswordPage />} />
        <Route path={paths.dashboard.pattern} element={<DashboardPage />} />
        <Route path={paths.review.pattern} element={<ReviewPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
