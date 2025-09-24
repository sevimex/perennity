// @ts-ignore
import { Textarea as BeeTextarea } from 'react-bee'
import { useId } from 'react'

import { Field, type FieldProps } from './Field'

export const Textarea = ({ label, ...props }: FieldProps) => {
  const id = useId()
  return (
    <Field id={`${id}:${props.name}`} label={label} name={props.name}>
      <BeeTextarea id={`${id}:${props.name}`} {...props} />
    </Field>
  )
}
