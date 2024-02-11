import { PrimaryButton, SecondaryButton } from '../../components/Button'
import { HorizontalRule } from '../../components/HorizontalRule'

import { ReviewQuestion } from './components/ReviewQuestion'
import { PhotoID } from './components/PhotoID'

import { ReactComponent as WarningIcon } from '../../assets/icon-warning.svg'

export const ReviewPage: React.FC = () => {
  return (
    <div className="container py-12 px-16 w-[68rem]">
      <a href="/dashboard" className="font-bold text-sm">
        Back
      </a>
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

      <ReviewQuestion
        id="followed-prompts"
        question="Did the user correctly follow the prompts in the video?"
        options={[
          'Yes, all prompts followed by user in the correct order',
          "Didn't follow the prompts correctly",
          'Too low quality video/photo for matching',
          "Couldn't complete for other reason",
        ]}
      />

      <div className="flex gap-x-12 mb-12 mx-[-4rem] overflow-x-scroll pb-4">
        <PhotoID description="Photo on BC Services Card" />
        <PhotoID photo description="Photo from the mobile app" date={new Date()} />
        <PhotoID photo description="Front of BC Driver's License (issued in British Columbia)" date={new Date()} />
        <PhotoID photo description="Back of BC Driver's License (issued in British Columbia)" date={new Date()} />
      </div>

      <ReviewQuestion
        id="provided-name"
        question="What name did they provide?"
        options={[
          'NONPHOTO, PERCY or an acceptable variation',
          "Didn't provide the correct name",
          "Couldn't complete for other reason",
        ]}
      />

      <ReviewQuestion
        id="all-match"
        question="Do all three match: photo on the ID document, video, photo taken in the app?"
        options={[
          'Yes, all match',
          'Not all match',
          'Too low quality video or photo for matching',
          "Couldn't complete for other reason",
        ]}
      />

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

      <form className="flex justify-between" action="/dashboard">
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
