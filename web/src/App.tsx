import { Routes, Route } from 'react-router-dom'

import { PageNotFound } from './pages/PageNotFound'
import { DashboardPage } from './pages/dashboard/DashboardPage'

function App() {
  return (
    <Routes>
      <Route path={`/`} element={<DashboardPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default App
