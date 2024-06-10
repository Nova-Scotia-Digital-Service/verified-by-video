import * as TD from '../../../types'

const date_format: Intl.DateTimeFormatOptions = {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
}

export const PhotoID = ({ card: { photo_url, description, date } }: { card: TD.IdentificationCard }) => {
  return (
    <div className="flex-shrink-0">
      <div className="h-[26rem] flex justify-stretch items-stretch mb-4">
        {photo_url ? (
          <img src={photo_url} className="bg-slate rounded" />
        ) : (
          <div className="relative w-[18rem] border border-slate rounded flex items-center justify-center text-lg">
            <hr className="absolute text-slate w-[29rem] rotate-[55deg] -z-10" />
            <hr className="absolute text-slate w-[29rem] -rotate-[55deg] -z-10" />
            Non-Photo Card
          </div>
        )}
      </div>
      <div className="text-lg">{description}</div>
      {date && <div className="font-bold">Photo date {date.toLocaleDateString('en-CA', date_format)}</div>}
    </div>
  )
}
