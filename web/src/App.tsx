import { Routes, Route } from 'react-router-dom'

import { GlobalHeader } from './components/GlobalHeader'

import { PageNotFound } from './pages/PageNotFound'
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { LoginPage } from './pages/login/LoginPage'
import { ReviewPage } from './pages/review/ReviewPage'
import { ForgotPasswordPage } from './pages/login/ForgotPasswordPage'

function App() {
  return (
    <>
      <GlobalHeader />
      <Routes>
        <Route path={`/`} element={<LoginPage />} />
        <Route path={`/forgot-password`} element={<ForgotPasswordPage />} />
        <Route path={`/dashboard`} element={<DashboardPage />} />
        <Route path={`/dashboard/review/:video_id`} element={<ReviewPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
