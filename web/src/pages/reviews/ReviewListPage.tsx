import * as TD from '../../types'

import { useEffect, useState } from 'react'

import { getReviewList } from '../../api/ReviewApi'
import { useResponse } from '../../hooks/useResponse'

import { ReviewCard } from './components/ReviewCard'
import { TabButton } from './components/TabButton'
import { AwaitResponse } from '../../components/AwaitResponse'

export const ReviewListPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<TD.ReviewStatus>('PENDING')
  const [reviewListResponse, setReviewListResponse] = useResponse<TD.ReviewList>()

  useEffect(() => {
    getReviewList()
      .then((response) => {
        setReviewListResponse({ status: 'READY', data: response.data })
      })
      .catch((error) => {
        setReviewListResponse({ status: 'ERROR', error: error })
      })
  }, [])

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mt-12 mb-6">Videos</h1>

      <div className="flex gap-3 mb-6">
        <TabButton onClick={() => setStatusFilter('PENDING')} active={statusFilter === 'PENDING'}>
          Uploaded
        </TabButton>
        <TabButton onClick={() => setStatusFilter('APPROVED')} active={statusFilter === 'APPROVED'}>
          Approved
        </TabButton>
        <TabButton onClick={() => setStatusFilter('DENIED')} active={statusFilter === 'DENIED'}>
          Denied
        </TabButton>
      </div>

      <AwaitResponse response={reviewListResponse}>
        {(reviews) => (
          <div className="flex gap-8 flex-wrap">
            {reviews
              .filter((review) => review.status === statusFilter)
              .map((review) => {
                return <ReviewCard key={review.id} review={review} />
              })}
          </div>
        )}
      </AwaitResponse>
    </div>
  )
}
