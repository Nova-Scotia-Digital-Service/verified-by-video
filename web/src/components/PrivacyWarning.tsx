import { ReactComponent as WarningIcon } from '../assets/icon-warning.svg'

export const PrivacyWarning = () => (
  <div className="flex items-start mb-12 p-4 rounded-lg border border-warning-border text-lg text-warning-text bg-warning-background">
    <WarningIcon className="mr-4" />
    <div>
      <h2 className="font-bold mb-4 leading-none">Important</h2>
      <div>
        This screen contains personal information and should not be printed or captured, except when reporting
        suspicious activity.
      </div>
    </div>
  </div>
)
