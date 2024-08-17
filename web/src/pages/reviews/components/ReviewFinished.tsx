import * as TD from '../../../types'

import { useNavigate } from 'react-router'

import { paths } from '../../../paths'

import { createReview } from '../../../api/ReviewApi'

import { PrimaryButton } from '../../../components/Button'
import { HorizontalRule } from '../../../components/HorizontalRule'
import { PrivacyWarning } from '../../../components/PrivacyWarning'

import { TagCloud } from './TagCloud'
import { PhotoID } from './PhotoID'

type ReviewFinishedProps = {
  review: TD.Review
}

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  month: 'short',
  year: 'numeric',
  day: 'numeric',
}

export const FinishedReviewQuestion = ({ question }: { question: TD.ReviewQuestion }) => (
  <div className="mb-12">
    <div className="flex items-baseline">
      <h3 className="font-bold text-2xl mb-4">{question.question}</h3>
    </div>
    {question.options.map((option) => (
      <label key={option.id} className="flex items-center text-lg mb-2">
        <input type="radio" className="size-6 mr-2" disabled checked={option.selected} />
        {option.text}
      </label>
    ))}
  </div>
)

export const ReviewFinished: React.FC<ReviewFinishedProps> = ({ review }) => {
  const navigate = useNavigate()

  const handleCreateReview = async () => {
    const response = await createReview(review.submission.id)
    navigate(paths.reviewDetail({ reviewId: response.data.id }))
  }

  return (
    <>
      <h3 className="inline-block text-2xl font-bold text-title mb-4 border rounded px-2">{review.status}</h3>

      <div className="flex justify-between mb-12">
        <div>
          <div className="mb-12">
            <div className="font-bold text-md">Video Date</div>
            <div className="font-bold text-2xl mb-2">
              {review.submission.upload_date.toLocaleDateString('en-CA', DATE_FORMAT)}
            </div>

            <TagCloud submissionId={review.submission.id} tags={review.submission.tags} />
          </div>
          <div className="max-w-96">
            <h3 className="font-bold text-2xl mb-4">Prompts the user was provided in the mobile app:</h3>
            <ol className="ml-6 text-lg">
              {review.prompts.map((prompt) => (
                <li key={prompt.id} className="mb-4 pl-2 list-decimal">
                  {prompt.text}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <video controls className="w-[28rem] h-[40rem] rounded-lg">
          <source src={review.submission.video_url} type="video/mp4" />
        </video>
      </div>
      <HorizontalRule />
      <div className="flex flex-col">
        <div className="flex gap-x-12 mb-12 mx-[-4rem] overflow-x-scroll pb-4">
          {review.identification_cards.map((card) => (
            <PhotoID key={card.id} card={card} />
          ))}
        </div>

        {review.questions.map((question) => (
          <FinishedReviewQuestion key={question.id} question={question} />
        ))}
      </div>

      <PrivacyWarning />

      <PrimaryButton onClick={handleCreateReview}>Reopen Review</PrimaryButton>
    </>
  )
}
