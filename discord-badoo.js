const getRandom = (arr) => {
    let rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
};

const middleware = ({
    parentID,
    boyChannelID,
    girlChannelID
}) => (old, member) => {
    if ((old.user && old.user.bot) || (member.user && member.user.bot)) return;

    let channels = {
        boy: member.guild.channels.cache.filter(channel => channel.parent.id === parentID).get(boyChannelID),
        girl: member.guild.channels.cache.filter(channel => channel.parent.id === parentID).get(girlChannelID)
    };
    if (!channels.boy || !channels.girl) return;

    if (channels.boy.members.size && channels.girl.members.size) {
        let randomBoy = getRandom(channels.boy.members.array());
        let randomGirl = getRandom(channels.girl.members.array());

        member.guild.channels.create(`${randomBoy.user.username} x ${randomGirl.user.username}`, {
                type: "voice",
                parent: parentID,
                permissionOverwrites: [{
                        id: randomBoy.user.id,
                        allow: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK', 'USE_VAD', 'PRIORITY_SPEAKER']
                    },
                    {
                        id: randomGirl.user.id,
                        allow: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK', 'USE_VAD', 'PRIORITY_SPEAKER']
                    },
                    {
                        id: member.guild.id,
                        allow: ['VIEW_CHANNEL'],
                        deny: ['CONNECT', 'SPEAK', 'USE_VAD', 'PRIORITY_SPEAKER']
                    }
                ]
            })
            .then((channel) => {
                randomBoy.voice.setChannel(channel).catch(() => null);
                randomGirl.voice.setChannel(channel).catch(() => null);
            });
    }

    if (old.channel) {
        if (
            (member.channel && member.channel.id === channels.boy || member.channel && member.channel.id === channels.girl) &&
            old.channel.members.filter(member => !member.user.bot).size >= 1
        ) old.setChannel(old.channel);

        let filter = (channel) =>
            (channel.parentID == parentID) &&
            (channel.id !== boyChannelID) &&
            (channel.id !== girlChannelID) &&
            (old.channel.id === channel.id) &&
            (old.channel.members.filter(member => !member.user.bot).size <= 0) &&
            (channel.deletable);

        for (let channel of old.guild.channels.cache.array().filter(filter)) {
            channel.delete();
        }
    }
};

module.exports = {
    getRandom,
    middleware
};