const sqlite3 = require("sqlite3");
const DB = require("./DB");

const error = (err) => {
    if (err) {
        return console.log("[ERROR DATABASE] " + err);
    }
    console.log("Connection successful to database");
};

module.exports = new DB(new sqlite3.Database("./dis.db", error));
