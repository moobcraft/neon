function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

exports.run = (client, message) => {
  let odds = getRandomInt(5); // because 0 counts and 0..5 is six total numbers
  if (odds == 0) {
    if (message.member.kickable) {
      message.channel.send('bang bang bang fucker');
      message.member.kick('russian roulette loser');
    }
    else {
      message.channel.send('bang bang bang but i cant kick you so could you please leave the server yourself and pretend it was a kick');
    }
  }
  else message.channel.send('click!');
};

exports.info = {
  name: 'roulette',
  description: '1/6 chance of kick',
  usage: 'roulette',
  aliases: ['rr'],
};
