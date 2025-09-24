// const [sending, setSending] = useState(false)

/* Example
  <SendingButton
    i18n={i18n}
    sending={sending}
  />
*/

import styles from '@/components/Button/styles.module.css'

export type Props = {
  i18n: any
  sending: boolean
  variant?: string
  label?: string
}

export const SendingButton = ({ i18n, sending, variant, label }: Props) => {
  const currentLabel = label ? label : i18n.buttons.send

  return (
    <button className={styles.btn} css-variant={variant ?? 'primary'} css-large='1'>
      {!sending ? currentLabel : i18n.buttons.sending}
    </button>
  )
}
