import { Input } from '../../components/Input'

export const LoginPage: React.FC = () => {
  return (
    <div className="w-96 mx-auto">
      <h2 className="text-4xl font-bold text-title mt-32 mb-16">Log in to your account</h2>

      <Input label="Email" placeholder="jamie.ohara@example.ca" />
      <Input label="Password" placeholder="********" type="password" />

      <form action="/dashboard">
        <button
          type="submit"
          className="flex justify-center items-center w-full h-12 mt-8 bg-primary-background rounded-md font-semibold text-lg text-primary-text"
        >
          Log in
        </button>
      </form>
    </div>
  )
}
