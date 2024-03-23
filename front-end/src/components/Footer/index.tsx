'use client'

import { LinksFooter } from '@/shared/enums/LinksFooter'
import LinkedinLogo from '@/public/linkedin-logo.svg'
import EmailLogo from '@/public/email-logo.svg'
import GitHubLogo from '@/public/github-logo.svg'
import Link from 'next/link'
import Image from 'next/image'
import Styles from './footer.module.scss'

export default function Footer() {
  const socialMedias = [
    { icon: LinkedinLogo, link: LinksFooter.LINKEDIN, alt: 'Linkedin' },
    { icon: EmailLogo, link: LinksFooter.EMAIL, alt: 'Email' },
    { icon: GitHubLogo, link: LinksFooter.GITHUB, alt: 'GitHub' },
  ]

  return (
    <footer className={Styles.footer}>
      <div className={Styles.container}>
        <div className={Styles.medias}>
          {socialMedias.map((media, index) => (
            <Link key={index} href={media.link} target="_blank">
              <Image src={media.icon} alt={media.alt} width={32} height={32} />
            </Link>
          ))}
        </div>

        <div className={Styles.smaillDivider} />

        <div className={Styles.copyright}>
          <p>© 2024 FistarolFlix - Anna Luiza Fistarol</p>
        </div>
      </div>

      <small className={Styles.credits}>
        Créditos das imagens do banner de Login (
        <Link href={LinksFooter.LOGINBANNER} target="_blank">
          Saint Gregory
        </Link>
        ) e dos demais conteúdos(
        <Link href={LinksFooter.CONTENTS} target="_blank">
          TMDB
        </Link>
        ).
      </small>
    </footer>
  )
}
