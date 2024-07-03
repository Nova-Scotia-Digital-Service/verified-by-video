type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
}

export const IconButton: React.FC<ButtonProps> = ({ type = 'button', children, ...props }) => (
  <button
    type={type}
    className={`inline-flex justify-center items-center w-6 h-6 border rounded hover:bg-slate`}
    {...props}
  >
    {children}
  </button>
)

export const PrimaryButton: React.FC<ButtonProps> = ({ type = 'button', disabled = false, children, ...props }) => (
  <button
    type={type}
    disabled={disabled}
    className={`flex justify-center items-center w-full h-12 mt-8 bg-primary-background rounded-md font-semibold text-lg text-primary-text  ${disabled ? 'opacity-50' : ''}`}
    {...props}
  >
    {children}
  </button>
)

export const SecondaryButton: React.FC<ButtonProps> = ({ type = 'button', disabled = false, children, ...props }) => (
  <button
    type={type}
    disabled={disabled}
    className={`flex justify-center items-center w-full h-12 mt-8 bg-background rounded-md font-semibold text-lg text-text border ${disabled ? 'opacity-50' : ''}`}
    {...props}
  >
    {children}
  </button>
)
