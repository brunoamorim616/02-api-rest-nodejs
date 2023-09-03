import { app } from './app'

app.listen({ port: 3000 }, async () => {
  try {
    console.log('Server is UP!')
  } catch (error) {
    console.error(error)
  }
})
