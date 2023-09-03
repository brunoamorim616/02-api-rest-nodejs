import { app } from './app'
import { env } from './env'

app.listen({ port: env.PORT }, async () => {
  try {
    console.log('Server is UP!')
  } catch (error) {
    console.error(error)
  }
})
