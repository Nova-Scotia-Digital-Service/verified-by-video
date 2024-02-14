import { Link } from 'react-router-dom'

import { PrimaryButton, SecondaryButton } from '../../../components/Button'
import { HorizontalRule } from '../../../components/HorizontalRule'

import { getReviewQuestions } from '../../../api/getReviewQuestions'

import { ReviewQuestion } from './components/ReviewQuestion'
import { PhotoID } from './components/PhotoID'

import { paths } from '../../../paths'

import { ReactComponent as BackArrowIcon } from '../../../assets/icon-back-arrow.svg'
import { ReactComponent as WarningIcon } from '../../../assets/icon-warning.svg'

export const ReviewPage: React.FC = () => {
  const reviewQuestions = getReviewQuestions()

  return (
    <div className="container py-12 px-16 w-[68rem]">
      <Link to={paths.dashboard({})} className="flex items-center font-bold text-sm hover:opacity-60">
        <BackArrowIcon className="mr-2 mt-[2px]" />
        Back
      </Link>
      <h2 className="text-4xl font-bold text-title mt-4 mb-16">Verify Identity to set up Mobile card</h2>

      <div className="flex justify-between mb-12">
        <div>
          <div className="mb-12">
            <div className="font-bold text-md">Video Date</div>
            <div className="font-bold text-2xl">12 Jan 2024</div>
          </div>
          <div className="max-w-96">
            <h3 className="font-bold text-2xl mb-4">Prompts the user was provided in the mobile app:</h3>
            <ol className="ml-6 text-lg">
              <li className="mb-4 pl-2 list-decimal">Hold up two fingers.</li>
              <li className="mb-4 pl-2 list-decimal">Touch your ear.</li>
              <li className="mb-4 pl-2 list-decimal">Turn your head to the left.</li>
            </ol>
          </div>
        </div>

        <div className="w-[28rem] h-[40rem] bg-slate rounded-lg"></div>
      </div>

      <HorizontalRule />

      {reviewQuestions.slice(0, 1).map(({ id, question, options }) => (
        <ReviewQuestion key={id} id={id} question={question} options={options} />
      ))}

      <div className="flex gap-x-12 mb-12 mx-[-4rem] overflow-x-scroll pb-4">
        <PhotoID description="Photo on BC Services Card" />
        <PhotoID photo description="Photo from the mobile app" date={new Date()} />
        <PhotoID photo description="Front of BC Driver's License (issued in British Columbia)" date={new Date()} />
        <PhotoID photo description="Back of BC Driver's License (issued in British Columbia)" date={new Date()} />
      </div>

      {reviewQuestions.slice(1).map(({ id, question, options }) => (
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

      <form action={paths.dashboard({})} className="flex justify-between">
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
    </div>
  )
}
