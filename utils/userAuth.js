function memberAdd(channel, member) {
    global.db.insertUser(member.id, channel.guild.id, channel.id, "", "", 0);

    channel.send({
        content: `${member}, Добро пожаловать я бот канала напиши свой игровой ник`,
    });
}
module.exports = memberAdd;
