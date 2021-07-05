const config = require('./config.json');
const {
    middleware: DiscordBadooMiddleware
} = require('./discord-badoo');

const {
    Client
} = require('discord.js');
const client = new Client();
client.on('ready', () => {
    client.user.setPresence({
        activity: config.activity
    });
    return console.info(`* ${client.user.tag} (ID: ${client.user.id}) is launched!`);
});

client.on('voiceStateUpdate', DiscordBadooMiddleware({
    parentID: config.channels.parent,
    boyChannelID: config.channels.boy,
    girlChannelID: config.channels.girl
}));

client.login(config.token);