import { VideoData } from '../../../types'

export interface Props {
  video: VideoData
}

const date_format: Intl.DateTimeFormatOptions = {
  month: 'short',
  year: 'numeric',
  day: 'numeric',
}

export const Video: React.FC<Props> = ({ video }) => {
  return (
    <div className="flex flex-col overflow-hidden justify-between border shrink-0 grow-0 rounded-xl w-72 h-96">
      <div className="m-3">Uploaded {video.upload_date.toLocaleDateString('en-CA', date_format)}</div>
      <div className="flex justify-center items-center px-4 py-6 bg-off-white">
        <div className="opacity-100 flex justify-center items-center w-full h-10 rounded-lg bg-slate font-bold">
          Review
        </div>
      </div>
    </div>
  )
}
