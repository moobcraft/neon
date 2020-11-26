module.exports = (client, message) => {

  // Ignore all bots
  if (message.author.bot) return;

  // Ignore messages not starting with the prefix (in config.json)
  if (message.content.indexOf(client.config.prefix) !== 0) return;

  // Our standard argument/command name definition.
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command);

  // complain if command doesnt exist
  if (!cmd) {
    message.channel.send(`idk how to do that (\`${command}\` not found) but i have \`${client.config.prefix}help\``);
    client.log.debug(`Command ${command} ran with failure`);
    return;
  }

  if (cmd.info.ownerOnly && message.author.id !== client.config.owner) {
    message.channel.send(`\`${command}\` is owner only!`);
    return;
  }

  // Run the command
  cmd.run(client, message, args);
  client.log.debug(`Command ${command} ran with success`);
};
