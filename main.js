import wwebjs from 'whatsapp-web.js'
import qrcode from 'qrcode-terminal'

const { Client, LocalAuth } = wwebjs

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
})

client.on('ready', () => {
  console.log('Client is ready!')
})

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true })
})

client.initialize()

client.on('message_create', (message) => {
  if (message.body === '!ping') {
    client.sendMessage(message.from, 'pong')
  }
})
