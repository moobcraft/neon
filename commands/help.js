exports.run = (client, message, args) => {
  if (!args[0]) {
    const commandArray = client.commands.array();
    let list = 'Command List';
    commandArray.forEach(element => {
      list += `\n \n Command: ${client.config.prefix}${element.info.name} \n Description: ${element.info.description} \n Usage: \`${client.config.prefix}${element.info.usage}\``;
    });
    message.channel.send(list);
    return;
  }

  const command = client.commands.get(args[0]);
  if (!command) {
    message.channel.send(`Command ${args[0]} not found!`);
    return;
  }
  message.channel.send(`Command: ${client.config.prefix}${command.info.name} \n Description: ${command.info.description} \n Usage: \`${client.config.prefix}${command.info.usage}\``);
};

exports.info = {
  name: 'help',
  description: 'List commands or get info about one',
  usage: 'help [command]',
};
