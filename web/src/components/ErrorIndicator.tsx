export const ErrorIndicator = ({ error }: { error: unknown }) => {
  const err = error instanceof Error ? error : new Error(JSON.stringify(error))

  return (
    <div>
      <div>Error</div>

      {process.env.NODE_ENV === 'development' && err && (
        <div className="text-warning-text bg-warning-background border border-warning-border rounded p-4">
          <pre className="font-bold">{err.name}:</pre>
          <pre>{err.message}</pre>
        </div>
      )}
    </div>
  )
}
