const {
    ChannelType,
    PermissionFlagsBits,
    ModalBuilder,
    ActionRowBuilder,
    TextInputBuilder,
    TextInputStyle,
    ButtonBuilder,
} = require("discord.js");

module.exports = (member) => {
    const { guild } = member;
    const { channels } = guild;

    channels
        .create({
            name: `auth_${member}`,
            type: ChannelType.GuildText,
            permissionOverwrites: [
                {
                    id: guild.roles.everyone,
                    deny: [
                        PermissionFlagsBits.ViewChannel,
                        PermissionFlagsBits.SendMessages,
                    ],
                },
                {
                    id: member.id,
                    allow: [
                        PermissionFlagsBits.ViewChannel,
                        PermissionFlagsBits.SendMessages,
                    ],
                },
            ],
        })
        .then((sm) => {
            global.chats.push(sm);
            sm.send({
                content: `${member}`,
            });
            console.log("add channel");
        })
        .catch((em) => {
            console.log("err", em);
        });
    console.log(`[${member.joinedAt}] ${member}`);
};
