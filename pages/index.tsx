import { Button } from 'antd'
import { GetStaticProps } from 'next'
import Link from 'next/link'

import { TbPokeball } from 'react-icons/tb/'
import SEO from '../components/SEO'
import Title from '../components/Title'

import api from '../services/api'

import styles from '../styles/Home.module.scss'

interface HomeProps {
  types: string[]
}

export default function Home({ types }: HomeProps): JSX.Element {
  return (
    <main className={`main ${styles.home}`}>
      <SEO
        title="Pokémon TCG - Home"
        ogImage="og.png"
        description="The Pokémon Trading Card Game abbreviated as PTCG or Pokémon TCG, is a collectible card game based on the Pokémon franchise. Choose your type and see all the collectible cards!"
      />

      <Title
        title="Pokémon TCG"
        icon={<TbPokeball size="32px" />}
        subtitle="Choose your type!"
      />

      <nav className={styles.typesContainer}>
        {types.map((type) => (
          <Link href={`/${type.toLowerCase()}/1`} passHref key={type}>
            <Button
              key={type}
              size="large"
              className={`typeButton ${type.toLowerCase()}`}
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
