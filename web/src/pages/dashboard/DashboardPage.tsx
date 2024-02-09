import { useState } from 'react'

import { ReviewStatus, VideoData } from '../../types'

import { VideoCard } from './components/VideoCard'

const randomDate = () => new Date(1500000000000 + Math.random() * 250000000000)

const videos: VideoData[] = [
  { id: 'a', upload_date: randomDate(), status: 'Unreviewed' },
  { id: 'b', upload_date: randomDate(), status: 'Unreviewed' },
  { id: 'c', upload_date: randomDate(), status: 'Unreviewed' },
  { id: 'd', upload_date: randomDate(), status: 'Approved' },
  { id: 'e', upload_date: randomDate(), status: 'Approved' },
  { id: 'f', upload_date: randomDate(), status: 'Denied' },
]

const TabButton = ({ active, onClick, children }: { active?: boolean; onClick: () => void; children: string }) => {
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

export const DashboardPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<ReviewStatus>('Unreviewed')

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mt-12 mb-6">Videos</h1>

      <div className="flex gap-3 mb-6">
        <TabButton onClick={() => setStatusFilter('Unreviewed')} active={statusFilter === 'Unreviewed'}>
          Uploaded
        </TabButton>
        <TabButton onClick={() => setStatusFilter('Approved')} active={statusFilter === 'Approved'}>
          Approved
        </TabButton>
        <TabButton onClick={() => setStatusFilter('Denied')} active={statusFilter === 'Denied'}>
          Denied
        </TabButton>
      </div>

      <div className="flex gap-8 flex-wrap">
        {videos
          .filter((video) => video.status === statusFilter)
          .map((video) => {
            return <VideoCard key={video.id} video={video} />
          })}
      </div>
    </div>
  )
}
