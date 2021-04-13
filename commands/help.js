const { MessageEmbed } = require('discord.js');

exports.run = (client, message, args) => {
  // create an embed and give it the right color
  const helpEmbed = new MessageEmbed()
    .setColor(client.config.color);

  function listAliases(aliasArray) {
    if (!aliasArray) {
      return('none');
    } else {
      return(aliasArray.join(', '));
    }
  }
  function commandInfo(command) {
    /* add a field to the embed that looks like this:
    n!info
    Description: Get info about the bot client
    Usage: a!info
    Aliases: i */
    helpEmbed.addField(client.config.prefix + command.info.name, `Description: ${command.info.description}\nUsage: \`${client.config.prefix}${command.info.usage}\`\nAliases: ${listAliases(command.info.aliases)}`);
    return;
  }

  // if we weren't passed a specific command, list all of them
  if (!args[0]) {
    const commandArray = client.commands.array();
    helpEmbed.setTitle('Command List');
    commandArray.forEach(element => {
      if (element.info.ownerOnly && message.author.id !== client.config.owner || element.info.hidden) return;
      else commandInfo(element);
    });
    message.channel.send(helpEmbed);
    return;
  }

  // if the command doesn't exist or it's hidden, complain
  let command = client.commands.get(args[0]);
  if (!command) command = (client.commands.find(val => val.info.aliases.includes(args[0])));
  if (!command || command.info.hidden) {
    message.channel.send(`Command ${args[0]} not found!`);
    return;
  }

  // if we got this far, we must have been passed a valid, unhidden command
  // so lets add a field to the embed for that command and send it
  commandInfo(command);
  message.channel.send(helpEmbed);
};

exports.info = {
  name: 'help',
  description: 'List commands or get info about one',
  usage: 'help [command]',
  aliases: ['h', '?'],
};
