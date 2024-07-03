type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

export const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className="mt-2">
      <label className="block text-title font-semibold">{label}</label>
      <input className="w-full shadow-input rounded-md p-3 text-sm text-input-text bg-input-background" {...props} />
    </div>
  )
}
