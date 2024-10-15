import * as TD from '../../types'

import { useEffect, useState } from 'react'

import { getSubmissionList } from '../../api/SubmissionApi'
import { useResponse } from '../../hooks/useResponse'
import { useUserIsAdmin } from '../../utils/keycloak'

import { AwaitResponse } from '../../components/AwaitResponse'

import { SubmissionCard } from './components/SubmissionCard'
import { TagFilterIndicator } from './components/TagFilterIndicator'
import { TagFilterDropdown } from './components/TagFilterDropdown'

export const FilterTab = ({
  status,
  statusFilter,
  setStatusFilter,
  setFilteredTagIds,
  children,
}: {
  status: TD.SubmissionStatus
  statusFilter: string
  setStatusFilter: (statusFilter: TD.SubmissionStatus) => void
  setFilteredTagIds: (filteredTagIds: string[]) => void
  children: React.ReactNode
}) => {
  const onClick = () => {
    setStatusFilter(status)
    setFilteredTagIds([])
  }

  const active = statusFilter === status

  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-lg flex-shrink-0 font-bold ${active ? 'border-b-2' : 'opacity-50'} hover:border-b-2`}
    >
      {children}
    </button>
  )
}

const CardSet = ({ submissions }: { submissions: TD.APISubmissionSummary[] }) => {
  return (
    <div className="flex gap-8 flex-wrap">
      {submissions.length > 0
        ? submissions.map((submission) => {
            return <SubmissionCard key={submission.id} submission={submission} />
          })
        : 'No submissions'}
    </div>
  )
}

export const SubmissionListPage: React.FC = () => {
  const userIsAdmin = useUserIsAdmin()
  const [statusFilter, setStatusFilter] = useState<TD.SubmissionStatus>(userIsAdmin ? 'ESCALATED' : 'NEW')
  const [filteredTagIds, setFilteredTagIds] = useState<string[]>([])
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
      <h1 className="text-3xl text-title font-bold mt-12 mb-6">Videos</h1>

      <AwaitResponse response={submissionListResponse}>
        {(submissions) => {
          const taggedSubmissions = submissions.filter(
            (submission) =>
              filteredTagIds.length === 0 || submission.tags.some(({ id }) => filteredTagIds.includes(id)),
          )

          const escalatedSubmissions = submissions.filter((submission) => submission.status === 'ESCALATED')
          const newSubmissions = submissions.filter((submission) => submission.status === 'NEW')
          const startedSubmissions = submissions.filter((submission) => submission.status === 'UNDER_REVIEW')
          const rejectedSubmissions = submissions.filter((submission) => submission.status === 'REJECTED')
          const approvedSubmissions = submissions.filter((submission) => submission.status === 'APPROVED')

          return (
            <>
              <div className="flex justify-between">
                <div className="flex gap-4 mb-4">
                  {userIsAdmin && (
                    <FilterTab
                      status="ESCALATED"
                      statusFilter={statusFilter}
                      setStatusFilter={setStatusFilter}
                      setFilteredTagIds={setFilteredTagIds}
                    >
                      Escalated ({`${escalatedSubmissions.length}`})
                    </FilterTab>
                  )}
                  <FilterTab
                    status="NEW"
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    setFilteredTagIds={setFilteredTagIds}
                  >
                    New ({`${newSubmissions.length}`})
                  </FilterTab>
                  <FilterTab
                    status="UNDER_REVIEW"
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    setFilteredTagIds={setFilteredTagIds}
                  >
                    In Progress ({`${startedSubmissions.length}`})
                  </FilterTab>
                  <FilterTab
                    status="REJECTED"
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    setFilteredTagIds={setFilteredTagIds}
                  >
                    Rejected ({`${rejectedSubmissions.length}`})
                  </FilterTab>
                  <FilterTab
                    status="APPROVED"
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    setFilteredTagIds={setFilteredTagIds}
                  >
                    Approved ({`${approvedSubmissions.length}`})
                  </FilterTab>
                </div>

                <TagFilterDropdown filteredTagIds={filteredTagIds} setFilteredTagIds={setFilteredTagIds} />
              </div>

              <TagFilterIndicator filteredTagIds={filteredTagIds} setFilteredTagIds={setFilteredTagIds} />

              <CardSet submissions={taggedSubmissions.filter((submission) => submission.status === statusFilter)} />
            </>
          )
        }}
      </AwaitResponse>
    </div>
  )
}
