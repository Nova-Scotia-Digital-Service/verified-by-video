import * as TD from '../../types'

import { useEffect } from 'react'

import { Link, useParams } from 'react-router-dom'

import { AwaitResponse } from '../../components/AwaitResponse'

import { useResponse } from '../../hooks/useResponse'

import { paths } from '../../paths'

import { getReviewDetail } from '../../api/ReviewApi'

import { ReviewForm } from './components/ReviewForm'
import { ReviewFinished } from './components/ReviewFinished'

import { ReactComponent as BackArrowIcon } from '../../assets/icon-back-arrow.svg'

export const ReviewDetailPage: React.FC = () => {
  const { reviewId } = useParams()
  if (!reviewId) throw new Error(`Path parameter not found`)

  const [reviewDetailResponse, setReviewDetailResponse] = useResponse<TD.Review>()

  useEffect(() => {
    getReviewDetail(reviewId)
      .then((response) => {
        setReviewDetailResponse({ status: 'READY', data: response.data })
      })
      .catch((error) => {
        setReviewDetailResponse({ status: 'ERROR', error: error })
      })
  }, [])

  return (
    <div className="container py-12 px-16 w-[68rem]">
      <Link to={paths.home({})} className="flex items-center font-bold text-sm hover:opacity-60">
        <BackArrowIcon className="mr-2 mt-[2px]" />
        Back
      </Link>
      <h2 className="text-4xl font-bold text-title mt-4 mb-16">Verify Identity to set up Mobile card</h2>

      <AwaitResponse response={reviewDetailResponse}>
        {(review) => (
          <div key={reviewId}>
            {review.status === 'STARTED' ? <ReviewForm review={review} /> : <ReviewFinished review={review} />}
          </div>
        )}
      </AwaitResponse>
    </div>
  )
}
