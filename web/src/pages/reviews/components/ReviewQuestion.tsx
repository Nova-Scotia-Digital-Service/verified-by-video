import { FieldError, FieldValues, UseFormRegister } from 'react-hook-form'

import * as TD from '../../../types'

const RadioOption = ({
  name,
  value,
  register,
  children,
}: {
  name: string
  value: string
  register: any
  children: string
}) => {
  return (
    <label className="flex items-center text-lg mb-2 hover:text-black">
      <input type="radio" value={value} className="size-6 mr-2" {...register(name, { required: true })} />
      {children}
    </label>
  )
}

export const ReviewQuestion = <T extends FieldValues>({
  id: questionId,
  question,
  options,
  register,
  error,
}: TD.ReviewQuestion & { register: UseFormRegister<T>; error: FieldError | undefined }) => (
  <div className="mb-12">
    <div className="flex items-baseline">
      <h3 className="font-bold text-2xl mb-4">{question}</h3>
      {error && (
        <div className="inline-block text-warning-text bg-warning-background border border-warning-border rounded px-2 ml-2">
          Required
        </div>
      )}
    </div>
    {options.map((option) => (
      <RadioOption key={option.id} name={questionId} value={option.id} register={register}>
        {option.text}
      </RadioOption>
    ))}
  </div>
)
