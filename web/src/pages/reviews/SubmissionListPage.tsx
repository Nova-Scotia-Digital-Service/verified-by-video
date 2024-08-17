import * as TD from '../../types'

import { useEffect, useState } from 'react'

import { getSubmissionList } from '../../api/SubmissionApi'
import { useResponse } from '../../hooks/useResponse'

import { AwaitResponse } from '../../components/AwaitResponse'

import { SubmissionCard } from './components/SubmissionCard'
import { TagFilter } from './components/TagFilter'

export const FilterTab = ({
  active,
  onClick,
  children,
}: {
  active?: boolean
  onClick: () => void
  children: React.ReactNode
}) => {
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

const CardSet = ({ title, submissions }: { title: string; submissions: TD.APISubmissionSummary[] }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mt-8 mb-4">{title}</h2>
      <div className="flex gap-8 flex-wrap">
        {submissions.length > 0
          ? submissions.map((submission) => {
              return <SubmissionCard key={submission.id} submission={submission} />
            })
          : 'No submissions'}
      </div>
    </div>
  )
}

export const SubmissionListPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<TD.SubmissionStatus>('NEW')
  const [filteredTags, setFilteredTags] = useState<string[]>([])
  const [submissionListResponse, setSubmissionListResponse] = useResponse<TD.APISubmissionSummary[]>()

  useEffect(() => {
    getSubmissionList()
      .then((response) => {
        setSubmissionListResponse({ status: 'READY', data: response.data })
      })
      .catch((error) => {
        setSubmissionListResponse({ status: 'ERROR', error: error })
      })
  }, [])

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mt-12 mb-6">Videos</h1>

      <TagFilter filteredTags={filteredTags} setFilteredTags={setFilteredTags} />

      <AwaitResponse response={submissionListResponse}>
        {(submissions) => {
          const taggedSubmissions = submissions.filter(
            (submission) =>
              filteredTags.length === 0 || submission.tags.some(({ text }) => filteredTags.includes(text)),
          )

          const escalatedSubmissions = taggedSubmissions.filter((submission) => submission.status === 'ESCALATED')
          const newSubmissions = taggedSubmissions.filter((submission) => submission.status === 'NEW')
          const startedSubmissions = taggedSubmissions.filter((submission) => submission.status === 'UNDER_REVIEW')
          const rejectedSubmissions = taggedSubmissions.filter((submission) => submission.status === 'REJECTED')
          const approvedSubmissions = taggedSubmissions.filter((submission) => submission.status === 'APPROVED')

          return (
            <>
              <div className="flex gap-4 mb-6">
                <FilterTab onClick={() => setStatusFilter('ESCALATED')} active={statusFilter === 'ESCALATED'}>
                  Escalated ({`${escalatedSubmissions.length}`})
                </FilterTab>
                <FilterTab onClick={() => setStatusFilter('NEW')} active={statusFilter === 'NEW'}>
                  New ({`${newSubmissions.length}`})
                </FilterTab>
                <FilterTab onClick={() => setStatusFilter('UNDER_REVIEW')} active={statusFilter === 'UNDER_REVIEW'}>
                  In Progress ({`${startedSubmissions.length}`})
                </FilterTab>
                <FilterTab onClick={() => setStatusFilter('REJECTED')} active={statusFilter === 'REJECTED'}>
                  Rejected ({`${rejectedSubmissions.length}`})
                </FilterTab>
                <FilterTab onClick={() => setStatusFilter('APPROVED')} active={statusFilter === 'APPROVED'}>
                  Approved ({`${approvedSubmissions.length}`})
                </FilterTab>
              </div>

              {statusFilter === 'ESCALATED' && <CardSet title="Escalated" submissions={escalatedSubmissions} />}
              {statusFilter === 'NEW' && <CardSet title="New" submissions={newSubmissions} />}
              {statusFilter === 'UNDER_REVIEW' && <CardSet title="In Progress" submissions={startedSubmissions} />}
              {statusFilter === 'REJECTED' && <CardSet title="Rejected" submissions={rejectedSubmissions} />}
              {statusFilter === 'APPROVED' && <CardSet title="Approved" submissions={approvedSubmissions} />}
            </>
          )
        }}
      </AwaitResponse>
    </div>
  )
}
