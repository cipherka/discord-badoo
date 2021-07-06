# discord-badoo
A Discord.js middleware for create private voice channels for boy/girl

## How to use?
### 24/7 version
* Add bot Sonata ([link](https://top.gg/bot/672406367344132116))
* (optional) Set a server language (`s.lang en/ru`) or prefix (`s.prefix !!`)
* Create a category and two voice channels
* Set-up badoo feature
```
s.badoo parentID CATEGORY_ID
s.badoo boyChannel VOICE_ID
s.badoo girlChannel VOICE_ID
```
* Enable badoo feature (`s.badoo on`)

### Your bot
* Install `discord-badoo`
```bash
$ npm install github:vlfz/discord-badoo
```
* Use middleware in your production code
```js
const {
    middleware: DiscordBadooMiddleware
} = require('discord-badoo');

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
