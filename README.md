# discord-badoo
An Discord.js middleware for create private voice channels for boy/girl

## How to use?
* Install `discord-badoo`
```bash
$ npm install github:vlfz/discord-badoo
```
* Use middleware in your production code
```js
const {
    middleware: DiscordBadooMiddleware
} = require('./discord-badoo');

// Discord.js client
client.on('voiceStateUpdate', DiscordBadooMiddleware({
    parentID: "CATEGORY_ID",
    boyChannelID: "BOY_CHANNEL_ID",
    girlChannelID: "GIRL_CHANNEL_ID"
}));
```

## Can I just test middleware?
* Rename `config.example.json` to `config.json` and fill config
* Install `discord.js`
```bash
$ npm install
```
* Launch a test bot
```bash
$ node test-bot.js
* Discord#0000 (ID: 1) is launched!
```
