import { Link, useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../hooks/hooks'
import { paths } from '../../paths'
import { login } from '../../store/slices/auth/authSlice'

import { PrimaryButton } from '../../components/Button'
import { Input } from '../../components/Input'

export const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault()
    dispatch(login())
    navigate(paths.dashboard({}))
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-96 mx-auto">
      <h2 className="text-4xl font-bold text-title mt-32 mb-16">Log in to your account</h2>

      <Input label="Email" type="email" required placeholder="jamie.ohara@example.ca" />
      <Input label="Password" type="password" required placeholder="********" />

      <Link to={paths.forgotPassword({})} className="block self-end mt-2 underline text-link hover:no-underline">
        Forgot Password
      </Link>

      <PrimaryButton type="submit">Log in</PrimaryButton>
    </form>
  )
}
