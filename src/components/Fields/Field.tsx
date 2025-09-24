// @ts-ignore
import { useFormContext, useWatch } from 'react-bee'
// @ts-ignore
import HtmlParser from 'react-html-parser'

import styles from './styles.module.css'

export interface FieldProps {
  children?: React.ReactNode
  fileLabel?: string
  name: string
  rows?: string
  type?: string
  label: string
  placeholder: string
  validations?: Record<string, {}>
  value?: string
  className?: string
  basic?: string
  onChange?: () => void
}

interface Props {
  children: React.ReactNode
  id: string
  label: string
  name: string
  type?: string
  className?: string
  unselect?: boolean
  theme?: 'dark' | 'light'
  basic?: string
}

export const Field = ({
  children,
  id,
  label,
  type,
  name,
  className,
  unselect,
  theme = 'dark',
  basic
}: Props) => {
  // prettier-ignore
  const { control, formState: { errors } } = useFormContext()
  const field = useWatch({ control, name: name })

  return (
    <div
      className={`${styles['field']} ${className} relative`}
      data-theme={theme}
      data-filled={field ? true : null}
      data-unselected={unselect ? true : null}
      data-error={errors[name] ? true : null}
      data-basic={basic}
    >
      {(type === 'checkbox' || type === 'radio') && (
        <label htmlFor={`${name}:${id}`}>{HtmlParser(label)}</label>
      )}

      <div className={styles['safe-container']}>{children}</div>
    </div>
  )
}
