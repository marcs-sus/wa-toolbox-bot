import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

export async function loadCommands(dir) {
  const commands = new Map()

  const files = fs.readdirSync(dir).filter((file) => file.endsWith('.js'))

  for (const file of files) {
    const command = (await import(pathToFileURL(path.join(dir, file)))).default

    if (!command?.name || typeof command.execute !== 'function') {
      throw new Error(`Invalid command module: ${file}`)
    }

    commands.set(command.name.toLowerCase(), command)
  }

  return commands
}
