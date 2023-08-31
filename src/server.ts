import fastify from 'fastify'
import { knex } from './database'

const app = fastify()

app.listen({ port: 3000 }, async () => {
  try {
    await knex('sqlite_schema').select(`*`)
    console.log('Server is UP!')
  } catch (error) {
    console.error(error)
  }
})
