const { ChannelType, PermissionFlagsBits } = require("discord.js");
const colors = require("colors");
const userAuth = require("../utils/userAuth");

/**
 * При входе на дискорд сервер бот должен создать отдельный чат с ним где базово опросить его
 **/
module.exports = async (member) => {
    const { guild } = member;
    const { channels } = guild;

    console.log(`Join to us [${member.joinedAt}] ${member.user.tag}`);

    guildChannelCreateOptions = {
        name: `welcome-${member.user.username}`,
        type: ChannelType.GuildText,
        topic: "Авторизация пользователя на сервере BGR71",
        permissionOverwrites: [
            {
                id: member.id,
                allow: [
                    PermissionFlagsBits.ViewChannel,
                    PermissionFlagsBits.SendMessages,
                    PermissionFlagsBits.ReadMessageHistory,
                ],
            },
            {
                id: guild.roles.everyone,
                deny: [
                    PermissionFlagsBits.ViewChannel,
                    PermissionFlagsBits.SendMessages,
                ],
            },
        ],
        parent: guild.channels.cache.find(
            (channel) =>
                channel.name === process.env.DEFAULT_WELCOME_CATEGORY &&
                channel.type === 4
        ),
    };

    channels
        .create(guildChannelCreateOptions)
        .then((channel) => {
            console.log("add channel");
            userAuth(channel, member);
        })
        .catch((em) => {
            console.log("err", em);
        });
};
