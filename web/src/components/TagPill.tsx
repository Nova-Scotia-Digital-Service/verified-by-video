import { stringToHsl } from '../utils/colorHash'

type TagPillProps = {
  text: string
  isActive?: boolean
}

export const TagPill: React.FC<TagPillProps> = ({ text, isActive = true }) => {
  return (
    <div
      style={{
        background: stringToHsl(text, 50, isActive ? 75 : 90),
        outlineColor: stringToHsl(text, 25, 50),
      }}
      className={`inline-block px-2 py-0.5text-sm rounded ${isActive ? 'outline outline-1' : ''}`}
    >
      {text}
    </div>
  )
}
