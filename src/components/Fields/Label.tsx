import styles from './styles.module.css'

interface Props {
  label: string
  className?: string
}

export const Label = ({ label, className }: Props) => {
  return (
    <label htmlFor='' className={`${styles['label']} ${className}`}>
      {label}
    </label>
  )
}
