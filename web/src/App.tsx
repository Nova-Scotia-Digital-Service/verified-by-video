import { Routes, Route } from 'react-router-dom'

import { paths } from './paths'

import { GlobalHeader } from './components/GlobalHeader'
import { ErrorBoundary } from './components/ErrorBoundary'

import { HomePage } from './pages/HomePage'
import { SubmissionListPage } from './pages/reviews/SubmissionListPage'
import { ReviewHistoryPage } from './pages/reviews/ReviewHistoryPage'
import { ReviewDetailPage } from './pages/reviews/ReviewDetailPage'
import { PageNotFound } from './pages/PageNotFound'
import { TagAdminPage } from './pages/admin/TagAdminPage'

export const App = () => {
  return (
    <>
      <GlobalHeader />
      <ErrorBoundary>
        <Routes>
          <Route path={paths.home.pattern} element={<HomePage />} />
          <Route path={paths.submissionList.pattern} element={<SubmissionListPage />} />
          <Route path={paths.reviewHistory.pattern} element={<ReviewHistoryPage />} />
          <Route path={paths.reviewDetail.pattern} element={<ReviewDetailPage />} />
          <Route path={paths.tagAdmin.pattern} element={<TagAdminPage />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ErrorBoundary>
    </>
  )
}
