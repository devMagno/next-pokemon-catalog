import { useEffect, useRef, useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Button, Col, Row } from 'antd'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring'
import { TbArrowLeft } from 'react-icons/tb'
import { AnimatePresence } from 'framer-motion'

import PokeCard from '../../components/PokeCard'
import PokeModal from '../../components/PokeModal'
import Title from '../../components/Title'
import api from '../../services/api'
import SEO from '../../components/SEO'
import Loader from '../../components/Loader'

import { CardData } from '../../types/card'

import styles from './type.module.scss'

interface IParams extends ParsedUrlQuery {
  type: string
}

interface TypeProps {
  type: string
  data: CardData[]
  count: number
  totalCount: number
}

export default function Type({ type, data, count, totalCount }: TypeProps) {
  const { isFallback } = useRouter()

  if (isFallback) return <Loader />

  const typeDisplay = type[0].toUpperCase() + type.slice(1)

  const [modalData, setModalData] = useState<CardData | null>(null)
  const [cardsCount, setCardsCount] = useState(count)
  const [cards, setCards] = useState(data)
  const [page, setPage] = useState(2)
  const [isLoading, setIsLoading] = useState(false)
  const element = useRef<HTMLDivElement>(null)

  const handleCloseModal = () => {
    setModalData(null)
  }

  useEffect(() => {
    const loadMoreCards = async () => {
      setIsLoading((prev) => !prev)

      const response = await axios.get('/api/cards', {
        params: {
          type,
          page,
          pageSize: 40,
        },
      })

      setCardsCount((prev) => prev + response.data.count)
      setPage((prev) => prev + 1)
      setCards((prev) => [...prev, ...response.data.data])

      setIsLoading((prev) => !prev)
    }

    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) loadMoreCards()
    })

    intersectionObserver.observe(element.current as Element)

    return () => intersectionObserver.disconnect()
  }, [page, cardsCount, cards])

  useEffect(() => {
    if (isLoading) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'auto'
  }, [isLoading])

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.code === 'Escape') setModalData(null)
    }

    if (modalData !== null) {
      document.body.style.overflow = 'hidden'

      window.addEventListener('keydown', close)
    } else {
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', close)
    }
  }, [modalData])

  return (
    <main className="main">
      {isLoading && <Loader />}

      <SEO
        title={`Pokémon TCG - ${typeDisplay} type`}
        ogImage="og.png"
        description={`The Pokémon Trading Card Game abbreviated as PTCG or Pokémon TCG, is a collectible card game based on the Pokémon franchise. Check all the collectible cards of the ${typeDisplay} type!`}
      />

      <Title
        type={type}
        title={`${typeDisplay} type`}
        subtitle={`Showing ${cardsCount} of ${totalCount} cards`}
      />

      {cards.length ? (
        <>
          <Row className={styles.cards} gutter={[16, 16]}>
            {cards.map((card) => (
              <Col span={24} key={card.id}>
                <PokeCard
                  data={card}
                  type={type}
                  handleOpenModal={() => setModalData(card)}
                />
              </Col>
            ))}
          </Row>

          <AnimatePresence
            initial={false}
            exitBeforeEnter
            onExitComplete={() => null}
          >
            {modalData && (
              <PokeModal
                data={modalData as CardData}
                type={type}
                handleCloseModal={() => handleCloseModal()}
              />
            )}
          </AnimatePresence>

          <div ref={element} />
        </>
      ) : (
        <Link href="/" passHref>
          <Button type="link" className={styles.goBack}>
            <TbArrowLeft />
            Go back
          </Button>
        </Link>
      )}
    </main>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await api.get('types')

  const paths = response.data.data.map((type: string) => ({
    params: { type: type.toLowerCase() },
  }))

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { type } = context.params as IParams

  const response = await api.get(`cards?q=types:${type}&pageSize=40`)

  const props = { type, ...response.data }

  return {
    props,
  }
}
