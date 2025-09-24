const setErrors = ({ setError, errors }: SetErrorsProps) => {
  Object.keys(errors).forEach((errorKey) => {
    setError(errorKey, { type: 'custom', message: errors[errorKey] })
  })
}

type Props = {
  endpoint: string
  locale: string

  methods: any
  data: Record<string, string>
  setSuccess: any
  setError: any
}

export default async ({
  endpoint,
  locale,

  methods,
  data,
  setSuccess,
  setError
}: Props): Promise<void> => {
  const response = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify({ locale, ...data }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => res.json())
    .catch((err) => console.error(err))

  if (!response) {
    setError(true)
    return
  }

  if (response?.errors) {
    setError(true)
    setErrors({ ...methods, errors: response.errors })
    return
  }

  if (response?.error) {
    setError(true)
    return
  }

  setSuccess(true)
  methods.reset()
}

type SetErrorsProps = {
  setError: (name: string, options: { type: string; message: string }) => void
  errors: Record<string, string>
}
