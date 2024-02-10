export const RadioOption = ({ name, children }: { name: string; children: string }) => {
  return (
    <label className="flex items-center text-lg mb-2">
      <input type="radio" name={name} className="size-6 mr-2" />
      {children}
    </label>
  )
}
