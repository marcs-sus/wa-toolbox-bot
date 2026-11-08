export default {
  name: 'ping',
  description: 'Replies with pong.',

  execute({ message, client }) {
    client.sendMessage(message.from, 'pong')
  },
}
