type SeparatorProps = {
  orientation: 'horizontal' | 'vertical'
  className?: string
}

export const Separator: React.FC<SeparatorProps> = ({ orientation, className }) => (
  <div
    className={`${orientation === 'vertical' ? 'border-l h-full' : 'border-b w-full'} ${className ? className : ''}`}
  />
)
