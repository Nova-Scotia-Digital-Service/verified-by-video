import { stringToHsl } from '../utils/colorHash'

import { ReactComponent as CloseIcon } from '../assets/icon-close.svg'

type TagPillProps = {
  text: string
  isActive?: boolean
  showCloseIcon?: boolean
}

export const TagPill: React.FC<TagPillProps> = ({ text, isActive = true, showCloseIcon = false }) => {
  return (
    <div
      style={{
        background: stringToHsl(text, 50, isActive ? 75 : 90),
        outlineColor: stringToHsl(text, 25, 50),
      }}
      className={'inline-flex items-center gap-2 px-4 leading-snug rounded-full outline outline-1 font-bold'}
    >
      {text} {showCloseIcon ? <CloseIcon /> : ''}
    </div>
  )
}
