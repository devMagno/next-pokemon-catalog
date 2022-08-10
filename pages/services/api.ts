import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.pokemontcg.io/v2/',
  headers: {},
})

export default api
