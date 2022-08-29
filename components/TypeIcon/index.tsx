import Image from 'next/image'

interface TypeIconProps {
  type: string
}

export default function TypeIcon({ type }: TypeIconProps) {
  return (
    <Image
      src={`/types/${type.toLowerCase()}.webp`}
      width={20}
      height={20}
      alt={`${type} icon image`}
      title={`${type} icon image`}
    />
  )
}
