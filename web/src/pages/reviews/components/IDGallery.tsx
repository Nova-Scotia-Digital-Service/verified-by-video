import * as TD from '../../../types'

import './IDGallery.css'

const date_format: Intl.DateTimeFormatOptions = {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
}

export const IDGallery = ({
  identification_cards,
  order = 0,
}: {
  identification_cards: TD.IdentificationCard[]
  order?: number
}) => {
  return (
    <div className="IDGallery flex gap-x-12 mb-12 mx-[-6rem] overflow-x-scroll pb-4" style={{ order: order }}>
      {identification_cards.map((card) => (
        <PhotoID key={card.id} card={card} />
      ))}
    </div>
  )
}

const PhotoID = ({ card: { photo_url, description, upload_date } }: { card: TD.IdentificationCard }) => {
  return (
    <div className="flex-shrink-0 -z-10">
      <div className="h-[26rem] mb-4">
        {photo_url ? (
          <img src={photo_url} className="bg-slate rounded h-full" />
        ) : (
          <div className="relative h-full w-[18rem] border border-slate rounded flex items-center justify-center text-lg">
            <hr className="absolute text-slate w-[29rem] rotate-[55deg] -z-10" />
            <hr className="absolute text-slate w-[29rem] -rotate-[55deg] -z-10" />
            Non-Photo Card
          </div>
        )}
      </div>
      <div className="text-lg">{description}</div>
      {upload_date && (
        <div className="font-bold">Upload date {upload_date.toLocaleDateString('en-CA', date_format)}</div>
      )}
    </div>
  )
}
