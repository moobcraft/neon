const { MessageEmbed } = require('discord.js');
const Pokedex = require('pokedex-promise-v2');
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

const colors = { // these are yoinked from discord lol
  "black":  "121314",
	"blue":   "3498db",
  "brown":  "a84300",
  "gray":   "607d8b",
  "green":  "2ecc71",
  "pink":   "e91e63",
  "purple": "9b59b6",
  "red":    "e74c3c",
  "white":  "eeeeee",
  "yellow": "f1c40f",
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
    .setURL(response.forms[0].url)
    .addField("Pokedex Number",response.id)
    .addField("Height", `${response.height / 10}m (${response.height * .3281}ft)`) // TODO: rounding
    .addField("Weight", `${response.weight / 10}kg (${response.weight / 4.536}lbs)`);
      message.channel.send(embed);
    })
};

exports.info = {
  name: 'dex',
  description: 'some pokedex',
  usage: 'dex <id/name>',
  aliases: ['pokedex', 'pd'],
};
