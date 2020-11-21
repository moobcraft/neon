const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const Enmap = require('enmap');
const config = require('./config.json');
client.config = config;
let logParams;

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

// TODO: add more events
fs.readdir('./events/', (err, files) => {
  if (err) return client.log.error(err); // this logs any error to file
  files.forEach(file => { // loop that runs through every file in the folder
    const event = require(`./events/${file}`); // sets const event to require the event file
    const eventName = file.split('.')[0]; // sets let eventName to the file name without the ".js" suffix
    client.on(eventName, event.bind(null, client));
    client.log.debug(`Loaded event ${eventName}`);
  });
});

client.commands = new Enmap(); // create an Enmap for the commands
fs.readdir('./commands/', (err, files) => { // scan ./commands for files
  if (err) return client.log.error(err); // log any error to file
  files.forEach(file => { // for loop for every command file
    if (!file.endsWith('.js')) return; // only look for js files
    const props = require(`./commands/${file}`); // set let props to require the command file
    const commandName = file.split('.')[0]; // removes the .js at the end
    client.commands.set(commandName, props); // put the command in the client.commands enmap
    client.log.debug(`Loaded command ${commandName}`);
  });
});

client.login(config.token); // actually log into the bot
