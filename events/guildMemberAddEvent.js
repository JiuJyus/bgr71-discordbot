const {
    ChannelType,
    PermissionFlagsBits,
    ModalBuilder,
    ActionRowBuilder,
    TextInputBuilder,
    TextInputStyle,
    ButtonBuilder,
} = require("discord.js");
/**
 * При входе на дискорд сервер бот должен создать отдельный чат с ним где базово опросить его
 **/
module.exports = (member) => {
    const { guild } = member;
    const { channels } = guild;

    channels
        .create({
            name: `auth_${member}`,
            type: ChannelType.GuildText,
            permissionOverwrites: [
                {
                    id: member.id,
                    allow: [
                        PermissionFlagsBits.ViewChannel,
                        PermissionFlagsBits.SendMessages,
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
        })
        .then((sm) => {
            global.db.run(
                "insert into users(disid,guldid,chid,name,nickname,action) values(?,?,?,?,?,?)",
                [member.id, guild.id, sm.id, "", "", 0],
                (err) => console.log("ERROR INSERT", err)
            );
            console.log(`${member.tag} add to db`);

            sm.send({
                content: `${member}, Добро пожаловать я бот канала напиши свой игровой ник`,
            });

            console.log("add channel");
        })
        .catch((em) => {
            console.log("err", em);
        });
    console.log(`[${member.joinedAt}] ${member}`);
};
