module.exports = (client, message) => {

  // Ignore all bots
  if (message.author.bot) return;

  // Ignore immature peuple who shouldnt be allowed to use my bot
  if message.author.id == '331410049131872268') return;

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
    return;
  }

  if (cmd.info.ownerOnly && message.author.id !== client.config.owner) {
    message.channel.send(`\`${command}\` is owner only!`);
    return;
  }

  // Run the command
  cmd.run(client, message, args);
};
