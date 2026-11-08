export default {
  name: 'roll',
  description: 'Rolls dice in NdM notation (default: 1d20).',
  execute({ message, args, client }) {
    const notation = args[0] || '1d20'
    const match = /^(\d+)d(\d+)$/i.exec(notation)

    if (!match) {
      client.sendMessage(
        message.from,
        'Usage: !roll [<n>d<s>] (e.g. !roll 2d6)'
      )
      return
    }

    const count = Number(match[1])
    const sides = Number(match[2])

    if (count < 1 || count > 20 || sides < 2) {
      client.sendMessage(message.from, 'Use 1-20 dice with at least 2 sides.')
      return
    }

    const rolls = Array.from(
      { length: count },
      () => 1 + Math.floor(Math.random() * sides)
    )
    const total = rolls.reduce((a, b) => a + b, 0)
    client.sendMessage(message.from, `🎲 ${rolls.join(' + ')} = *${total}*`)
  },
}
