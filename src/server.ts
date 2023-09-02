import { app } from './app'
import { knex } from './database'

app.listen({ port: 3000 }, async () => {
  try {
    await knex('sqlite_schema').select(`*`)
    console.log('Server is UP!')
  } catch (error) {
    console.error(error)
  }
})
