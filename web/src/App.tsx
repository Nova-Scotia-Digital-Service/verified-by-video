import { Routes, Route } from 'react-router-dom'

import { GlobalHeader } from './components/GlobalHeader'

import { PageNotFound } from './pages/PageNotFound'
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { LoginPage } from './pages/login/LoginPage'

function App() {
  return (
    <>
      <GlobalHeader />
      <Routes>
        <Route path={`/`} element={<LoginPage />} />
        <Route path={`/dashboard`} element={<DashboardPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
