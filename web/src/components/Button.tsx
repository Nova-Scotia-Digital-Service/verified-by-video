import { ButtonHTMLAttributes } from 'react'

export const PrimaryButton = ({
  type,
  disabled = false,
  children,
}: {
  type?: ButtonHTMLAttributes<undefined>['type']
  disabled?: boolean
  children: React.ReactNode
}) => (
  <button
    type={type || 'button'}
    disabled={disabled}
    className={`flex justify-center items-center w-full h-12 mt-8 bg-primary-background rounded-md font-semibold text-lg text-primary-text  ${disabled ? 'opacity-50' : ''}`}
  >
    {children}
  </button>
)

export const SecondaryButton = ({
  type,
  disabled = false,
  children,
}: {
  type?: ButtonHTMLAttributes<undefined>['type']
  disabled?: boolean
  children: React.ReactNode
}) => (
  <button
    type={type || 'button'}
    disabled={disabled}
    className={`flex justify-center items-center w-full h-12 mt-8 bg-background rounded-md font-semibold text-lg text-text border ${disabled ? 'opacity-50' : ''}`}
  >
    {children}
  </button>
)
