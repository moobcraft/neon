function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

exports.run = (client, message) => {
  let odds = getRandomInt(5); // because 0 counts and 0..5 is six total numbers
  if (odds == 0) {
    if (message.member.kickable) {
      message.react('💥');
      message.channel.send('bang!');
      message.member.kick('russian roulette loser');
    }
    else {
      message.channel.send('this is the part where youd get kicked but i dont have perms to do that');
    }
  }
  else message.react('👍');
};

exports.info = {
  name: 'roulette',
  description: '1/6 chance of kick',
  usage: 'roulette',
  aliases: ['rr'],
};
