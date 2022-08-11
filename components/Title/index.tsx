import { ReactNode } from 'react'

import styles from './Title.module.scss'

interface TitleProps {
  title: string
  subtitle?: string
  icon?: ReactNode
  type?: string
}

export default function Title({ title, subtitle, icon, type }: TitleProps) {
  return (
    <>
      <h1 className={`${styles.title} ${type}`}>
        <span>{title}</span> {!!icon && icon}
      </h1>

      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </>
  )
}
