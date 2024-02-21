import * as TD from '../../types'

import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

import { AwaitResponse } from '../../components/AwaitResponse'
import { PrimaryButton, SecondaryButton } from '../../components/Button'
import { HorizontalRule } from '../../components/HorizontalRule'

import { getReviewQuestions } from '../../api/ReviewApi'
import { useResponse } from '../../hooks/useResponse'

import { ReviewQuestion } from './components/ReviewQuestion'
import { PhotoID } from './components/PhotoID'

import { paths } from '../../paths'

import { ReactComponent as BackArrowIcon } from '../../assets/icon-back-arrow.svg'
import { ReactComponent as WarningIcon } from '../../assets/icon-warning.svg'

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  month: 'short',
  year: 'numeric',
  day: 'numeric',
}

export const ReviewPage: React.FC = () => {
  const navigate = useNavigate()
  const [reviewResponse, setReviewResponse] = useResponse<TD.VideoReview>()

  const { reviewId } = useParams()
  if (!reviewId) throw new Error(`Path parameter not found`)

  useEffect(() => {
    getReviewQuestions(reviewId)
      .then((response) => {
        setReviewResponse({ status: 'READY', data: response.data })
      })
      .catch((error) => {
        setReviewResponse({ status: 'ERROR', error: error })
      })
  }, [])

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault()
    navigate(paths.reviewList({}))
  }

  return (
    <div className="container py-12 px-16 w-[68rem]">
      <Link to={paths.reviewList({})} className="flex items-center font-bold text-sm hover:opacity-60">
        <BackArrowIcon className="mr-2 mt-[2px]" />
        Back
      </Link>
      <h2 className="text-4xl font-bold text-title mt-4 mb-16">Verify Identity to set up Mobile card</h2>

      <AwaitResponse response={reviewResponse}>
        {(videoReview) => (
          <>
            <div className="flex justify-between mb-12">
              <div>
                <div className="mb-12">
                  <div className="font-bold text-md">Video Date</div>
                  <div className="font-bold text-2xl">
                    {videoReview.video.upload_date.toLocaleDateString('en-CA', DATE_FORMAT)}{' '}
                  </div>
                </div>
                <div className="max-w-96">
                  <h3 className="font-bold text-2xl mb-4">Prompts the user was provided in the mobile app:</h3>
                  <ol className="ml-6 text-lg">
                    {videoReview.video.prompts.map((prompt) => (
                      <li className="mb-4 pl-2 list-decimal">{prompt.text}</li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="w-[28rem] h-[40rem] bg-slate rounded-lg"></div>
            </div>

            <HorizontalRule />

            {videoReview.questions.slice(0, 1).map(({ id, question, options }) => (
              <ReviewQuestion key={id} id={id} question={question} options={options} />
            ))}

            <div className="flex gap-x-12 mb-12 mx-[-4rem] overflow-x-scroll pb-4">
              {videoReview.identification_cards.map((card) => (
                <PhotoID card={card} />
              ))}
            </div>

            {videoReview.questions.slice(1).map(({ id, question, options }) => (
              <ReviewQuestion key={id} id={id} question={question} options={options} />
            ))}

            <div className="flex items-start mb-12 p-4 rounded-lg border border-warning-border text-lg text-warning-text bg-warning-background">
              <WarningIcon className="mr-4" />
              <div>
                <h2 className="font-bold mb-4 leading-none">Important</h2>
                <div>
                  This screen contains personal information and should not be printed or captured, except when reporting
                  suspicious activity.
                </div>
              </div>
            </div>

            <HorizontalRule />

            <form onSubmit={handleSubmit} className="flex justify-between">
              <div className="flex gap-4">
                <div className="w-80">
                  <SecondaryButton type="submit">Transfer request to specialist</SecondaryButton>
                </div>
                <div className="w-48">
                  <SecondaryButton type="submit">Close request</SecondaryButton>
                </div>
              </div>
              <div className="w-48">
                <PrimaryButton type="submit">Continue</PrimaryButton>
              </div>
            </form>
          </>
        )}
      </AwaitResponse>
    </div>
  )
}
