import Image from 'next/image'

interface TypeIconProps {
  type: string
}

export default function TypeIcon({ type }: TypeIconProps) {
  return <Image src={`/types/${type}.webp`} width={20} height={20} />
}
