import { app } from './app'
import { knex } from './database'
import { env } from './env'

app.listen({ port: env.PORT }, async () => {
  try {
    if (env.DATABASE_CLIENT === 'sqlite')
      await knex('sqlite_schema').select(`*`)
    console.log('Server is UP!')
  } catch (error) {
    console.error(error)
  }
})
