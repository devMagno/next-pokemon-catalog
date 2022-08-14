import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.pokemontcg.io/v2/',
  headers: {
    'X-Api-Key': String(process.env.POKEMON_TCG_KEY),
  },
})

export default api
