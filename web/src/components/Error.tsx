export const Error = ({ error }: { error?: Error }) => {
  return (
    <div className="container py-12 px-16 w-[68rem]">
      <h1 className="text-4xl font-bold text-title mt-4 mb-6">An error has occurred</h1>
      <p className="font-bold mb-16">Sorry about that!</p>

      {/*
      <p className="mb-8">
        You can email <span className="font-bold underline">___CONTACT_EMAIL___</span> if you have any questions, or if
        you have information that can help us diagnose the problem.
      </p>
      */}

      <div className="flex justify-center gap-8 mb-12">
        <a
          href={window.location.href}
          onClick={() => window.location.reload()}
          className="underline hover:no-underline"
        >
          Reload this page
        </a>
        <a href="/" className="underline hover:no-underline">
          Main menu
        </a>
      </div>

      {process.env.NODE_ENV === 'development' && error && (
        <div className="text-warning-text bg-warning-background border border-warning-border rounded p-4">
          <pre className="font-bold">{error.name}:</pre>
          <pre>{error.message}</pre>
        </div>
      )}
    </div>
  )
}
