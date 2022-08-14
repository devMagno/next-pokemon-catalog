import { Button } from 'antd'
import Card from 'antd/lib/card'

import ImageWithSkeleton from '../ImageWithSkeleton'
import TypeIcon from '../TypeIcon'

import { CardData } from '../../types/card'

import styles from './PokeCard.module.scss'

interface PokeCardProps {
  data: CardData
  type: string
  handleOpenModal: () => void
}

export default function PokeCard({
  data,
  type,
  handleOpenModal,
}: PokeCardProps) {
  const { name, attacks, subtypes, weaknesses, images } = data

  return (
    <Card className={styles.cardWrapper}>
      <div className={`${styles.card} ${type}`}>
        <ImageWithSkeleton
          alt={name}
          title={name}
          width={245}
          height={342}
          src={images.small}
          className={styles.image}
        />

        <div className={styles.content}>
          <p className={styles.name}>{name}</p>
          {attacks && attacks.length && (
            <div className={styles.attacks}>
              <span className={styles.title}>Attacks:</span>
              <ul>
                {attacks.map((attack) => (
                  <li key={attack.name}>
                    {attack.cost.map((costType, index) => (
                      <TypeIcon
                        type={costType.toLowerCase()}
                        key={`${costType}-${index}`}
                      />
                    ))}
                    <p>
                      {attack.name}

                      {attack.name && <span>{attack.damage}</span>}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {weaknesses && weaknesses.length && (
            <div className={styles.weaknesses}>
              <span className={styles.title}>Weaknesses:</span>
              <ul>
                {weaknesses.map((weakness) => (
                  <li key={weakness.type}>
                    <TypeIcon type={weakness.type} /> {weakness.value}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {subtypes && subtypes.length && (
            <div className={styles.subtypes}>
              <span className={styles.title}>
                {subtypes.length > 1 ? 'Subtypes:' : 'Subtype:'}
              </span>
              <ul className={styles.subtypes}>
                {subtypes.map((subtype) => (
                  <li key={subtype}>{subtype}</li>
                ))}
              </ul>
            </div>
          )}

          <Button
            className={`typeButton ${type}`}
            onClick={() => {
              handleOpenModal()
            }}
          >
            See more
          </Button>
        </div>
      </div>
    </Card>
  )
}
