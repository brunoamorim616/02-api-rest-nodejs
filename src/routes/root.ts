import { FastifyInstance } from 'fastify'
import { transactions } from './transactions'

export async function root(app: FastifyInstance) {
  app.register(transactions, {
    prefix: 'transactions',
  })
}
