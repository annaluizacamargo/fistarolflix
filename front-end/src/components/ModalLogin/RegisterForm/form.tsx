'use client'

import { ILoginAndRegisterFormData, RegisterSchema, RegisterSchemaData } from '@/components/ModalLogin/types'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import PrimaryButton from '@/components/Button'
import yupResolver from '@/components/ModalLogin/yupResolver'
import Link from 'next/link'
import Styles from '../modal-login.module.scss'

export default function RegisterForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
    watch,
  } = useForm<RegisterSchemaData>({
    resolver: yupResolver(RegisterSchema),
  })

  const onHandleChangeRegister = (e: React.ChangeEvent<HTMLInputElement>, clearErrors: () => void) => {
    clearErrors()
  }

  const watchEmail = watch('email')
  const watchName = watch('name')
  const watchPassword = watch('password')
  const isEmailFilled = Boolean(watchEmail)
  const isNameFilled = Boolean(watchName)
  const isPasswordFilled = Boolean(watchPassword)
  register('email', { onChange: (e) => onHandleChangeRegister(e, clearErrors) })
  register('name', { onChange: (e) => onHandleChangeRegister(e, clearErrors) })
  register('password', { onChange: (e) => onHandleChangeRegister(e, clearErrors) })

  const onSubmitHandler = async (data: ILoginAndRegisterFormData) => {
    setLoading(true)

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response && response.ok) {
        router.push('/home')
      } else {
        setLoading(false)

        setError('root', {
          type: 'manual',
          message: 'Houve um erro ao tentar cadastrar o usuário. Tente novamente.',
        })
      }
    } catch (error: any) {
      setLoading(false)

      setError('root', {
        type: 'manual',
        message: error,
      })
    }
  }

  return (
    <form
      className={Styles.form}
      style={{ gap: errors.root ? '0.5rem' : '2rem' }}
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <div className={Styles.inputsRegister}>
        <input
          id="email"
          type="email"
          autoComplete={'email'}
          title="Email"
          placeholder="Informe seu email"
          {...register('email')}
        />
        <input id="name" type="text" title="Nome" placeholder="Informe seu nome" {...register('name')} />

        <input id="password" type="password" title="Senha" placeholder="Insira sua senha" {...register('password')} />
      </div>

      <div className={Styles.buttons}>
        {errors.root && (
          <div id="error" className={Styles.error}>
            {errors.root.message}
          </div>
        )}

        <PrimaryButton type={'submit'} disabled={!isEmailFilled || !isPasswordFilled || !isNameFilled || loading}>
          {loading ? 'Carregando...' : 'Cadastrar'}
        </PrimaryButton>

        <div className={Styles.newHere}>
          <span>Já possui uma conta?</span>
          <Link href="/login">Faça seu login</Link>
        </div>
      </div>
    </form>
  )
}
