// const [success, setSuccess] = useState(false)
// const [error, setError] = useState(false)

/* Example
  <Response
    i18n={i18n}
    success={success}
    setSuccess={setSuccess}
    error={error}
  />
*/

import { useEffect } from 'react'

export type Props = {
  i18n: any
  success: boolean
  setSuccess: (sucess: boolean) => void
  setError: (sucess: boolean) => void
  error: boolean
  errorText?: string
  successText?: string
}

export const Response = ({
  success,
  setSuccess,
  error,
  setError,
  i18n,
  errorText,
  successText
}: Props) => {
  useEffect(() => {
    if (success) {
      setError(false)
      setTimeout(() => {
        setSuccess(false)
      }, 4000)
    }
  }, [success])

  const goodText = successText ?? i18n.mail.messageHasBeenSentSuccessfully
  const badText = errorText ?? i18n.mail.yourMessageHasNotBeenSent

  return (
    <>
      {(error || success) && (
        <p
          className={`${
            error && !success ? 'text-error' : 'text-mustard'
          } font-semibold text-sm`}
        >
          {success && goodText}
          {error && !success && badText}
        </p>
      )}
    </>
  )
}
