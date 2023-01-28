class DB {
    constructor(db) {
        this.db = db;

        this.createTableUsers = `create table users(disid,guldid,chid,name,nickname,action)`;
        this.insertTableUser =
            "insert into users(disid,guldid,chid,name,nickname,action) values(?,?,?,?,?,?)";
        this.selectTableUser = `SELECT * FROM users WHERE ((disid=? and guldid=?) and chid=?) `;
        this.selectTableUserByUserGuildId = `SELECT * FROM users WHERE (disid=? and guldid=?) `;
        this.updateTableUSer = `UPDATE users SET action=?,name=?, nickname=? WHERE chid=?`;
        this.deleteTableUser = `DELETE FROM users where chid=?`;
        this.deleteTableUserByUserId = `DELETE FROM users where disid=?`;

        this.init();
    }
    init() {
        this.db.run(this.createTableUsers, (err) => {
            if (err) {
                return console.log("table users alredy exist");
            }
            console.log("table users created");
        });
    }
    insertUser(memberId, guildId, channelId, name, nickname, action) {
        this.db.run(
            this.insertTableUser,
            [memberId, guildId, channelId, name, nickname, action],
            (err) =>
                err
                    ? console.error("ERROR INSERT".red, err)
                    : console.log("ADD MEMBER")
        );
    }

    selectUser(memberId, guildId, channelId, callback) {
        this.db.get(
            this.selectTableUser,
            [memberId, guildId, channelId],
            callback
        );
    }
    selectUsers(memberId, guildId, callback) {
        this.db.all(
            this.selectTableUserByUserGuildId,
            [memberId, guildId],
            callback
        );
    }
    updateUser(channelId, action, name, nickname, callback) {
        this.db.run(
            this.updateTableUSer,
            [action, name, nickname, channelId],
            callback
        );
    }

    deleteUser(channelId, callback) {
        this.db.run(this.deleteTableUser, [channelId], callback);
    }
    deleteUserByUserId(userId, callback) {
        this.db.run(this.deleteTableUserByUserId, [userId], callback);
    }
}

module.exports = DB;
