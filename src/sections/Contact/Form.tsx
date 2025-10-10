import { useState, useMemo } from 'react'
import { Form, useForm } from 'react-bee'

import { Input } from '@/components/Fields/Input'
import { InputFormat } from '@/components/Fields/InputFormat'
import { Textarea } from '@/components/Fields/Textarea'
import { Submit } from '@/components/Fields/Submit.tsx'

import send from '@/api/form'

interface Props {
  i18n: any
  currentLocale: string
}

export default function ContactForm({ i18n, currentLocale }: Props) {
  const methods = useForm({
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      comments: '',
      // honeypot opcional:
      comments_hp: '',
    },
  })

  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  // Evita que Tailwind purgue clases dinámicas tipo gap-${n}
  const gap: number = 5
  const gapClass = useMemo(() => {
    switch (gap as number) {
      case 4: return 'gap-4'
      case 5: return 'gap-5'
      case 6: return 'gap-6'
      default: return 'gap-5'
    }
  }, [gap])

  // Val. mínima cliente (no reemplaza la del servidor)
  const validateClient = (data: Record<string, string>) => {
    const errs: Record<string, string> = {}
    if (!data.name?.trim()) errs.name = 'required'
    if (!data.email?.trim()) errs.email = 'required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = 'invalid'
    if (!data.comments?.trim()) errs.comments = 'required'
    return errs
  }

  const handleSubmit = async ({ data }: { data: Record<string, string> }) => {
    // honeypot: si viene lleno, abortar silenciosamente
    if (data.comments_hp) {
      setSuccess(true)
      setError(false)
      return
    }

    // validación cliente opcional
    const clientErrors = validateClient(data)
    if (Object.keys(clientErrors).length) {
      methods.setErrors?.({ ...methods, errors: clientErrors })
      setSending(false)
      setSuccess(false)
      setError(false)
      return
    }

    try {
      setSending(true)
      setSuccess(false)
      setError(false)

      await send({
        endpoint: '/api/contact/send',
        locale: currentLocale,
        methods,
        data,
        setSuccess,
        setError,
      })
      // send() ya maneja success/error internamente
    } finally {
      setSending(false)
    }
  }

  return (
    <Form
      methods={methods}
      onSubmit={handleSubmit}
      noValidate
      aria-busy={sending}
      aria-live="polite"
      className={`grid grid-cols-1 ${gapClass}`}
    >
      {/* Nombre */}
      <Input
        name="name"
        label={i18n?.forms?.fields?.name ?? 'Name'}
        placeholder={i18n?.forms?.fields?.name ?? 'Name'}
        validations={{ required: true }}
        autoComplete="name"
      />

      {/* Empresa */}
      <Input
        name="company"
        label={i18n?.forms?.fields?.company ?? 'Company'}
        placeholder={i18n?.forms?.fields?.company ?? 'Company'}
        validations={{ required: false }}
        autoComplete="organization"
      />

      {/* Email */}
      <Input
        name="email"
        type="email"
        label={i18n?.forms?.fields?.email ?? 'Email'}
        placeholder={i18n?.forms?.fields?.email ?? 'Email'}
        validations={{ required: true }}
        autoComplete="email"
      />

      {/* Teléfono (usa el formato que soporte tu InputFormat) */}
      <InputFormat
        name="phone"
        label={i18n?.forms?.fields?.phone ?? 'Phone'}
        placeholder={i18n?.forms?.fields?.phone ?? 'Phone'}
        validations={{ required: false }}
        format="(###) ### ####"
        autoComplete="tel"
      />

      {/* Mensaje */}
      <Textarea
        name="comments"
        label={i18n?.forms?.fields?.comments ?? 'Message'}
        placeholder={i18n?.forms?.fields?.comments ?? 'Message'}
        validations={{ required: true }}
        rows="4"
      />

      {/* Honeypot oculto para bots */}
      <div className="hidden" aria-hidden="true">
        <label>
          Do not fill this field
          <input type="text" name="comments_hp" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {/* Submit / estado */}
      <div className="flex items-center justify-between">
        <Submit
          i18n={i18n}
          sending={sending}
          setSending={setSending}
          success={success}
          setSuccess={setSuccess}
          error={error}
          setError={setError}
          variant="secondary"
          disabled={sending}
          aria-disabled={sending}
        />
      </div>
    </Form>
  )
}