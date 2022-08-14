import { NextApiRequest, NextApiResponse } from 'next'
import api from '../../services/api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { type, pageSize, page } = req.query

  if (req.method === 'GET') {
    const response = await api.get(
      `cards?q=types:${type}&pageSize=${pageSize}&page=${page}`,
    )

    res.status(200).json(response.data)
  } else {
    res.status(405).end()
  }
}
