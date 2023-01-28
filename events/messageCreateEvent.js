const { Guild } = require("discord.js");

module.exports = (message) => {
    const createdAt = message.createdAt.toLocaleString();
    const author = message.author.tag;
    if (message.member.id === process.env.APPID) return;
    console.log(message.member.id, message.guildId, message.channelId);

    global.db.selectUser(
        message.member.id,
        message.guildId,
        message.channelId,
        (err, row) => {
            if (err) return console.log("[ERROR SELECT]", err);
            if (!row) return console.log("WARNING ROW IS EMPTY");
            if (row.action === 0)
                global.db.updateUser(
                    message.channelId,
                    1,
                    row.name,
                    message.content,
                    (err) => {
                        if (err) return console.log(err);
                        console.log(
                            `${message.member.tag} successful set name ${message.content}`
                        );
                        message.reply("Отлично, как тебя зовут?");
                    }
                );
            else if (row.action === 1) {
                global.db.updateUser(
                    message.channelId,
                    2,
                    message.content,
                    row.nickname,
                    (err) => {
                        if (err) return console.log(err);
                        console.log(
                            `${message.member.tag} successful set nickname ${message.content}`
                        );
                        message.member.setNickname(
                            `${row.nickname} (${message.content})`
                        );
                        message.member.roles.add([
                            message.member.guild.roles.cache.find(
                                (role) => role.name === process.env.DEFAULT_ROLE
                            ),
                        ]);

                        global.db.deleteUser(row.chid, (err) => {
                            if (err)
                                console.log(
                                    "ERROR CHANNEL DELETE FROM DATABASE",
                                    err
                                );
                        });
                        message.channel.delete("не актуально");
                        const officerChannel =
                            message.guild.channels.cache.find(
                                (channel) =>
                                    channel.name ===
                                        process.env.DEFAULT_CHANNEL_ADD &&
                                    channel.type === 0
                            );
                        if (officerChannel)
                            officerChannel.send(
                                `Прибыл новый пользователь: ${message.member}\nИмя: ${message.content}\nНик: ${row.nickname}`
                            );
                    }
                );
            }
        }
    );

    console.log(`[${createdAt}] [${author}] [${message.content}]`);
};
