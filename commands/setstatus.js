exports.run = (client, message, args) => {
  if (!args[1]) {
    message.channel.send('Send it like this: WATCHING obama play minecraft');
    return;
  }

  // probably not the best way to do this but here we go
  const temp = args.slice(1);
  const secondArg = temp.join(' ');
  client.log.debug(`Setting status to ${args[0]} ${secondArg}`);
  client.user.setPresence({ activity: { name: secondArg, type: args[0] } });
  message.react('✅');
};

exports.info = {
  name: 'setstatus',
  description: 'Set the bot\'s playing status until its next reset',
  usage: 'setstatus <PLAYING|WATCHING|STREAMING|LISTENING> <status>',
  aliases: ['status', 'ss'],
  ownerOnly: true,
};
