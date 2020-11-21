module.exports = (client, message) => {

  client.user.setPresence({ activity: { name: message.author.username, type: 'WATCHING' } });

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
    message.channel.send(`idk if ur tryna make me do something but idk how to do that (\`${command}\` not found)`);
    client.log.debug(`Command ${command} ran with failure`);
    return;
  }

  // Run the command
  cmd.run(client, message, args);
  client.log.debug(`Command ${command} ran with success`);
};
