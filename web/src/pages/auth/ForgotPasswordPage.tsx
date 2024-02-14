import { PrimaryButton } from '../../components/Button'
import { Input } from '../../components/Input'

import { paths } from '../../paths'

export const ForgotPasswordPage: React.FC = () => {
  return (
    <div className="w-96 mx-auto">
      <h2 className="text-4xl font-bold text-title mt-32 mb-8">Request password reset</h2>

      <p className="mb-4">Enter your email address and we will send you a password reset link.</p>

      <Input label="Email" type="email" placeholder="jamie.ohara@example.ca" />

      <form action={paths.login({})}>
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </form>
    </div>
  )
}
