import * as TD from '../../../types'

import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { PrimaryButton, SecondaryButton } from '../../../components/Button'
import { HorizontalRule } from '../../../components/HorizontalRule'
import { PrivacyWarning } from '../../../components/PrivacyWarning'

import { finishReview } from '../../../api/ReviewApi'

import { TagCloud } from './TagCloud'
import { ReviewQuestion } from './ReviewQuestion'
import { PhotoID } from './PhotoID'

import { paths } from '../../../paths'

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  month: 'short',
  year: 'numeric',
  day: 'numeric',
}

type ReviewFormProps = {
  review: TD.Review
}

type FormInputs = {
  answers: { [key: string]: string }
  comment: string
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ review }) => {
  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormInputs>()

  const onReject: SubmitHandler<FormInputs> = async (data) => {
    await finishReview(review.id, { status: 'REJECTED', ...data })
    navigate(paths.home({}))
  }

  const onApprove: SubmitHandler<FormInputs> = async (data) => {
    await finishReview(review.id, { status: 'APPROVED', ...data })
    navigate(paths.home({}))
  }

  return (
    <form>
      <div className="flex justify-between mb-12">
        <div>
          <div className="mb-12">
            <div className="font-bold text-md">Video Date</div>
            <div className="font-bold text-2xl mb-2">
              {review.submission.upload_date.toLocaleDateString('en-CA', DATE_FORMAT)}{' '}
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
        <div className="flex gap-x-12 mb-12 mx-[-4rem] overflow-x-scroll pb-4" style={{ order: 1 }}>
          {review.identification_cards.map((card) => (
            <PhotoID key={card.id} card={card} />
          ))}
        </div>

        {review.questions.map((question, index) => (
          <ReviewQuestion
            key={question.id}
            index={index}
            question={question}
            register={register}
            error={errors.answers && errors.answers[question.id]}
          />
        ))}
      </div>

      <PrivacyWarning />

      <HorizontalRule />

      <h3 className="font-bold text-xl mb-4">Comments</h3>

      <textarea className="w-full border border-slate rounded-md" {...register('comment')}></textarea>

      <div className="flex justify-between">
        <div className="flex gap-4">
          <div className="w-80">
            <SecondaryButton disabled type="submit">
              Transfer request to specialist
            </SecondaryButton>
          </div>
          <div className="w-48">
            <SecondaryButton onClick={handleSubmit(onReject)}>Close request</SecondaryButton>
          </div>
        </div>
        <div className="w-48">
          <PrimaryButton type="submit" onClick={handleSubmit(onApprove)}>
            Continue
          </PrimaryButton>
        </div>
      </div>
    </form>
  )
}
