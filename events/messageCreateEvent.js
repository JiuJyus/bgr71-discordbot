const { Guild } = require("discord.js");

module.exports = (message) => {
    const createdAt = message.createdAt.toLocaleString();
    const author = message.author.tag;
    if (message.member.id === process.env.APPID) return;
    console.log(message.member.id, message.guildId, message.channelId);
    sql = `SELECT * FROM users WHERE ((disid=? and guldid=?) and chid=?) `;
    global.db.get(
        sql,
        [message.member.id, message.guildId, message.channelId],
        (err, row) => {
            if (err) return console.log("select error", err);
            sqlU = `UPDATE users SET action=?,name=?, nickname=?`;
            if (!row) return;
            if (row.action === 0) {
                global.db.run(sqlU, [1, row.name, message.content], (err) => {
                    if (err) return console.log(err);
                    console.log(
                        `${message.member.tag} successful set name ${message.content}`
                    );
                    message.reply("Отлично, как тебя зовут?");
                });
            } else if (row.action === 1) {
                global.db.run(
                    sqlU,
                    [2, message.content, row.nickname],
                    (err) => {
                        if (err) return console.log(err);
                        console.log(
                            `${message.member.tag} successful set nickname ${message.content}`
                        );
                        message.reply(
                            `Добро пожаловать ${message.content} (${row.nickname})`
                        );
                        message.member.setNickname(
                            `${row.nickname} (${message.content})`
                        );
                        message.member.roles.add([
                            message.member.guild.roles.cache.find(
                                (role) => role.name === "✅рядовой✅"
                            ),
                            message.member.guild.roles.cache.find(
                                (role) => role.name === "полководец"
                            ),
                        ]);

                        message.channel.delete("не актуально");
                    }
                );
            }
        }
    );
    console.log(`[${createdAt}] [${author}] [${message.content}]`);
};
