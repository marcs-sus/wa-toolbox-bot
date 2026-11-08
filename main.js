import { Client } from 'whatsapp-web.js'
import qrcode from 'qrcode-terminal'

const client = new Client()

client.on('ready', () => {
  console.log('Client is ready!')
})

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true })
})

client.initialize()

// Listening to all incoming messages
client.on('message_create', (message) => {
  if (message.body === '!ping') {
    client.sendMessage(message.from, 'pong')
  }
})
