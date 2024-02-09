import { VideoData } from '../../types'

import { Video } from './components/Video'

export const DashboardPage: React.FC = () => {
  const videos: VideoData[] = [
    { id: 'a', upload_date: new Date(), status: 'Unreviewed' },
    { id: 'b', upload_date: new Date(), status: 'Unreviewed' },
    { id: 'c', upload_date: new Date(), status: 'Unreviewed' },
  ]

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mt-12 mb-8">Videos</h1>

      <div className="flex gap-8 flex-wrap">
        {videos.map((video) => {
          return <Video key={video.id} video={video}></Video>
        })}
      </div>
    </div>
  )
}
