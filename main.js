let Discord, Enmap, fs;
try {
  Discord = require('discord.js');
  Enmap = require('enmap');
  fs = require('fs');
} catch {
  console.log('Dependencies not installed! Run "npm ci" to install them.');
  process.exit(5);
}
const client = new Discord.Client();
try {
  client.config = require('./config.json');
  if (client.config.token === 'TOKEN HERE') {
    console.log('Config doesn\'t have a token!');
    process.exit(5);
  }
} catch {
  console.log('Config not created! Copy ./defaultconfig.json to ./config.json and give it a token!');
  process.exit(5);
}

// log level thingy for the console
let logParams;
switch(client.config.logLevel) {
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

client.login(client.config.token);
