export const Input = ({
  label,
  placeholder,
  type,
}: {
  label: string
  placeholder?: string
  type?: React.HTMLInputTypeAttribute
}) => {
  return (
    <div className="mt-2">
      <label className="block text-title font-semibold">{label}</label>
      <input
        placeholder={placeholder}
        type={type}
        className="w-full shadow-input rounded-md p-3 text-sm text-input-text bg-input-background"
      />
    </div>
  )
}
