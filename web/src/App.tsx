import { Routes, Route } from 'react-router-dom'

import { paths } from './paths'

import { GlobalHeader } from './components/GlobalHeader'
import { ErrorBoundary } from './components/ErrorBoundary'

import { HomePage } from './pages/HomePage'
import { ReviewListPage } from './pages/reviews/ReviewListPage'
import { ReviewPage } from './pages/reviews/ReviewDetailPage'
import { PageNotFound } from './pages/PageNotFound'
import { TagAdminPage } from './pages/admin/TagAdminPage'

export const App = () => {
  return (
    <>
      <GlobalHeader />
      <ErrorBoundary>
        <Routes>
          <Route path={paths.home.pattern} element={<HomePage />} />

          <Route path={paths.reviewList.pattern} element={<ReviewListPage />} />
          <Route path={paths.reviewDetail.pattern} element={<ReviewPage />} />
          <Route path={paths.tagAdmin.pattern} element={<TagAdminPage />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ErrorBoundary>
    </>
  )
}
