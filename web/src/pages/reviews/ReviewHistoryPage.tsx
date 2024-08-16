import * as TD from '../../types'

import { useEffect } from 'react'

import { paths } from '../../paths'
import { getSubmissionList } from '../../api/SubmissionApi'
import { useResponse } from '../../hooks/useResponse'

import { AwaitResponse } from '../../components/AwaitResponse'
import { StyledLink } from '../../components/StyledLink'

import { TagCloud } from './components/TagCloud'

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  dateStyle: 'full',
  timeStyle: 'short',
}

const Review = ({ review }: { review: TD.APISubmissionSummary['reviews'][number] }) => {
  return (
    <li className="list-disc">
      Reviewed{' '}
      <StyledLink to={paths.reviewDetail({ reviewId: review.id })}>
        {review.created_at.toLocaleString('en-CA', DATE_FORMAT)}
      </StyledLink>{' '}
      by {review.reviewer_name ?? 'Unknown'} - {review.status}
    </li>
  )
}

const Submission = ({ submission }: { submission: TD.APISubmissionSummary }) => {
  return (
    <li className="list-disc mb-4">
      <div>
        Submitted {submission.upload_date.toLocaleString('en-CA', DATE_FORMAT)} - {submission.status}
        <div className="inline-block ml-4">
          <TagCloud submissionId={submission.id} tags={submission.tags} />
        </div>
      </div>
      <ul className="pl-8">
        {submission.reviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </ul>
    </li>
  )
}

export const ReviewHistoryPage: React.FC = () => {
  const [submissionListResponse, setSubmissionListResponse] = useResponse<TD.APISubmissionSummary[]>()

  useEffect(() => {
    getSubmissionList()
      .then((response) => {
        setSubmissionListResponse({ status: 'READY', data: response.data })
      })
      .catch((error) => {
        setSubmissionListResponse({ status: 'ERROR', error: error })
      })
  }, [])

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mt-12 mb-6">Review History</h1>

      <AwaitResponse response={submissionListResponse}>
        {(submissions) => (
          <ul className="pl-8">
            {submissions.map((submission) => (
              <Submission key={submission.id} submission={submission} />
            ))}
          </ul>
        )}
      </AwaitResponse>
    </div>
  )
}
