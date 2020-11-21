// usual important stuff
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const Enmap = require('enmap');
const config = require('./config.json');
client.config = config;
let logParams;

// log level thingy for the console
switch(config.logLevel) {
case 'debug':
  logParams = { consoleOutputLevel: 7 };
  break;
case 'info':
  logParams = { consoleOutputLevel: 6 };
  break;
case 'notice':
  logParams = { consoleOutputLevel: 5 };
  break;
case 'warning':
  logParams = { consoleOutputLevel: 4 };
  break;
case 'error':
  logParams = { consoleOutputLevel: 3 };
  break;
case 'critical':
  logParams = { consoleOutputLevel: 2 };
  break;
case 'alert':
  logParams = { consoleOutputLevel: 1 };
  break;
case 'emergency':
  logParams = { consoleOutputLevel: 0 };
  break;
case 'none':
  logParams = { consoleOutput : false };
}

client.log = require('noogger').init(logParams);

// grab all events and load them all up
fs.readdir('./events/', (err, files) => {
  if (err) return client.log.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    const eventName = file.split('.')[0];
    client.on(eventName, event.bind(null, client));
    client.log.debug(`Loaded event ${eventName}`);
  });
});

// grab all commands and throw them in an enmap
client.commands = new Enmap();
fs.readdir('./commands/', (err, files) => {
  if (err) return client.log.error(err);
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    const props = require(`./commands/${file}`);
    const commandName = file.split('.')[0];
    client.commands.set(commandName, props);
    client.log.debug(`Loaded command ${commandName}`);
  });
});

client.login(config.token); // actually log into the bot
