function commandInfo(prefix, command) {
  return `Command: ${prefix}${command.info.name}\nDescription: ${command.info.description}\nUsage: \`${prefix}${command.info.usage}\``;
}

exports.run = (client, message, args) => {
  if (!args[0]) {
    const commandArray = client.commands.array();
    let list = 'Command List';
    commandArray.forEach(element => {
      if (element.info.ownerOnly && message.author.id !== client.config.owner) return;
      else list += `\n\n${commandInfo(client.config.prefix, element)}`;
    });
    message.channel.send(list);
    return;
  }

  const command = client.commands.get(args[0]);
  if (!command) {
    message.channel.send(`Command ${args[0]} not found!`);
    return;
  }
  message.channel.send(commandInfo(client.config.prefix, command));
};

exports.info = {
  name: 'help',
  description: 'List commands or get info about one',
  usage: 'help [command]',
  aliases: ['h', '?'],
};
