import { Resolver } from 'react-hook-form'
import { ObjectSchema, ValidationError } from 'yup'

export default function yupResolver<T extends Record<string, any>>(
  schema: ObjectSchema<any, any, any, any>
): Resolver<T> {
  return async (values) => {
    try {
      await schema.validate(values, { abortEarly: false })
      return { values: values, errors: {} }
    } catch (errors) {
      if (errors instanceof ValidationError) {
        const formattedErrors = errors.inner.reduce((acc: any, err: any) => {
          return {
            ...acc,
            [err.path]: {
              type: err.type ?? 'validation',
              message: err.message,
            },
          }
        }, {})
        return { values: {}, errors: formattedErrors }
      } else {
        return { values: {}, errors: {} }
      }
    }
  }
}
