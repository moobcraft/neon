# Neon

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/332b9a2756944f078202bfe0e6845283)](https://app.codacy.com/gh/moobcraft/neon?utm_source=github.com&utm_medium=referral&utm_content=moobcraft/neon&utm_campaign=Badge_Grade)

some dumb discord bot for a friend group's server

## Running

### Dependencies

This project depends on:

[discord.js] for the whole discord thing,\
[noogger] for logging,\
[enmap] for commands,\
fs for managing files like config.json

Running `npm i`  will install all of these.

### Setup

Run `./install.sh` to automagically install! This will use sudo.

After running the install script, you should give the config a token, and
optionally change it's color, owner ID or prefix. You should also tell
systemctl to enable the bot on startup with `sudo systemctl enable neon`.

### Starting

Either run `sudo systemctl start neon` or manually run `npm run start` to start
the bot.

### Updating

You can update the bot from the master branch by running `npm run update`
(which runs `git pull origin master`).

## Thanks

Thank you [skylykat] for help with the client status ([#2](https://github.com/moobcraft/neon/pull/2))

[discord.js]: https://www.npmjs.com/package/discord.js
[noogger]: https://www.npmjs.com/package/noogger
[enmap]: https://www.npmjs.com/package/enmap

[skylykat]: https://github.com/skylykat
