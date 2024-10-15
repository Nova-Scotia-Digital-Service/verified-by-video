import * as TD from '../../../types'

import { Link, useNavigate } from 'react-router-dom'

import { paths } from '../../../paths'
import { createReview } from '../../../api/ReviewApi'

import { TagCloud } from './TagCloud'

type SubmissionCardProps = {
  submission: TD.APISubmissionSummary
}

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  month: 'short',
  year: 'numeric',
  day: 'numeric',
}

export const SubmissionCard: React.FC<SubmissionCardProps> = ({ submission }) => {
  const navigate = useNavigate()

  const handleCreateReview = async () => {
    const response = await createReview(submission.id)
    navigate(paths.reviewDetail({ reviewId: response.data.id }))
  }

  const latestReview = submission.reviews.reduce((latestReview: typeof review | undefined, review) => {
    if (!latestReview || review.created_at > latestReview.created_at) {
      return review
    } else {
      return latestReview
    }
  }, undefined)

  return (
    <div className="flex flex-col overflow-hidden justify-between border border-outline shrink-0 grow-0 rounded-lg w-[19rem] h-[28rem]">
      <div className="m-3">
        <div className="mb-2">
          {latestReview && latestReview.status !== 'STARTED' ? (
            <>Reviewed {latestReview.created_at.toLocaleDateString('en-CA', DATE_FORMAT)}</>
          ) : (
            <>Uploaded {submission.upload_date.toLocaleDateString('en-CA', DATE_FORMAT)}</>
          )}
        </div>
        <TagCloud submissionId={submission.id} tags={submission.tags} />
      </div>
      <div className="flex justify-center items-center h-20 px-4 py-6 bg-off-white">
        {latestReview === undefined ? (
          <button
            type="button"
            onClick={handleCreateReview}
            className="opacity-100 flex justify-center items-center w-full h-10 rounded-md bg-slate font-semibold"
          >
            Review
          </button>
        ) : (
          <Link
            to={paths.reviewDetail({ reviewId: latestReview.id })}
            className="opacity-100 flex justify-center items-center w-full h-10 rounded-md bg-slate font-semibold"
          >
            View
          </Link>
        )}
      </div>
    </div>
  )
}
