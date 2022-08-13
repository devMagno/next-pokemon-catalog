import { motion } from 'framer-motion'
import { CardData } from '../../types/card'
import ImageWithSkeleton from '../ImageWithSkeleton'
import TypeIcon from '../TypeIcon'

import styles from './PokeModal.module.scss'

interface PokeCardProps {
  data: CardData
  handleCloseModal: () => void
}

const dropIn = {
  hidden: {
    y: '-20vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
  },
  exit: {
    y: '-20vh',
    opacity: 0,
  },
}

export default function PokeCard({ data, handleCloseModal }: PokeCardProps) {
  // eslint-disable-next-line no-unused-vars
  const { name, attacks, subtypes, weaknesses, images } = data

  console.log(data)

  return (
    <motion.div
      onClick={() => {
        handleCloseModal()
      }}
      className={styles.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={styles.modal}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className={styles.wrapper}>
          <ImageWithSkeleton
            alt={name}
            title={name}
            height={768}
            width={551}
            src={images.large}
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
                        {attack.name} {attack.damage}
                      </p>
                      <p>{attack.text}</p>
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
                      {weakness.type} {weakness.value}
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
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
