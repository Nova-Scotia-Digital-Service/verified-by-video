const InputBox = ({ label, placeholder, type }: { label: string; placeholder?: string; type?: 'password' }) => {
  return (
    <div className="mt-2">
      <label className="block text-title font-semibold">{label}</label>
      <input
        placeholder={placeholder}
        type={type}
        className="w-full shadow-input rounded-md p-3 text-sm text-input-text bg-input-background"
      />
    </div>
  )
}

export const LoginPage: React.FC = () => {
  return (
    <div className="w-96 mx-auto">
      <h2 className="text-4xl font-bold text-title mt-32 mb-16">Log in to your account</h2>

      <InputBox label="Email" placeholder="jamie.ohara@example.ca" />
      <InputBox label="Password" placeholder="********" type="password" />

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
