import { PrimaryButton } from '../../components/Button'
import { Input } from '../../components/Input'

export const LoginPage: React.FC = () => {
  return (
    <div className="w-96 mx-auto">
      <h2 className="text-4xl font-bold text-title mt-32 mb-16">Log in to your account</h2>

      <Input label="Email" placeholder="jamie.ohara@example.ca" />
      <Input label="Password" placeholder="********" type="password" />

      <form action="/dashboard">
        <PrimaryButton type="submit">Log in</PrimaryButton>
      </form>
    </div>
  )
}
