/* This file is very specific to my own use case, dont expect it to work
on your own machine unless you somehow bodged your own bedrock server
together in exactly the same way that i did lmfao */

// this file works with ../whitelist.sh... somehow

const { exec } = require('child_process');

exports.run = (client, message, args) => {
  // if we weren't passed a specific command, list all of them
  if (!args[0]) {
    message.channel.send('bruh what am i gonna do with that');
    return;
  } else {
    exec(`./whitelist.sh ${args[0]}`);
    message.channel.send(`aight, added ${args[0]} to the whitelist`);
  }
};

exports.info = {
  name: 'whitelist',
  description: 'Whitelist someone on the bedrock server',
  usage: 'whitelist <playername>',
  aliases: ['wl'],
  ownerOnly: false, // unless someone ruins it
};
