import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'crypto'

export async function transactions(app: FastifyInstance) {
  app.get('/', async () => {
    const transactions = await knex('transactions').select('*')

    return { transactions }
  })

  app.get('/:id/', async (request) => {
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
      title: z.string().nonempty("Title can't be empty"),
      description: z.string().nonempty("Description can't be empty"),
      amount: z.number().min(0.01, "Amount can't be less than 0.01"),
      type: z.enum(['credit', 'debit']).default('credit'),
    })

    const { title, amount, description, type } = createTransactionScheme.parse(
      request.body,
    )

    await knex('transactions').insert({
      title,
      description,
      id: randomUUID(),
      amount: type === 'credit' ? amount : amount * -1,
    })

    return reply.status(201).send({
      message: 'Transaction created successfully',
    })
  })
}
