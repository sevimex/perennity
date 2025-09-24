// @ts-ignore
import Validator from 'validatorjs'

type Body = Record<string, string>
type Rules = Record<string, string>

export const requestValidator = (body: Body, rules: Rules) => {
  const validation = new Validator(body, rules)

  return validation
}
