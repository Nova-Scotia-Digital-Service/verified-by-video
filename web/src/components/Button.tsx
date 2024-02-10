import { ButtonHTMLAttributes } from 'react'

export const PrimaryButton = ({
  type,
  children,
}: {
  type?: ButtonHTMLAttributes<undefined>['type']
  children: React.ReactNode
}) => (
  <button
    type={type || 'button'}
    className="flex justify-center items-center w-full h-12 mt-8 bg-primary-background rounded-md font-semibold text-lg text-primary-text"
  >
    {children}
  </button>
)

export const SecondaryButton = ({
  type,
  children,
}: {
  type?: ButtonHTMLAttributes<undefined>['type']
  children: React.ReactNode
}) => (
  <button
    type={type || 'button'}
    className="flex justify-center items-center w-full h-12 mt-8 bg-background rounded-md font-semibold text-lg text-text border"
  >
    {children}
  </button>
)
