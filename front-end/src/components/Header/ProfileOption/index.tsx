import ProfileIcon from '@/public/user-molde.svg'
import { IProfileOption, IProfileOptionModal } from './types'
import Image from 'next/image'
import Styles from '../header.module.scss'

export function ProfileOption({ modalOpen, setModalOpen, activeUserName, invert = false }: Readonly<IProfileOption>) {
  return (
    <button onClick={() => setModalOpen(!modalOpen)} className={Styles.profile} style={{ flexDirection: 'row' }}>
      <p>{activeUserName ?? 'Perfil 1'}</p>

      <Image src={ProfileIcon} alt="Ícone de perfil" width={32} height={32} />
    </button>
  )
}

export function ProfileOptionModal({ modalOpen, setModalOpen, UserName, emailUser }: Readonly<IProfileOptionModal>) {
  return (
    <button
      onClick={() => setModalOpen(!modalOpen)}
      className={Styles.profileModal}
      style={{ flexDirection: 'row-reverse' }}
    >
      <div className={Styles.info}>
        <p>{UserName ?? 'Perfil 1'}</p>
        <span>{emailUser ?? 'perfil@teste.com'}</span>
      </div>
      <Image src={ProfileIcon} alt="Ícone de perfil" width={32} height={32} />
    </button>
  )
}
