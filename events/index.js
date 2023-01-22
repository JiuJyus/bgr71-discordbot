const fs = require("node:fs");
const path = require("node:path");
const eventsPath = path.join(__dirname);

const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js") && file !== "index.js");

const events = {};

for (file of eventFiles) {
    ev = require(path.join(eventsPath, file));
    if (typeof ev === "function") events[file.replace(".js", "")] = ev;
}

module.exports = events;
