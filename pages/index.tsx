import { Button } from 'antd'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { TbPokeball } from 'react-icons/tb/'

import api from './services/api'

import styles from '../styles/Home.module.scss'

interface HomeProps {
  types: string[]
}

export default function Home({ types }: HomeProps): JSX.Element {
  return (
    <main className={styles.main}>
      <Head>
        <title>Pokémon TCG - Home</title>
      </Head>

      <h1>
        Pokémon TCG <TbPokeball size="32px" />
      </h1>

      <p>Choose your type!</p>

      <nav className={styles.typesContainer}>
        {types.map((type) => (
          <Link href="#temp" passHref>
            <Button
              key={type}
              size="large"
              className={`${styles.typeButton} ${type.toLowerCase()}`}
            >
              {type}
            </Button>
          </Link>
        ))}
      </nav>
    </main>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const response = await api.get('types')

  const types = response.data.data

  return {
    props: {
      types,
    },
  }
}
