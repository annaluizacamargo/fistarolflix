'use client'

import LoginForm from './LoginForm/form'
import RegisterForm from './RegisterForm/form'
import Banner from '@/public/banner-login.png'
import Logo from '@/public/fistarolflix-heart-logo.svg'
import Image from 'next/image'
import Styles from './modal-login.module.scss'

export default function LoginModal({ isLogin = false }: Readonly<{ isLogin?: boolean }>) {
  const title = isLogin ? 'Entrar' : 'Cadastre-se'

  return (
    <div className={Styles.container}>
      <div className={Styles.banner}>
        <Image src={Banner} alt="Banner de fundo" layout="fill" objectFit="cover" />
      </div>

      <div className={Styles.modal}>
        <div className={Styles.content}>
          <h2 className={Styles.title}>{title}</h2>

          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>

      <div className={Styles.logo}>
        <Image src={Logo} alt="Logo do site FistarolFlix" width={138} height={76} />
      </div>
    </div>
  )
}
