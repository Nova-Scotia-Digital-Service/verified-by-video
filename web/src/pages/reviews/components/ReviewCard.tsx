import * as TD from '../../../types'

import { Link } from 'react-router-dom'

import { paths } from '../../../paths'

import { TagCloud } from './TagCloud'

type ReviewCardProps = {
  review: TD.ReviewSummary
}

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  month: 'short',
  year: 'numeric',
  day: 'numeric',
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="flex flex-col overflow-hidden justify-between border shrink-0 grow-0 rounded-xl w-72 h-96">
      <div className="m-3">
        <div className="mb-2">Uploaded {review.submission.upload_date.toLocaleDateString('en-CA', DATE_FORMAT)}</div>
        {review.reviewer && <div className="mb-2">Reviewed by: {review.reviewer.full_name}</div>}
        <TagCloud submissionId={review.submission.id} tags={review.submission.tags} />
      </div>
      <div className="flex justify-center items-center px-4 py-6 bg-off-white">
        <Link
          to={paths.reviewDetail({ reviewId: review.id })}
          className="opacity-100 flex justify-center items-center w-full h-10 rounded-lg bg-slate font-bold"
        >
          Review
        </Link>
      </div>
    </div>
  )
}
