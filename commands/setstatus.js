exports.run = (client, message, args) => {
  const activityType = args[0];
  const activityName = args.slice(1).join(' ');
  if (!activityName) { // didnt pass a second arg
    message.channel.send('Send it like this: WATCHING obama play minecraft');
    return;
  }
  // i bet theres a better way of doing that lmao
  if (activityType !== 'PLAYING' && activityType !== 'WATCHING' && activityType !== 'STREAMING' && activityType !== 'LISTENING') { // first arg was bad
    message.channel.send('Invalid type! Valid types: PLAYING, WATCHING, STREAMING, LISTENING');
    return;
  }

  // probably not the best way to do this but here we go
  client.log.debug(`Setting status to ${activityType} ${activityName}`);
  client.user.setPresence({ activity: { name: activityName, type: activityType } });
  message.react('✅');
};

exports.info = {
  name: 'setstatus',
  description: 'Set the bot\'s playing status until its next reset',
  usage: 'setstatus <PLAYING|WATCHING|STREAMING|LISTENING> <status>',
  aliases: ['status', 'ss'],
  ownerOnly: true,
};
