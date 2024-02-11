const date_format: Intl.DateTimeFormatOptions = {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
}

export const PhotoID = ({ photo, description, date }: { photo?: boolean; description: string; date?: Date }) => {
  return (
    <div className="w-[18rem] flex-shrink-0">
      <div className="h-[26rem] w-[18rem] flex justify-stretch items-stretch mb-4">
        {photo ? (
          <div className="flex-grow bg-slate rounded"></div>
        ) : (
          <div className="flex-grow border border-slate rounded flex items-center justify-center text-lg">
            Non-Photo Card
          </div>
        )}
      </div>
      <div className="text-lg">{description}</div>
      {date && <div className="font-bold">Photo date {date.toLocaleDateString('en-CA', date_format)}</div>}
    </div>
  )
}
