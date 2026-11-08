export default {
  name: 'help',
  description: 'Lists available commands.',

  execute({ message, client, commands }) {
    const PREFIX = '!'

    const lines = ['*Available commands:*']

    for (const cmd of commands.values()) {
      lines.push(`${PREFIX}${cmd.name} - ${cmd.description}`)
    }

    client.sendMessage(message.from, lines.join('\n'))
  },
}
