let Discord, Enmap, fs;
try {
  Discord = require('discord.js');
  Enmap = require('enmap');
  fs = require('fs');
} catch {
  console.log('Dependencies not installed! Run "npm ci" to install them.');
  return;
}
const client = new Discord.Client();
try {
  client.config = require('./config.json');
} catch {
  console.log('Config not created! Copy ./defaultconfig.json to ./config.json and give it a token!');
  return;
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

// valid types: PLAYING, STREAMING, LISTENING, WATCHING
const statuses = [
  ['WATCHING', 'gamers'],
  ['PLAYING', 'Minecraft'],
  ['WATCHING', 'your mom'],
  ['PLAYING', 'your mom'],
  ['WATCHING', 'nyanners vods'],
  ['WATCHING', 'artemis of the blue clips'],
  ['LISTENING', 'lemon demon'],
  ['LISTENING', 'caravan palace'],
  ['LISTENING', 'pigstep'],
  ['STREAMING', 'roblox'],
  ['PLAYING', 'osu!'],
  ['PLAYING', 'Impact Utility Mod'],
  ['PLAYING', 'Fortnite'],
];
setInterval(function() { // set a random status every fifteen minutes
  const rand = statuses[Math.floor(Math.random() * statuses.length)];
  setTimeout(function() { // it pisses itself if we don't wait a second
    client.log.debug('Setting random status to ' + rand[0] + rand[1]);
    client.user.setPresence({ activity: { name: rand[1], type: rand[0] } });
  }, 1000); // 1 second
}, 900000); // 15 minutes
// for the first 15 mins it wont have a status but i cba to do something about it

client.login(client.config.token);
