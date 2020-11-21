const Discord = require('discord.js');
exports.run = (client, message) => {
  const guild = message.guild;
  const serverInfoEmbed = new Discord.MessageEmbed() // create the fancy embed
  // TODO: make it inherit its highest role color in the server
    .setColor(client.config.color) // use color defined in config
    .setTitle(guild.name) // make its title be the server name
  // TODO: put actual useful info
    .setDescription(`Owned by ${guild.owner.user.tag}\n\
		Created at ${guild.createdAt}\n\
		${guild.memberCount} members\n\
		${guild.premiumSubscriptionCount} boosts bringing it to level ${guild.premiumTier}`);
  message.channel.send(serverInfoEmbed); // send the embed
};
