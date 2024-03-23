'use client'

import { IPrimaryButton } from './types'
import Link from 'next/link'
import Styles from './button.module.scss'

export default function PrimaryButton({
  children,
  onClick,
  className,
  disabled = false,
  href,
  target = '_self',
  type = 'submit',
  ...props
}: Readonly<IPrimaryButton>) {
  return (
    <>
      {href ? (
        <Link href={href} target={target} style={{ textDecoration: 'none' }}>
          <button className={`${Styles.button} ${className}`} {...props}>
            {children}
          </button>
        </Link>
      ) : (
        <button className={Styles.button} disabled={disabled} onClick={onClick} type={type} {...props}>
          {children}
        </button>
      )}
    </>
  )
}
