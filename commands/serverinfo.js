const Discord = require('discord.js');
exports.run = (client, message) => {
  message.channel.send('Broken for now...')
  /*
  const guild = message.guild;
  const serverInfoEmbed = new Discord.MessageEmbed()
  // TODO: make it inherit its highest role color in the server
    .setColor(client.config.color)
    .setTitle(guild.name)
  // TODO: put actual useful info
    .setDescription(`Owned by ${guild.owner.user.tag}\n\
		Created at ${guild.createdAt}\n\
		${guild.memberCount} members\n\
		${guild.premiumSubscriptionCount} boosts bringing it to level ${guild.premiumTier}`);
  message.channel.send(serverInfoEmbed);
  */
};

exports.info = {
  name: 'serverinfo',
  description: 'Get info about the server',
  usage: 'serverinfo',
};
