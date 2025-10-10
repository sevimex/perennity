// const [sending, setSending] = useState(false)
// const [success, setSuccess] = useState(false)
// const [error, setError] = useState(false)

/* Example
  <Submit
    i18n={i18n}
    sending={sending}
    setSending={setSending}
    success={success}
    setSuccess={setSuccess}
    error={error}
  />
*/

// prettier-ignore
import { SendingButton, type Props as SendingButtonProps } from '@/components/Fields/SendingButton'
import {
  Response,
  type Props as ResponseProps
} from '@/components/Fields/Response'

interface Props extends SendingButtonProps, ResponseProps {
  i18n: any
  sending: boolean
  setSending: (sending: boolean) => void
  success: boolean
  setSuccess: (sucess: boolean) => void
  setError: (sucess: boolean) => void
  error: boolean
  variant?: string
  label?: string
  disabled?: boolean
  'aria-disabled'?: boolean | 'true' | 'false'
}

export const Submit: React.FC<Props> = ({
  i18n,
  sending,
  success,
  setSuccess,
  error,
  setError,
  variant,
  label,
  ...props
}) => {
  return (
    <>
      <SendingButton
        i18n={i18n}
        sending={sending}
        variant={variant}
        label={label}
      />
      <Response
        i18n={i18n}
        success={success}
        setSuccess={setSuccess}
        error={error}
        setError={setError}
        {...props}
      />
    </>
  )
}

export default Submit
