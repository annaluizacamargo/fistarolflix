import { ILoginAndRegisterFormData } from '@/components/LoginModal/types'
import { useUserContext } from '@/providers/Profile'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import PrimaryButton from '@/components/Button'
import Styles from '@/components/LoginModal/modal-login.module.scss'
import Link from 'next/link'

export default function LoginForm() {
  const router = useRouter()
  const { addUser } = useUserContext()
  const [loading, setLoading] = useState(false)
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
      const response = await fetch('/api/login', {
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
        setError('A senha ou email estão incorretos.')
      }
    } catch (error) {
      setLoading(false)
      setError('Ocorreu um erro durante o login.')
    }
  }

  return (
    <form className={Styles.form} style={{ gap: error ? '1rem' : '2rem' }} onSubmit={handleSubmit(onSubmitHandler)}>
      {/* Se houver erro, exibir mensagem de erro */}

      <div className={Styles.inputsLogin}>
        <input
          id="email"
          type="email"
          autoComplete="email"
          title="Email"
          placeholder="Informe seu email"
          {...register('email', { required: 'Informe seu e-mail', onChange: () => setError(null) })}
        />

        <div className={Styles.password}>
          <input
            id="password"
            type="password"
            title="Senha"
            placeholder="Insira sua senha"
            {...register('email', { required: 'Informe seu e-mail', onChange: () => setError(null) })}
          />

          <Link href="#">Esqueci minha senha</Link>
        </div>
      </div>

      {error && (
        <div id="error" className={Styles.error}>
          {error}
        </div>
      )}

      <div className={Styles.buttons}>
        <PrimaryButton type="submit" disabled={loading}>
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
