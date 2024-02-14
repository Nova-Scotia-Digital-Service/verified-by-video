import { Link } from 'react-router-dom'

import { PrimaryButton } from '../../components/Button'
import { Input } from '../../components/Input'

import { paths } from '../../paths'

export const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col w-96 mx-auto">
      <h2 className="text-4xl font-bold text-title mt-32 mb-16">Log in to your account</h2>

      <Input label="Email" type="email" placeholder="jamie.ohara@example.ca" />
      <Input label="Password" type="password" placeholder="********" />

      <Link to={paths.forgotPassword({})} className="block self-end mt-2 underline text-link hover:no-underline">
        Forgot Password
      </Link>

      <form action={paths.dashboard({})}>
        <PrimaryButton type="submit">Log in</PrimaryButton>
      </form>
    </div>
  )
}
