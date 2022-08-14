import { motion } from 'framer-motion'
import TypeIcon from '../TypeIcon'

import { CardData } from '../../types/card'

import styles from './PokeModal.module.scss'

interface PokeModalProps {
  data: CardData
  type: string
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

export default function PokeCard({
  data,
  type,
  handleCloseModal,
}: PokeModalProps) {
  const {
    name,
    hp,
    flavorText,
    abilities,
    attacks,
    subtypes,
    weaknesses,
    resistances,
  } = data

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
        <div className={styles.content}>
          <h3 className={styles.name}>
            {name} <TypeIcon type={type} />
          </h3>

          {hp && <h4 className={styles.hp}>{hp} HP</h4>}

          {flavorText && <p>{flavorText}</p>}

          {abilities && abilities.length && (
            <div className={styles.abilities}>
              <span className={styles.title}>Abilities:</span>
              <ul>
                {abilities.map((ability) => (
                  <li key={ability.name}>
                    <p className={styles.attackName}>
                      <span className={styles.abilityType}>
                        ({ability.type})
                      </span>

                      {ability.name}
                    </p>
                    {ability.text && (
                      <p className={styles.attackText}>{ability.text}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

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
                    <p className={styles.attackName}>
                      {attack.name}
                      {attack.damage && <span>{attack.damage}</span>}
                    </p>
                    {attack.text && (
                      <p className={styles.attackText}>{attack.text}</p>
                    )}
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

          {resistances && resistances.length && (
            <div className={styles.weaknesses}>
              <span className={styles.title}>Resistances:</span>
              <ul>
                {resistances.map((resistance) => (
                  <li key={resistance.type}>
                    <TypeIcon type={resistance.type} /> {resistance.value}
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
      </motion.div>
    </motion.div>
  )
}
