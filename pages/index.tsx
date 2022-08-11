import { Button } from 'antd'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { TbPokeball } from 'react-icons/tb/'
import Title from '../components/Title'

import api from '../services/api'

import styles from '../styles/Home.module.scss'

interface HomeProps {
  types: string[]
}

export default function Home({ types }: HomeProps): JSX.Element {
  return (
    <main className={`main ${styles.home}`}>
      <Head>
        <title>Pokémon TCG - Home</title>
      </Head>

      <Title
        title="Pokémon TCG"
        icon={<TbPokeball size="32px" />}
        subtitle="Choose your type!"
      />

      <nav className={styles.typesContainer}>
        {types.map((type) => (
          <Link href={`/type/${type.toLowerCase()}`} passHref key={type}>
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
