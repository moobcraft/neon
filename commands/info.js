const { MessageEmbed } = require('discord.js');
exports.run = (client, message) => {
  const infoEmbed = new MessageEmbed()
  // TODO: make it inherit its highest role color in the server
    .setColor(client.config.color)
    .setTitle(`${client.user.username} Info`)
  // TODO: put actual useful info
    .setDescription(`${client.user.tag} (\`${client.user.id}\`)\n\
		More info someday.`);
  message.channel.send(infoEmbed);
};

exports.info = {
  name: 'info',
  description: 'Get info about the bot client',
  usage: 'info',
  aliases: ['i'],
};
