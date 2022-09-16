import { useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { Skeleton } from 'antd'

import styles from './ImageWithSkeleton.module.scss'

export default function ImageWithSkeleton(props: ImageProps) {
  const [isSkeletonActive, setIsSkeletonActive] = useState(true)

  return (
    <div className={styles.wrapper}>
      {isSkeletonActive && (
        <Skeleton.Image active={isSkeletonActive} className={styles.skeleton} />
      )}

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
