const sqlite3 = require("sqlite3");

var db = new sqlite3.Database("./dis.db", (err) => {
    if (err) {
        return console.log("[ERROR DATABASE] " + err);
    }
    console.log("Connection successful to database");
});
/**
 * actions
 * 0 - новый мембер
 * 1 - знаю имя
 * 2 - знаю никнейм
 */
db.run(`create table users(disid,guldid,chid,name,nickname,action)`, (err) => {
    if (err) {
        return console.log("table users alredy exist");
    }
    console.log("table users created");
});

module.exports = db;
