export interface IPrimaryButton {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  type?: 'button' | 'submit' | 'reset'
}
