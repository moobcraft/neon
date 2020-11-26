# Neon

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/332b9a2756944f078202bfe0e6845283)](https://app.codacy.com/gh/moobcraft/neon?utm_source=github.com&utm_medium=referral&utm_content=moobcraft/neon&utm_campaign=Badge_Grade)

some discord bot that will someday do neat things for a server

the code is shit and im aware of that. if you wanna point out rarted things im
doing so i can do it better then go for it gamer

## Running

### Dependencies

This project depends on:

[discord.js] for the whole discord thing,\
[noogger] for logging,\
[enmap] for commands,\
fs for managing files like config.json

Running `npm ci`  will install all of these.

### Setup

This project stores information like discord's access token, the prefix, the
color, and the id of the owner inside of `./config.json`.

To set it up, copy `defaultconfig.json` to `config.json` and add a token and
set your discord id as the owner

### Starting

Run `npm run start` (which runs `node main.js`) to start the bot. you can do
this in a normal term, or run it in a screen/tmux so it persists when you close
the terminal window.

### Updating

You can update the bot from the master branch by running `npm run update`
(which runs `git pull origin master`).

[discord.js]: https://www.npmjs.com/package/discord.js
[noogger]: https://www.npmjs.com/package/noogger 
[enmap]: https://www.npmjs.com/package/enmap