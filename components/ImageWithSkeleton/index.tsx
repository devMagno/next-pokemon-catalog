import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

import styles from './ImageWithSkeleton.module.scss'

export default function ImageWithSkeleton(props: ImageProps) {
  const [isSkeletonActive, setIsSkeletonActive] = useState(true)

  return (
    <div className={styles.wrapper}>
      {isSkeletonActive && <div className={styles.skeleton} />}
      <Image
        onLoad={() => {
          setIsSkeletonActive(false)
        }}
        style={{ opacity: isSkeletonActive ? 0 : 1 }}
        className={styles.img}
        {...props}
      />
    </div>
  )
}
