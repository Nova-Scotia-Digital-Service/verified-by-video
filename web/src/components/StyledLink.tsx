import { Link } from 'react-router-dom'

export const StyledLink = (props: React.ComponentProps<typeof Link>) => (
  <Link className="underline hover:no-underline" {...props} />
)
