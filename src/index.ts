import express, { type Express } from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { z } from 'zod'
import { validateRequestBody, validateRequestParams } from 'zod-express-middleware'
import { urlService } from './services/url.service'
import { generateRandomString } from './utils'
import { zEnv } from './zenv'

const app: Express = express()
const server = http.createServer(app)

const io = new Server(server)

// When a client responds with the received token, then mark it as delivered.
// The client should sent `shortened-ack` event to confirm the url is delivered.
io.on('shortened-ack', async (token: string) => {
  if (typeof token === 'string' && token) {
    await urlService.markDelivered(token)
  }
})

// When a new client is connected, broadcast all the undelivered tokens to make sure the client received.
io.on('connection', async (socket) => {
  const shortenedURLs = await urlService.getUndeliveredUrls()
  shortenedURLs.forEach((shortenedURL) => {
    socket.emit('shortened', { shortenedURL })
  })
})

app.use(express.json())

app.post(
  '/url',
  validateRequestBody(
    z.object({
      url: z.string().min(1),
    })
  ),
  async (req, res) => {
    const token = generateRandomString(10)
    const shortenedURL = `${req.protocol}://${req.get('host')}${req.baseUrl}/${token}`
    urlService.saveUrl({ url: req.body.url, token, shortenedURL })
    io.emit('shortened', { shortenedURL })
    res.json({ success: true })
  }
)

app.get(
  '/:token',
  validateRequestParams(
    z.object({
      token: z.string().min(1),
    })
  ),
  async (req, res) => {
    const url = await urlService.getUrl(req.params.token)
    if (!url) {
      res.status(404).send('Not Found')
      return
    }
    res.json({ url })
  }
)

server.listen(zEnv.PORT, () => {
  console.log(`Server is running at ${zEnv.PORT}`)
})
