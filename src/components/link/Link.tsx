import { NavLink } from "react-router-dom"

interface LinkProps {
  to: string
  text: string
  className?: string
}
const Link = ({
  to,
  text,
  className,
}: LinkProps) => {
  return (
    <NavLink
      to={to}
      className={`mt-2 underline text-sky-700 hover:text-sky-500 ${className}`}
    >
      {text}
    </NavLink>
  )
}

export default Link
