export const Input = ({
  label,
  placeholder,
  required,
  type,
}: {
  label: string
  placeholder?: string
  required?: boolean
  type?: React.HTMLInputTypeAttribute
}) => {
  return (
    <div className="mt-2">
      <label className="block text-title font-semibold">{label}</label>
      <input
        placeholder={placeholder}
        type={type}
        required={required}
        className="w-full shadow-input rounded-md p-3 text-sm text-input-text bg-input-background"
      />
    </div>
  )
}
