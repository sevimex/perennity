import { Link } from 'react-scroll'

export interface Props {
  children: any
  to: string
  offset?: number
  duration?: number
  class?: string
}

export default ({
  children,
  class: className,
  duration = 500,
  offset = -60,
  ...props
}: Props) => {
  return (
    <Link
      smooth={true}
      offset={offset}
      duration={duration}
      className={className}
      {...props}
    >
      {children}
    </Link>
  )
}
