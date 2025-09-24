import { useId } from 'react'
// @ts-ignore
// prettier-ignore
import { Select as BeeSelect, FontAwesomeIcon, useFormContext, useWatch } from 'react-bee'

import { Field, type FieldProps } from './Field'

export const Select = ({ ...props }: FieldProps) => {
  // prettier-ignore
  const { control } = useFormContext()
  const field = useWatch({ control, name: props.name })
  const id = useId()

  return (
    <Field id={`${id}:${props.name}`} unselect={!field} {...props}>
      <BeeSelect {...props} />
      <span className='absolute top-1/2 right-[1.25rem] z-0 -translate-y-1/2'>
        <FontAwesomeIcon icon='caret-down' />
      </span>
    </Field>
  )
}
