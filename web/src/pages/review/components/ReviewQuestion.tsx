import * as TD from '../../../types'

const RadioOption = ({ name, children }: { name: string; children: string }) => {
  return (
    <label className="flex items-center text-lg mb-2 hover:text-black">
      <input type="radio" name={name} className="size-6 mr-2" />
      {children}
    </label>
  )
}

export const ReviewQuestion = ({ id, question, options }: TD.ReviewQuestion) => (
  <div className="mb-12">
    <h3 className="font-bold text-2xl mb-4">{question}</h3>
    {options.map((option) => (
      <RadioOption name={id}>{option}</RadioOption>
    ))}
  </div>
)
