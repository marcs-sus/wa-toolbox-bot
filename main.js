import path from 'node:path'
import { fileURLToPath } from 'node:url'
import wwebjs from 'whatsapp-web.js'
import qrcode from 'qrcode-terminal'
import { loadCommands } from './lib/loadCommands.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const { Client, LocalAuth } = wwebjs

const PREFIX = '!'

const commands = await loadCommands(path.join(__dirname, 'modules'))

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

client.on('message_create', async (message) => {
  if (!message.body.startsWith(PREFIX)) return

  const [name, ...args] = message.body.slice(PREFIX.length).trim().split(/\s+/)
  const command = commands.get(name.toLowerCase())

  if (!command) return

  await command.execute({ message, args, client, commands })
})

client.initialize()
