import { Button, Col, Row } from 'antd'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { LoadingOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { TbArrowLeft } from 'react-icons/tb'
import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import PokeCard from '../../components/PokeCard'
import PokeModal from '../../components/PokeModal'
import Title from '../../components/Title'
import api from '../../services/api'
import { CardData } from '../../types/card'

import styles from './type.module.scss'
import SEO from '../../components/SEO'

interface IParams extends ParsedUrlQuery {
  type: string
}

interface TypeProps {
  type: string
  data: CardData[]
  count: number
}

export default function Type({ type, data, count }: TypeProps) {
  const { isFallback } = useRouter()

  if (isFallback)
    return (
      <div className="main">
        <LoadingOutlined style={{ fontSize: '32px' }} />
      </div>
    )

  const typeDisplay = type[0].toUpperCase() + type.slice(1)

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

  return (
    <main className="main">
      <SEO
        title={`Pokémon TCG - ${typeDisplay} type`}
        ogImage="og.png"
        description={`The Pokémon Trading Card Game abbreviated as PTCG or Pokémon TCG, is a collectible card game based on the Pokémon franchise. Check all the collectible cards of the ${typeDisplay} type!`}
      />

      <Title
        type={type}
        title={`${typeDisplay} type`}
        subtitle={`${count} results found`}
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

          <AnimatePresence
            initial={false}
            exitBeforeEnter
            onExitComplete={() => null}
          >
            {modalData && (
              <PokeModal
                data={modalData as CardData}
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
