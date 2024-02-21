export const TabButton = ({
  active,
  onClick,
  children,
}: {
  active?: boolean
  onClick: () => void
  children: string
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-lg font-bold ${active ? 'border-b-2' : 'opacity-50'} hover:border-b-2`}
    >
      {children}
    </button>
  )
}
