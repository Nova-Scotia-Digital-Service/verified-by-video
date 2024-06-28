import * as TD from '../../types'

import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { AwaitResponse } from '../../components/AwaitResponse'
import { PrimaryButton, SecondaryButton } from '../../components/Button'
import { HorizontalRule } from '../../components/HorizontalRule'

import { getReviewDetail, postReviewAnswers } from '../../api/ReviewApi'
import { useResponse } from '../../hooks/useResponse'

import { TagCloud } from './components/TagCloud'
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

type FormInputs = {
  [key: string]: string
}

export const ReviewPage: React.FC = () => {
  const navigate = useNavigate()
  const [reviewDetailResponse, setReviewDetailResponse] = useResponse<TD.Review>()

  const { reviewId } = useParams()
  if (!reviewId) throw new Error(`Path parameter not found`)

  useEffect(() => {
    getReviewDetail(reviewId)
      .then((response) => {
        setReviewDetailResponse({ status: 'READY', data: response.data })
      })
      .catch((error) => {
        setReviewDetailResponse({ status: 'ERROR', error: error })
      })
  }, [])

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormInputs>()

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    await postReviewAnswers(reviewId, data)
    navigate(paths.reviewList({}))
  }

  return (
    <div className="container py-12 px-16 w-[68rem]">
      <Link to={paths.reviewList({})} className="flex items-center font-bold text-sm hover:opacity-60">
        <BackArrowIcon className="mr-2 mt-[2px]" />
        Back
      </Link>
      <h2 className="text-4xl font-bold text-title mt-4 mb-16">Verify Identity to set up Mobile card</h2>

      <AwaitResponse response={reviewDetailResponse}>
        {(review) => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between mb-12">
              <div>
                <div className="mb-12">
                  <div className="font-bold text-md">Video Date</div>
                  <div className="font-bold text-2xl mb-2">
                    {review.submission.upload_date.toLocaleDateString('en-CA', DATE_FORMAT)}{' '}
                  </div>

                  <TagCloud reviewId={review.id} tags={review.tags} />
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

            {review.questions.slice(0, 1).map(({ id, question, options }) => (
              <ReviewQuestion
                key={id}
                id={id}
                question={question}
                options={options}
                register={register}
                error={errors[id]}
              />
            ))}

            <div className="flex gap-x-12 mb-12 mx-[-4rem] overflow-x-scroll pb-4">
              {review.identification_cards.map((card) => (
                <PhotoID key={card.id} card={card} />
              ))}
            </div>

            {review.questions.slice(1).map(({ id, question, options }) => (
              <ReviewQuestion
                key={id}
                id={id}
                question={question}
                options={options}
                register={register}
                error={errors[id]}
              />
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

            <div className="flex justify-between">
              <div className="flex gap-4">
                <div className="w-80">
                  <SecondaryButton disabled type="submit">
                    Transfer request to specialist
                  </SecondaryButton>
                </div>
                <div className="w-48">
                  <SecondaryButton disabled type="submit">
                    Close request
                  </SecondaryButton>
                </div>
              </div>
              <div className="w-48">
                <PrimaryButton type="submit">Continue</PrimaryButton>
              </div>
            </div>
          </form>
        )}
      </AwaitResponse>
    </div>
  )
}
