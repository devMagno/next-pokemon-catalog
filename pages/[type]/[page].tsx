import { useEffect, useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { Button, Col, Pagination, Row } from 'antd'
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
  totalCount: number
  page: number
}

export default function TypePage({ type, data, totalCount, page }: TypeProps) {
  const { isFallback, push } = useRouter()

  if (isFallback) return <Loader />

  const typeDisplay = type[0].toUpperCase() + type.slice(1)

  const [isLoading, setIsLoading] = useState(false)
  const [modalData, setModalData] = useState<CardData | null>(null)

  const handleCloseModal = () => {
    setModalData(null)
  }

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

  useEffect(() => {
    if (isLoading) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'auto'
  }, [isLoading])

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
        subtitle={`${totalCount} cards`}
      />

      {data.length ? (
        <>
          <Row className={styles.cards} gutter={[16, 16]}>
            {data.map((card) => (
              <Col span={24} key={card.id}>
                <PokeCard
                  data={card}
                  type={type}
                  handleOpenModal={() => setModalData(card)}
                />
              </Col>
            ))}
          </Row>

          <Pagination
            responsive
            pageSize={40}
            total={totalCount}
            showSizeChanger={false}
            defaultCurrent={page}
            className={`${type} ${styles.pagination}`}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} cards`
            }
            onChange={async (pageNumber) => {
              setIsLoading(true)
              await push(`/${type}/${pageNumber}`)
              setIsLoading(false)
            }}
          />

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

  const paths = Array.from({ length: 5 })
    .map((_, i) =>
      response.data.data
        .map((type: string) => `/${type.toLowerCase()}/${i + 1}`)
        .join(),
    )
    .join()
    .split(',')

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params as IParams
  const { type } = params
  const page = Number(params?.page) || 1

  const response = await api.get(
    `cards?q=types:${type}&page=${page}&pageSize=40`,
  )

  const props = { type, ...response.data, currentPage: page }

  return {
    props,
  }
}
