import * as yup from 'yup'

export const LoginSchema = yup.object().shape({
  email: yup.string().required('Informe seu e-mail').email('E-mail inválido'),
  password: yup.string().required('Informe sua senha').min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

export const RegisterSchema = yup.object().shape({
  email: yup.string().required('Informe seu e-mail').email('E-mail inválido'),
  password: yup.string().required('Informe sua senha').min(6, 'A senha deve ter pelo menos 6 caracteres'),
  name: yup.string().required('Informe seu nome'),
})

export type LoginSchemaData = yup.InferType<typeof LoginSchema>

export type RegisterSchemaData = yup.InferType<typeof RegisterSchema>
export interface IFeedback {
  login: { error: string }
}

export interface ILoginAndRegisterFormData {
  email: string
  password: string
  name?: string
}
