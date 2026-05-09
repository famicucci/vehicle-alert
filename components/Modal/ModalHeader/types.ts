import { ReactNode } from 'react'

export interface ModalHeaderProps {
  children: ReactNode
  onClose?: () => void
}
