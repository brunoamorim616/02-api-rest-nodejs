import fastify from 'fastify'
import { knex } from './database'
import { root } from './routes/root'

const app = fastify()

app.register(root, { prefix: 'api' })

app.listen({ port: 3000 }, async () => {
  try {
    await knex('sqlite_schema').select(`*`)
    console.log('Server is UP!')
  } catch (error) {
    console.error(error)
  }
})
