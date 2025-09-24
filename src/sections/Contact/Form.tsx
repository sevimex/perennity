import { useState } from 'react'
// @ts-ignore
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

export default ({ i18n, currentLocale }: Props) => {
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const methods = useForm({
    defaultValues: {
      // name: 'Test',
      // company: 'Test',
      // email: 'test@mail.com',
      // phone: '0123456789',
      // comments: 'Testing...'
    }
  })

  const handleSubmit = async ({ data }: { data: Record<string, string> }) => {
    setSending(true)

    await send({
      endpoint: '/api/contact/send',
      locale: currentLocale,
      methods,
      data,
      setSuccess,
      setError
    })

    setSending(false)
  }

  const gap = 5
  const classGridOne = `grid grid-cols-1 gap-${gap}`

  return (
    <Form methods={methods} onSubmit={handleSubmit}>
      <div className={`${classGridOne}`}>
        <Input
          name='name'
          label={i18n.forms.fields.name}
          placeholder={`${i18n.forms.fields.name}*`}
          validations={{ required: true }}
        />
        <Input
          name='company'
          label={i18n.forms.fields.company}
          placeholder={i18n.forms.fields.company}
          validations={{ required: false }}
        />
        <Input
          name='email'
          label={i18n.forms.fields.email}
          placeholder={`${i18n.forms.fields.email}*`}
          validations={{ required: true }}
        />
        <InputFormat
          name='phone'
          label={i18n.forms.fields.phone}
          placeholder={`${i18n.forms.fields.phone}*`}
          validations={{ required: true }}
          format={{
            phone: true
          }}
        />
        <Textarea
          name='comments'
          label={i18n.forms.fields.comments}
          placeholder={i18n.forms.fields.comments}
          validations={{ required: false }}
          rows='4'
        />
        <div className='text-center grid grid-cols-1 gap-4'>
          <Submit
            i18n={i18n}
            sending={sending}
            setSending={setSending}
            success={success}
            setSuccess={setSuccess}
            error={error}
            setError={setError}
            variant='secondary'
          />
        </div>
      </div>
    </Form>
  )
}
