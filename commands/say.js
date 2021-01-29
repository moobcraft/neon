exports.run = (client, message) => {
  // send the same message it received, but with the length of the prefix cut off plus three more characters
  message.channel.send(message.content.substring(client.config.prefix.length + 3))
  // delete the message right after we do what we were told so it looks like its just the bot talking
    .then(message.delete());
};

exports.info = {
  name: 'say',
  description: 'Make the bot repeat a message',
  usage: 'say <message>',
  aliases: ['s'],
};
