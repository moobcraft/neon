function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

exports.run = (client, message, args) => {
  const Monkeys = ['🐵', '🐒', '🦧', '🙈', '🙊', '🙉', '🦍', '<:monkeybaff:758878095662645278>', '<:smug_orangutan:734782865119772673>', '<:pensive_orangutan:734782865036017747>', '<:crying_orangutan:734782864515923998>', '<:crying_gorilla:734782864498884634>', '<:pensive_gorilla:734782866457886750>', '<:sleepy_orangutan:734782865421893693>', '<:skidder_orangutan:734782865094475890>', '<:neutral_orangutan:734782865450991636>', '<:cowboy_orangutan:734782864511729721>', '<:neutral_gorilla:734782865161715803>', '<:shocked_orangutan:734782865660837948>', '<:raised_eyebrows_orangutan:734782865258184746>', '<:monke:734782864687890432>', '<:lick_orangutan:734782865447059586>', '<:rage_orangutan:734782865409179768>', '<:rage_gorilla:734782865388208128>', '<:kiss_orangutan:734782865073766421>', '<:flushed_orangutan:734782864851206165>', '<:pog_orangutan:734782865254121534>', '<:pog_gorilla:734782865463705711>', '<:curled_smile_orangutan:734782864742416435>'];

  if (args[0] > 50) {
    message.channel.send('yo, thats too many monkeys');
    return;
  }

  let local = '';
  let rand = getRandomInt(5);
  if (rand == 0)
    rand = 1;
  if (args[0])
    rand = args;
  for (let i = 1; i <= rand; i++)
    local += Monkeys[Math.floor(Math.random() * Monkeys.length)];

  // no monkeys? dont send anything lmao
  if (!local) message.channel.send('‌'); // U+200C, zero width non joiner
  else message.channel.send(local);
};
