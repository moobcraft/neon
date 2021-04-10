const { MessageEmbed } = require('discord.js');
const Pokedex = require('pokedex-promise-v2');
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

const colors = {
	"blue": "0000ff"
};
var dex = new Pokedex();
exports.run = (client, message, args) => {
  if (!args[0]) { // didnt pass an arg
    message.channel.send('example: dex feraligatr');
    return;
  }
  dex.getPokemonByName(args[0])
    .then(function(response) {
      const embed = new MessageEmbed()
    .setColor(colors.blue) // TODO: use actual pokemons color
    .setTitle(response.name.capitalize())
    .setThumbnail(response.sprites.front_default)
    .addField("Pokedex Number",response.id)
    .addField("Height", response.height + " decimeters???")
    .addField("Weight", response.weight + " hectograms???");
      message.channel.send(embed);
    })
};

exports.info = {
  name: 'dex',
  description: 'some pokedex',
  usage: 'dex <id/name>',
  aliases: ['pokedex', 'pd'],
};
