// @ts-ignore
import { InputFormat as BeeInputFormat, useFormContext } from 'react-bee'
import 'cleave.js/dist/addons/cleave-phone.mx'

import { useId } from 'react'

import { Field, type FieldProps } from './Field'

interface Props extends FieldProps {
  format: any
  rawValue?: boolean
}

export const InputFormat = ({ label, format, rawValue, ...props }: Props) => {
  const id = useId()
  const { getValues } = useFormContext()
  const value = getValues(props.name)

  return (
    <Field
      id={`${id}:${props.name}`}
      label={label}
      name={props.name}
      type={props.type ?? ''}
    >
      <BeeInputFormat
        id={`${id}:${props.name}`}
        format={{
          phoneRegionCode: 'mx',
          ...format
        }}
        value={value ? value : ''}
        rawValue={rawValue}
        {...props}
      />
    </Field>
  )
}
