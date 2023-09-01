import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'crypto'

export async function transactions(app: FastifyInstance) {
  app.get('/', async () => {
    const transactions = await knex('transactions').select('*')

    return { transactions }
  })

  app.get('/:id', async (request) => {
    const getTransactionParamsScheme = z.object({
      id: z.string(),
    })

    const validatedData = getTransactionParamsScheme.parse(request.params)

    const transaction = await knex('transactions')
      .where({
        id: validatedData.id,
      })
      .first()

    return { ...transaction }
  })

  app.post('/', async (request, reply) => {
    const createTransactionScheme = z.object({
      title: z.string(),
      description: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const validatedData = createTransactionScheme.parse(request.body)

    await knex('transactions').insert({
      ...validatedData,
      id: randomUUID(),
      created_at: new Date().toISOString(),
      amount:
        validatedData.type === 'credit'
          ? validatedData.amount
          : validatedData.amount * -1,
    })

    return reply.status(201).send()
  })
}
