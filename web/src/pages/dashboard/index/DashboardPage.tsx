import * as TD from '../../../types'

import { useEffect, useState } from 'react'

import { getVideos } from '../../../api/VideoApi'
import { useResponse } from '../../../hooks/useResponse'

import { VideoCard } from './components/VideoCard'
import { TabButton } from './components/TabButton'
import { AwaitResponse } from '../../../components/AwaitResponse'

export const DashboardPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<TD.ReviewStatus>('Unreviewed')
  const [videoResponse, setVideoResponse] = useResponse<TD.VideoData[]>()

  useEffect(() => {
    getVideos()
      .then((response) => {
        setVideoResponse({ status: 'READY', data: response.data })
      })
      .catch((error) => {
        setVideoResponse({ status: 'ERROR', error: error })
      })
  }, [])

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

      <AwaitResponse response={videoResponse}>
        {(videos) => (
          <div className="flex gap-8 flex-wrap">
            {videos
              .filter((video) => video.status === statusFilter)
              .map((video) => {
                return <VideoCard key={video.id} video={video} />
              })}
          </div>
        )}
      </AwaitResponse>
    </div>
  )
}
