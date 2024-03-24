'use client'

import { useState } from 'react'
import LogoImage from '@/public/fistarolflix-logo.svg'
import CloseModalIcon from '@/public/close-logo.svg'
import Image from 'next/image'
import Link from 'next/link'

import { usePathname, useRouter } from 'next/navigation'
import Styles from './header.module.scss'
import { useUserContext } from '@/providers/Profile'
import { ProfileOption, ProfileOptionModal } from './ProfileOption'

export default function Header() {
  const { users, activeUser, setActiveUser } = useUserContext()
  const url = usePathname() || ''
  const unloggedPages = ['/login', '/cadastro']
  const isUnlogged = unloggedPages.includes(url)
  const [activeMenuOption, setActiveMenuOption] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const profileName = activeUser?.name ?? 'Perfil 1'
  const profileEmail = activeUser?.email ?? 'perfil@teste.com'

  const menuOptions = [
    { name: 'Início', url: '/home', icon: '/home-logo.svg', alt: 'Ícone de início' },
    // { name: 'Minha Lista', url: '#', icon: '/icon-logo.svg', alt: 'Ícone de lista' },
  ]

  return (
    <>
      {isUnlogged ? (
        <></>
      ) : (
        <header className={Styles.header}>
          <Link href="/home">
            <Image src={LogoImage} alt="Logo FistarolFlix" width={70} height={38} />
          </Link>

          <nav className={Styles.nav}>
            <div className={Styles.menuOptions}>
              {menuOptions.map((option, index) => (
                <Link
                  key={index}
                  href={option.url}
                  onClick={() => setActiveMenuOption(index)}
                  className={activeMenuOption === index ? Styles.active : ''}
                >
                  <img src={option.icon} alt={option.alt} width={12} height={12} />

                  <span>{option.name}</span>
                </Link>
              ))}
            </div>

            <ProfileOption modalOpen={modalOpen} setModalOpen={setModalOpen} activeUserName={profileName} />
          </nav>

          {modalOpen && (
            <div className={Styles.modal}>
              <div className={Styles.modalContent}>
                <div className={Styles.headerModal}>
                  <h6>Selecione o perfil:</h6>

                  <div className={Styles.closeModal} onClick={() => setModalOpen(false)}>
                    <Image src={CloseModalIcon} alt="Fechar modal" width={24} height={24} />
                  </div>
                </div>

                <ul>
                  {users?.length > 0 ? (
                    users.map((user, index) => (
                      <li key={`${index}-${user.name ?? 'Perfil'}`}>
                        <ProfileOptionModal
                          modalOpen={modalOpen}
                          setModalOpen={setModalOpen}
                          UserName={user.name ?? `Perfil ${index + 1}`}
                          emailUser={user.email ?? profileEmail}
                        />
                      </li>
                    ))
                  ) : (
                    <li>
                      <ProfileOptionModal
                        modalOpen={modalOpen}
                        setModalOpen={setModalOpen}
                        UserName={profileName}
                        emailUser={profileEmail}
                      />
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </header>
      )}
    </>
  )
}
