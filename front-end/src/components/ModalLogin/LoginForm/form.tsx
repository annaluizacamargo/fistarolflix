'use client'

import { ILoginFormData, LoginSchema, LoginSchemaData } from '@/components/ModalLogin/types'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import PrimaryButton from '@/components/Button'
import yupResolver from '@/components/ModalLogin/yupResolver'
import Link from 'next/link'
import Styles from '@/components/ModalLogin/modal-login.module.scss'

export default function LoginForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
    watch,
  } = useForm<LoginSchemaData>({
    resolver: yupResolver(LoginSchema),
  })

  const onHandleChangeRegister = (e: React.ChangeEvent<HTMLInputElement>, clearErrors: () => void) => {
    clearErrors()
  }

  const watchEmail = watch('email')
  const watchPassword = watch('password')
  const isEmailFilled = Boolean(watchEmail)
  const isPasswordFilled = Boolean(watchPassword)

  register('email', { onChange: (e) => onHandleChangeRegister(e, clearErrors) })
  register('password', { onChange: (e) => onHandleChangeRegister(e, clearErrors) })

  const onSubmitHandler = async (data: ILoginFormData) => {
    setLoading(true)

    try {
      const response = await fetch('/api/login', {
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
          message: 'A senha ou email estão incorretos.',
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
      style={{ gap: errors.root ? '1rem' : '2rem' }}
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <div className={Styles.inputsLogin}>
        <input
          id="email"
          type="email"
          autoComplete={'email'}
          title="Email"
          placeholder="Informe seu email"
          {...register('email')}
        />

        <div className={Styles.password}>
          <input id="password" type="password" title="Senha" placeholder="Insira sua senha" {...register('password')} />

          <Link href="#">Esqueci minha senha</Link>
        </div>
      </div>

      <div className={Styles.buttons}>
        {errors.root && (
          <div id="error" className={Styles.error}>
            {errors.root.message}
          </div>
        )}

        <PrimaryButton type={'submit'} disabled={!isEmailFilled || !isPasswordFilled || loading}>
          {loading ? 'Carregando...' : 'Entrar'}
        </PrimaryButton>

        <div className={Styles.newHere}>
          <p>Novo por aqui?</p>
          <Link href="/cadastro">Crie sua conta</Link>
        </div>
      </div>
    </form>
  )
}