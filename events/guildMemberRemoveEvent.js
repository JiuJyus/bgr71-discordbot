module.exports = (member) => {
    const { guild } = member;
    const { channels } = guild;
    console.log(
        `Leave from server [${new Date().toLocaleString()}] ${member.user.tag}`
    );
    const officerChannel = channels.cache.find(
        (channel) =>
            channel.name === process.env.DEFAULT_CHANNEL_REMOVE &&
            channel.type === 0
    );
    if (officerChannel) officerChannel.send(`Убыл пользователь: ${member}`);

    global.db.selectUsers(member.id, guild.id, (err, rows) => {
        rows.forEach((row) => {
            ch = channels.cache.find((channel) => channel.id === row.chid);
            if (!ch) return;
            ch.delete("Не акутально");
            global.db.deleteUser(row.chid);
        });
    });
};
