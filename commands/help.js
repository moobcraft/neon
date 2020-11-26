exports.run = (client, message, args) => {
  if (!args[0]) {
    const commandArray = client.commands.array();
    let list = 'Command List';
    commandArray.forEach(element => {
      list += `

Command: ${client.config.prefix}${element.info.name}
Description: ${element.info.description}
Usage: \`${client.config.prefix}${element.info.usage}\``;
    });
    message.channel.send(list);
    // somehow send list of commands without hardcoding it
    return;
  }

  const command = client.commands.get(args[0]);
  if (!command) {
    message.channel.send(`Command ${args[0]} not found!`);
    return;
  }
  message.channel.send(`
Command: ${client.config.prefix}${command.info.name}
Description: ${command.info.description}
Usage: \`${client.config.prefix}${command.info.usage}\`
`);
};

exports.info = {
  name: 'help',
  description: 'List commands or get info about one',
  usage: 'help [command]',
};
