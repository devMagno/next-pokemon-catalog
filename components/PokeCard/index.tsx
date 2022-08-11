import Card from 'antd/lib/card'
import { CardData } from '../../types/card'

import styles from './Card.module.scss'

interface PokeCardProps {
  data: CardData
  type: string
}

export default function PokeCard({ data, type }: PokeCardProps) {
  const { name, attacks, subtypes, weaknesses, images } = data

  return (
    <Card className={styles.cardWrapper}>
      <div className={`${styles.card} ${type}`}>
        <figure className={styles.image}>
          <img src={images.small} alt={name} title={name} />
        </figure>

        <p className={styles.name}>{name}</p>
        {attacks && attacks.length && (
          <div className={styles.attacks}>
            <span>Attacks:</span>
            <ul>
              {attacks.map((attack) => (
                <li key={attack.name}>{attack.name}</li>
              ))}
            </ul>
          </div>
        )}

        {weaknesses && weaknesses.length && (
          <div className={styles.weaknesses}>
            <span>Weaknesses:</span>
            <ul>
              {weaknesses.map((weakness) => (
                <li key={weakness.type}>
                  {weakness.type} {weakness.value}
                </li>
              ))}
            </ul>
          </div>
        )}

        {subtypes && subtypes.length && (
          <ul className={styles.subtypes}>
            {subtypes.map((subtype) => (
              <li key={subtype}>{subtype}</li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  )
}
