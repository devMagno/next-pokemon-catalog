import { Button, Col, Row } from 'antd'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring'
import { TbArrowLeft } from 'react-icons/tb'
import PokeCard from '../../components/PokeCard'
import Title from '../../components/Title'
import api from '../../services/api'
import { CardData } from '../../types/card'

import styles from './type.module.scss'

interface IParams extends ParsedUrlQuery {
  type: string
}

interface TypeProps {
  type: string
  data: CardData[]
  count: number
}

export default function Type({
  type,
  data,
  count,
}: TypeProps) {
  const typeDisplay = type[0].toUpperCase() + type.slice(1)

  return (
    <main className="main">
      <Head>
        <title>Pokémon TCG - {typeDisplay} type</title>
      </Head>

      <Title
        type={type}
        title={`${typeDisplay} type`}
        subtitle={`${count} results found`}
      />

      {data.length ? (
        <Row className={styles.cards} gutter={[16, 16]}>
          {data.map((card) => (
            <Col span={24} sm={{ span: 12 }} key={card.id}>
              <PokeCard data={card} type={type} />
            </Col>
          ))}
        </Row>
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
