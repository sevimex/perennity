type NavItem = {
  readonly slug: string
  label: string
  route?: string
  to?: string
}

const navItem = (props: NavItem): NavItem => {
  const { slug = '...', label = '...', ...restProps } = props

  return {
    slug,
    label,
    ...restProps
  }
}

export default {
  main: [
    navItem({
      slug: 'perennity',
      label: 'perennity',
      to: 'perennity'
    }),
    navItem({
      slug: 'solutions',
      label: 'soluciones',
      to: 'solutions'
    }),
    navItem({
      slug: 'products',
      label: 'productos',
      to: 'products'
    }),
    navItem({
      slug: 'contact',
      label: 'contacto',
      to: 'contact'
    }),

  ]
}
