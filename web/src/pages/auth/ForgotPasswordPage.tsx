import { useNavigate } from 'react-router'

import { paths } from '../../paths'

import { PrimaryButton } from '../../components/Button'
import { Input } from '../../components/Input'

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate()

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault()
    navigate(paths.login({}))
  }

  return (
    <form onSubmit={handleSubmit} className="w-96 mx-auto">
      <h2 className="text-4xl font-bold text-title mt-32 mb-8">Request password reset</h2>

      <p className="mb-4">Enter your email address and we will send you a password reset link.</p>

      <Input label="Email" type="email" required placeholder="jamie.ohara@example.ca" />

      <PrimaryButton type="submit">Submit</PrimaryButton>
    </form>
  )
}
