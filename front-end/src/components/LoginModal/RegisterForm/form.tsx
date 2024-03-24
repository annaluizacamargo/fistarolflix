import { ILoginAndRegisterFormData } from '@/components/LoginModal/types'
import { useUserContext } from '@/providers/Profile'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import PrimaryButton from '@/components/Button'
import Link from 'next/link'
import Styles from '../modal-login.module.scss'

export default function RegisterForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { addUser } = useUserContext()
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginAndRegisterFormData>()

  const onSubmitHandler = async (data: ILoginAndRegisterFormData) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok && typeof window !== 'undefined') {
        const responseData = await response.json()
        window.localStorage.setItem('token', responseData.token)

        const users = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(responseData),
        })

        const usersData = await users.json()
        addUser(usersData)

        router.push('/home')
      } else {
        setLoading(false)
        setError('Houve um erro ao tentar cadastrar o usuário. Tente novamente.')
      }
    } catch (error) {
      setLoading(false)
      setError('Ocorreu um erro durante o cadastro.')
    }
  }

  return (
    <form className={Styles.form} style={{ gap: error ? '0.5rem' : '2rem' }} onSubmit={handleSubmit(onSubmitHandler)}>
      <div className={Styles.inputsRegister}>
        <input
          id="email"
          type="email"
          autoComplete="email"
          title="Email"
          placeholder="Informe seu email"
          {...register('email', { required: 'Informe seu e-mail', onChange: () => setError(null) })}
        />

        <input
          id="name"
          type="text"
          title="Nome"
          placeholder="Informe seu nome"
          {...register('name', { required: 'Informe seu nome', onChange: () => setError(null) })}
        />

        <input
          id="password"
          type="password"
          title="Senha"
          placeholder="Insira sua senha"
          {...register('password', { required: 'Informe sua senha', onChange: () => setError(null) })}
        />
      </div>

      {error && (
        <div id="error" className={Styles.error}>
          {error}
        </div>
      )}

      <div className={Styles.buttons}>
        <PrimaryButton type="submit" disabled={loading}>
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
