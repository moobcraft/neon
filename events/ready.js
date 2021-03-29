module.exports = (client) => {
  client.log.info(`Logged in as ${client.user.tag}`);
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
    ['PLAYING', 'among us'],
    ['LISTENING', 'chug jug song'],
  ];
  function updateStatus() {
    const rand = statuses[Math.floor(Math.random() * statuses.length)];
    client.log.debug(`Setting status to ${rand[0]} ${rand[1]}`);
    client.user.setPresence({ activity: { name: rand[1], type: rand[0] } });
  }
  setTimeout(updateStatus, 1000); // piss
  setInterval(updateStatus, 900000); // 15 minutes
};
