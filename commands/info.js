const Discord = require('discord.js');
exports.run = (client, message) => {
  const infoEmbed = new Discord.MessageEmbed() // create the fancy embed
  // TODO: make it inherit its highest role color in the server
    .setColor(client.config.color) // use color defined in config
    .setTitle(`${client.user.username} Info`) // make its title user the bot's username
  // TODO: put actual useful info
    .setDescription(`${client.user.tag} (\`${client.user.id}\`)\n\
		More info someday.`); // you can use \n newlines and escape actual newlines :)
  message.channel.send(infoEmbed); // send the embed
};
