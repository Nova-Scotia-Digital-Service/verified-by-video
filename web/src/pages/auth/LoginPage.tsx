import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import { useAppDispatch } from '../../hooks/hooks'
import { paths } from '../../paths'
import { login } from '../../store/slices/auth/authThunks'
import { useIsAuthenticated } from '../../store/slices/auth/authSelectors'

import { postLogin } from '../../api/AuthApi'
import { PrimaryButton } from '../../components/Button'
import { Input } from '../../components/Input'

export const LoginPage: React.FC = () => {
  const isAuthenticated = useIsAuthenticated()
  const [loginError, setLoginError] = useState<string | null>(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const nextParam = searchParams.get('next')

  useEffect(() => {
    if (isAuthenticated && nextParam) {
      navigate(nextParam, { replace: true })
    }
  })

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault()

    postLogin()
      .then((response) => {
        dispatch(login(response.data.token)).then(() => {
          const nextPath = nextParam || paths.reviewList({})
          navigate(nextPath)
        })
      })
      .catch((error: unknown) => {
        setLoginError(JSON.stringify(error, undefined, 2))
      })
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

      {loginError !== null && (
        <div className="mt-8">
          <div className="font-bold">Error:</div>
          <pre className="overflow-scroll text-sm">{loginError}</pre>
        </div>
      )}
    </form>
  )
}
