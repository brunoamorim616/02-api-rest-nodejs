import { Knex, knex as setupKnex } from 'knex'
import { env } from './env'

const connection =
  env.DATABASE_CLIENT === 'sqlite'
    ? {
        filename: env.DATABASE_URL,
        port: env.PORT,
      }
    : env.DATABASE_URL

export const config: Knex.Config = {
  client: 'sqlite3',
  connection,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
  useNullAsDefault: true,
}

export const knex = setupKnex(config)
