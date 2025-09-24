// @ts-ignore
import { Input as BeeInput } from 'react-bee'
import { useId } from 'react'

import { Field, type FieldProps } from './Field'

export const Input = ({ label, ...props }: FieldProps) => {
  const id = useId()

  return (
    <Field id={`${id}:${props.name}`} label={label} type={props.type ?? ''} {...props}>
      <BeeInput id={`${id}:${props.name}`} {...props} />
    </Field>
  )
}
