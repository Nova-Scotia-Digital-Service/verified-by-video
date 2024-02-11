import { PrimaryButton, SecondaryButton } from '../../components/Button'
import { RadioOption } from './components/RadioOption'

export const ReviewPage: React.FC = () => {
  return (
    <div className="container py-12">
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

      <hr className="mb-12" />

      <div className="mb-12">
        <h3 className="font-bold text-2xl mb-4">Did the user correctly follow the prompts in the video?</h3>
        <RadioOption name="followed-prompts">Yes, all prompts followed by user in the correct order</RadioOption>
        <RadioOption name="followed-prompts">Didn't follow the prompts correctly</RadioOption>
        <RadioOption name="followed-prompts">Too low quality video/photo for matching</RadioOption>
        <RadioOption name="followed-prompts">Couldn't complete for other reason</RadioOption>
      </div>

      <hr className="mb-12" />

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
